import axios from "axios";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const baseURL = "http://124.222.166.81:8000/";
const instanceWithoutToken = axios.create({ baseURL });
instanceWithoutToken.interceptors.response.use(
    (response) => {
        if (response.status == 200) {
            return response;
        }
    },
    (error) => new Promise.reject(error)
);
// 响应拦截器
instanceWithoutToken.interceptors.response.use((response) => {
    console.log('response', response)
    return response.data
});
const generateRequestConfig = (url, method, data) => ({
    url,
    method,
    [method.toLowerCase() === "get" ? "params" : "data"]: data,
});
// 请求函数
export function request(url, method, data) {
    return instanceWithoutToken(generateRequestConfig(url, method, data), {
        cancelToken: source.token
    });
}

