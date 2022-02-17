import { request } from '../utils/request'

/**
 * 获取交通图标
 */
export function getSign() {
    return request('/signs', "get");
}

/**
 * 获取法规
 */

export function getLaws() {
    return request('/laws', "get")
}