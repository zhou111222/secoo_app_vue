 /* 封装axios拦截器 */
 import axios from 'axios';

 /* 创建axios实例 */
 const service = axios.create({
     baseURL: "http://api.quanfenshop.com",
     timeout: 5000, // 请求超时时间
 });
 /* request拦截器 */
 service.interceptors.request.use((config) => {
     return config;
 }, (error) => {
     Promise.reject(error);
 });

 /* respone拦截器 */
 service.interceptors.response.use(
     (response) => {
         return response;
     },
     (error) => {
         // 异常处理
         console.log(error);
         return Promise.reject(error);
     },
 );

 export default service;