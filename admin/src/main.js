import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* 注册element-plus插件 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
/* 动态主页渲染 */
import Particles from 'particles.vue3'
/* 引入axios拦截器 */
import '@/utils/axiosInterceptors'

createApp(App)
  .use(ElementPlus)
  .use(Particles)
  .use(store)
  .use(router)
  .mount('#app')
