import { request } from '../utils/request'
/**
 * 获取城市
 */
export function getCityList() {
    return request('/cities', "get");
}
/**
 * 获取城市交通
 */
export function getBusList(city) {
    return request(`buses?city=${city}`, "get");
}