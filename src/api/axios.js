// 该文件用于封装axios
import Vue from 'vue';
import packedAxios from 'axios';
import { Message } from 'element-ui';

// 全局注册axios
Vue.prototype.$http = packedAxios;

packedAxios.defaults.timeout = 5000;

//http request 拦截器
packedAxios.interceptors.request.use(config => {
  console.log('拦截request');
  return config;
}, error => {
  Message({
    message: 'error in request interceptors! message: ' + error.message,
    type: 'error',
    duration: 3000,
    showClose: true,
  });
  return Promise.reject(error);
});

//http response 拦截器
packedAxios.interceptors.response.use(response => {
  console.log('拦截response');
  return response;
}, error => {
  Message({
    message: 'error in response interceptors! message: ' + error.message,
    type: 'error',
    duration: 3000,
    showClose: true,
  });
  return Promise.reject(error)
});

export default packedAxios;