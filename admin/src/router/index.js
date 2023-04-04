import { createRouter, createWebHashHistory } from 'vue-router'

import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
// 加载子路由
import childRoutes from './routeConfig'
// 错误页面
import NotFound from '@/views/NotFound.vue'
// 引入vuex文件
import store from '@/store'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: MainBox
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login'
      })
    } else {
      if (!store.state.isGetterRouter) {
        // 删除所有嵌套路由 使后面权限路由判断生效时 不会产生页面滞留情况
        // 删除mainbox
        router.removeRoute('mainbox')
        // 配置子路由方法
        configChildRoutes()
        next({
          path: to.fullPath
        })
      }
      next()
    }
  }
})

// 循环加载子路由
const configChildRoutes = () => {
// 判断是否添加回权限路由信息
  if (!router.hasRoute('mainbox')) {
    router.addRoute({
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox
    })
  }

  childRoutes.forEach(item => {
    // 添加checkPermission方法判定路由是否含有requireAuth字段
    checkPermission(item) && router.addRoute('mainbox', item)
  })
  store.commit('changeGetterRouter', true)
}
// 定义判断方法
const checkPermission = (item) => {
  // 含有requireAuth字段返回角色信息为1
  if (item.requireAuth) {
    return store.state.UserInfo.role === 1
  }
  // 不含有字段则跳过
  return true
}

export default router
