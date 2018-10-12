/**
 * @author Lindong Ding
 * @date 2018/7/24
 * @desc axios请求封装
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.BASE_API+'/admin',
    timeout: 80000, // request timeout
//  headers: {
//      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//      'Content-Type': 'application/json; charset=UTF-8'
//  }
});

service.interceptors.request.use(config => {
    store.dispatch('setLoadingStart');
    if (store.getters.token) {
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        config.headers['Authorization'] = getToken();
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
});

service.interceptors.response.use(
  response => {
      setTimeout(()=>{
          store.dispatch('setLoadingEnd');
      },800);
      return response
  },
  error => {
      setTimeout(()=>{
          store.dispatch('setLoadingEnd');
      },800);
    return Promise.reject(error)
  });

export default service
