import { request } from '../utils/request'

/**
 * 获取交通图标
 */
export function getSign() {
    return request('/signs', "get");
}