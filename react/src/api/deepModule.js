import { request } from '../utils/request'
/**
 * 获取新闻列表
 */
export function getNewList() {
    return request('/news', "get");
}

// 获取各省份统计数据
export function getProvinceData(province) {
    return request('/count/province', "get", { province });
}

// 获取全国份统计数据
export function getCountryData() {
    return request('/count/country', "get");
}