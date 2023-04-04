// 封装提交组件
import axios from 'axios'

function upload (path, userForm) {
  // 要提交的表单中包含文件信息  表单传递需要formdata()转换
  const params = new FormData()
  for (const i in userForm) {
    params.append(i, userForm[i])
  }
  // axios向后端提交表单数据  并设置请求头向后端表明传输的内容及方式
  return axios.post(path, params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => res.data)
}

export default upload
