import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/WebHome.vue'
import News from '../views/WebNews.vue'
import New from '../views/WebNew.vue'
import Product from '../views/WebProduct.vue'
import NProgress from 'nprogress'
import  'nprogress/nprogress.css'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News
  }, {
    path: '/product',
    name: 'product',
    component: Product
  }, {
    path: '/new/:id',
    name: 'new',
    component: New
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})



export default router
