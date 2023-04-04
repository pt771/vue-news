// 转换时间格式工具
// 引入时间格式插件 npm i moment -S
import moment from 'moment'
// 设置中文版式
moment.locale('zh-cn')
const formateTime = {
  getTime: (date) => {
    return moment(date).format('llll')
  }
}

export default formateTime
