import axios, {AxiosRequestConfig, AxiosResponse} from "axios"
import {clearAllStorage, getStorage, setStorage} from "@/utils/storage"
import {GET_USERINFO} from "@/request/common-api";
import { removeStorage } from "@/utils/storage";

axios.defaults.baseURL = 'https://api.example.com'
axios.defaults.headers.common['Authorization'] = getStorage('token')
axios.defaults.timeout = 3000

const pending = new Map()
let isRefreshing = false // 是否正在刷新token
let retryRequests = [] as any[] // 刷新token需要重发的请求队列
let repeatConfig = {} as AxiosRequestConfig // 防止重复请求
const addPending = (config: any) => {
    const key = config.url
    if (!pending.has(key)) {
        pending.set(key, JSON.stringify(config.data))
    }
};
const removePending = (config: AxiosRequestConfig) => {
    const key = config.url
    const value = typeof config.data === 'object' ? JSON.stringify(config.data) : config.data
    if (pending.has(key) && pending.get(key) === value) {
        pending.delete(key)
        return true
    }
    return false
};
axios.interceptors.request.use(
    (config) => {
        repeatConfig = { url: config.url, method: config.method, data: config.data }
        if (removePending(config)) {
            return Promise.reject({
                code: 'repeat',
                msg: '重复请求被拦截',
            });
        }
        addPending(config);
        repeatConfig = config;
        return config;
    },
    (error) => Promise.reject(error),
);

axios.interceptors.response.use(
    (res) => {
        removePending(repeatConfig);
        repeatConfig = {};
        if (res.data.code === 0) {
          return res.data
        } else if (res.data.code === 403) { // token过期
          refreshToken(res)
        } else {
          specialErrorHandle(res.data);
          return Promise.reject(res.data);
        }
    },
    (error) => {
        removePending(repeatConfig);
        repeatConfig = {};
        return Promise.reject(error.data);
    },
);

const refreshToken = async (res: AxiosResponse) => {
  if (!isRefreshing) {
    isRefreshing = true
    const [err, data] = await GET_USERINFO() // 调用获取token的接口
    isRefreshing = false
    if (err) {
      removeStorage('token')
      window.location.href = '/login'
      return Promise.reject(err)
    } else {
      setStorage('token', data.token)
      // token刷新后将数组的方法重新执行
      res.headers.Authorization = data.token
      retryRequests.forEach((cb) => cb(data.token))
      retryRequests = [] // 重新请求完清空
      return axios(res.config)
    }
  } else {
    // 返回未执行 resolve 的 Promise
    return new Promise(resolve => {
      // 用函数形式将 resolve 存入，等待刷新后再执行
      retryRequests.push((token: string) => {
        res.headers.Authorization = token
        resolve(axios(res.config))
      })
    })
  }
}

const specialErrorHandle = async (res: any) => {
  const {code, msg} = res
  switch (code) {
    case 1001:
      clearAllStorage();
      window.location.href = '/login'
      return
    case 1002:
      console.log('token过期')
      return
    default:
      console.log(msg) // 改成toast提示
  }
}

const transFormData = (data: any): any => {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    return formData;
};

// 参考了await-to-js进行错误处理
export const get = (url: string, config: any = {}): Promise<any> =>
    axios
        .get(url, config)
        .then((res) => [null, res])
        .catch((err) => [err, undefined]);

export const post = (url: string, data: any, config: any = {}) => {
    let _data = data;
    // 处理上传使用 form-data 问题
    if (config.headers && config.headers['Content-Type'] === 'multipart/form-data') {
        _data = transFormData(data);
    }
    return axios
        .post(url, _data, config)
        .then((res) => [null, res])
        .catch((err) => [err, undefined]);
};
