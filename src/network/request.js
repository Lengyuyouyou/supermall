import axios from 'axios'

export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    //baseURL:"http://123.207.32.32:8000",
    
    baseURL:'接口请向codewhy老师购买',
    timeout: 5000
  })
  //axios拦截器
  //请求
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    //console.log(err)
  })
  //响应
  instance.interceptors.response.use(res => {
    //console.log(res)
    return res.data
  }, err => {
    //console.log(err)
  })
  //发送真正的网络请求
  return instance(config)
}