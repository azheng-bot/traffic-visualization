import { request } from '../utils/request'

/**
 * 获取交通图标
 */
export function getIcon() {
    return request('/signs', "get");
}