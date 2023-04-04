<template>
    <div >
     <!-- 页头 -->
      <el-page-header content="首页" icon="" title="新闻管理系统"></el-page-header>
    <!-- 卡片视图 1-->
      <el-card>
        <!-- 24栅格布局 -->
        <el-row>
          <!-- 头像栏 -->
          <el-col :span="4">
            <el-avatar :size="100" :src="avatarUrl" />
          </el-col>
          <!-- 内容栏 -->
          <el-col :span="20">
            <h3 class="sayhi">欢迎 {{ store.state.UserInfo.username }} 回来！{{ welcomeText }}</h3>
          </el-col>
        </el-row>
      </el-card>
    <!-- 卡片视图 2-->
      <el-card>
        <!-- 标头 -->
        <template #header>
          <div class="card-header">
            <span>公司产品</span>
          </div>
        </template>
        <!-- 走马灯 -->
        <el-carousel :interval="4000" type="card" height="200px" v-if="loopList.length">
          <el-carousel-item v-for="item in loopList" :key="item._id">
            <!-- 这是封面为背景  需要添加完整路径 -->
            <div :style="{backgroundImage:`url(http://localhost:3000${item.cover})`,backgroundSize:'cover'}">
              <h3 text="2xl" justify="center">{{ item.title }}</h3>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-card>
  </div>
</template>
<script>
import store from '@/store/index'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

export default {
  name: 'IndexView'
}
</script>
<script setup>
// 设置循环数据
const loopList = ref([])
const author = store.state.UserInfo.username
// 设置默认头像
const defaultPicUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
// 判断是否带有头像并渲染
const avatarUrl = computed(() => store.state.UserInfo.avatar ? 'http://127.0.0.1:3000' + store.state.UserInfo.avatar : defaultPicUrl)
const welcomeText = computed(() => new Date().getHours() < 12 ? '奋斗吧！还不到中午呢！' : '真是愉快的一天！')
// 挂载刷新页面
onMounted(() => {
  getproductData()
})
// 根据作者获取用户数据
const getproductData = async () => {
  const res = await axios.get('/adminapi/product/list', { params: { author: author } })
  if (res.data.ActionType === 'ok') {
    loopList.value = res.data.data
    return ElMessage.success('获取成功！')
  } else {
    ElMessage.error('获取失败！')
  }
}
</script>
<style lang="less" scoped>
.el-card{
  margin-top: 50px;
}
.el-carousel__item h3 {
  color: #e7eaee;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.sayhi{
  line-height: 100px;
}
</style>
