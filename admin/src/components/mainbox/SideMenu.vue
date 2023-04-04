<!-- 侧边栏组件 -->
<template>
    <el-aside :width= "$store.state.isCollapse ? '64px' : '200px'">
        <el-menu
        :default-active="route.fullPath"
        class="el-menu-vertical-demo"
        :collapse="$store.state.isCollapse"
        :collapse-transition = false
        :router = true
      >
        <el-menu-item index="/index">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/center">
          <el-icon><Avatar /></el-icon>
          <span>个人中心</span>
        </el-menu-item>
        <el-sub-menu index="/user-manage" v-admin>
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/user-manage/useradd">添加用户</el-menu-item>
            <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="/news-manage">
          <template #title>
            <el-icon><MessageBox /></el-icon>
            <span>新闻管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/news-manage/newsadd">添加新闻</el-menu-item>
            <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="/product-manage">
          <template #title>
            <el-icon><Reading /></el-icon>
            <span>产品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/product-manage/productadd">添加产品</el-menu-item>
            <el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        </el-menu>

    </el-aside>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { HomeFilled, Avatar, UserFilled, MessageBox, Reading } from '@element-plus/icons-vue'
const route = useRoute()
const store = useStore()
// 封装自定义指令操作dom控制用户管理界面的显示与隐藏
const vAdmin = {
  mounted (el) {
    /* 根据判断vuex中存储的用户信息  来决定是否从父节点删除该子节点 */
    if (store.state.UserInfo.role !== 1) {
      el.parentNode.removeChild(el)
    }
  }
}

</script>
<style lang="less" scoped>
.el-aside{
    height: 100vh;

    .el-menu{
      height: 100vh;
    }
}

</style>
