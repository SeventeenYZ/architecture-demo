import { get, post } from '@/request/index';

// 以大写命名风格来表示是请求接口函数，常规接口统一命名，特定于页面的接口定义在最下面，方便作为模板复用）

// 列表
export const GET_LIST = (params = {}): any => get('/order/list', { params });

// 新增
export const ADD = (params = {}): Promise<any> => post('/order/add', params);

// 详情
export const GET_DETAIL = async (params = {}): Promise<any> => {
  return get('/order/detail', { params })
}

// 删除
export const DELETE = async (params = {}): Promise<any> => {
  return get('/order/delete', { params })
}

// 修改
export const EDIT = async (params = {}): Promise<any> => {
  return post('/order/edit', params)
}

// 获取订单状态（需要特殊说明的写在下面）
export const GET_ORDER_STATUS = async (params = {}): Promise<any> => {
  return get('/order/status', { params })
}
