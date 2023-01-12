// 公共请求api，如获取用户信息等，获取全局通用的xxx列表等
import { get } from "@/request/index";

export const GET_USERINFO = (params = {}): any => get('/user/info', { params });
