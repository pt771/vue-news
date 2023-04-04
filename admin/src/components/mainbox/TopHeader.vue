<!-- 头部样式组件 -->
<template>
        <el-header>
                <!-- 左侧区域 -->
                <div class="left">
                        <el-icon @click="handleCollapsed"><Menu /></el-icon>
                        <span>XXXXXX新闻管理系统</span>
                </div>
                <!-- 右侧区域 -->
                <div class="right">
                  <span>欢迎 {{store.state.UserInfo.username}} 回来！</span>
                 <!-- 下拉菜单 -->
                <el-dropdown>
                 <span class="el-dropdown-link">
                        <el-icon :size="30" color="white"><User /></el-icon>
                 </span>
                 <template #dropdown>
                   <el-dropdown-menu>
                     <el-dropdown-item @click="jumpCenter">个人中心</el-dropdown-item>
                     <el-dropdown-item @click="logout">退出</el-dropdown-item>
                   </el-dropdown-menu>
                 </template>
                </el-dropdown>
                </div>
        </el-header>
</template>
<script setup>
// 引入Element组件
import { Menu, User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
// 控制展开侧边栏
const handleCollapsed = () => {
  store.commit('changeCollapsed')
}
// 点击跳转个人中心
const jumpCenter = () => {
  router.push('/center')
}
// 点击退出
const logout = () => {
  localStorage.removeItem('token')
  store.commit('clearUserInfo')
  router.push('/login')
}
</script>
<style lang="less" scoped>
.el-header{
        background-color: #2d3a4b;
        color: aliceblue;
        width: 100%;
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
}
.left{
        display: flex;
        i{
                margin: auto;
                cursor: pointer;
        }
      span{
        margin-left: 10px;
}
}
.right{
        display: flex;
        .el-dropdown{
                margin: auto;
        }
}

</style>
