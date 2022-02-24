import { request } from '../utils/request'
/**
 * 获取新闻列表
 */
export function getNewList() {
    return request('/news', "get");
}
