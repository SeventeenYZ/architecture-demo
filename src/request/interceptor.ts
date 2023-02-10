// 编写拦截器逻辑
// 如果拦截器逻辑不复杂可以和common-api.ts一起集合到index.ts里
// 更甚者可以像router、store一样去除src下的文件夹，只放一个ts文件在utils里
// 例如utils/request.ts

// 检查 http 状态码
const checkStatusCode = (res) => {
    if (res.statusCode !== 200) {
        return Promise.reject({
            code: res.data?.code || '未知错误',
            msg: res.data?.msg || '未知错误',
        });
    }
    return Promise.resolve(res.data); // res.data是业务实际响应内容
};

// 检查响应体状态码
const checkBusinessCode = (res) => {
    if (res.code !== 0) return Promise.reject(res);
    return Promise.resolve([null, res.data]);
};

