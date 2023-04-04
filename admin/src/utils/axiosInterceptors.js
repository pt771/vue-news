// 设置axios.interceptor是用来请求时验证token，响应或刷新后存储token
import axios from 'axios'

// 添加请求时拦截器
axios.interceptors.request.use(
  function (config) {
    /* 每次请求之前携带token  进行验证 */
    // 获取本地token
    const token = localStorage.getItem('token')
    // 挂载并添加样式
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 从拦截返回的响应头中结构authorization  并存入本地
    const { authorization } = response.headers
    authorization && localStorage.setItem('token', authorization)

    return response
  },
  function (error) {
    const { status } = error.response
    if (status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
