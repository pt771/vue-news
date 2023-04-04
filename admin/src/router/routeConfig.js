// 配置子路由
import Home from '@/views/Home/Home.vue'
import Center from '@/views/Center/Center.vue'

// 新闻模块路由
import NewsAdd from '@/views/news-manage/NewsAdd.vue'
import NewsList from '@/views/news-manage/NewsList.vue'
import NewsEdit from '@/views/news-manage/NewsEdit.vue'
// 产品模块路由
import ProductAdd from '@/views/product-manage/ProductAdd.vue'
import ProductList from '@/views/product-manage/ProductList.vue'
import ProductEdit from '@/views/product-manage/ProductEdit.vue'
// 用户模块路由
import UserAdd from '@/views/user-manage/UserAdd.vue'
import UserList from '@/views/user-manage/UserList.vue'

const childRoutes = [
  {
    path: '/index',
    name: 'index',
    component: Home
  },
  {
    path: '/center',
    name: 'center',
    component: Center
  },
  {
    path: '/news-manage/newsadd',
    name: 'newsadd',
    component: NewsAdd
  },
  {
    path: '/news-manage/newslist',
    name: 'newslist',
    component: NewsList
  },
  {
    path: '/news-manage/eidtnews/:id',
    name: 'newsEdit',
    component: NewsEdit
  },
  {
    path: '/user-manage/userlist',
    name: 'userlist',
    component: UserList,
    // 设置权限路由 判定是否该路由是否可用
    requireAuth: true
  },
  {
    path: '/user-manage/useradd',
    name: 'useradd',
    component: UserAdd,
    // 设置权限路由 判定是否该路由是否可用
    requireAuth: true
  },
  {
    path: '/product-manage/productlist',
    name: 'productlist',
    component: ProductList
  },
  {
    path: '/product-manage/productadd',
    name: 'productadd',
    component: ProductAdd
  },
  {
    path: '/product-manage/eidtproduct/:id',
    name: 'productEdit',
    component: ProductEdit
  },
  {
    path: '/',
    redirect: 'index'
  }

]

export default childRoutes
