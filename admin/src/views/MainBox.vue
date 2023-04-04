<template>
    <div>
    <div class="common-layout">
     <el-container>
        <!-- 侧边栏 -->
        <SideMenu></SideMenu>
     <el-container direction="vertical">
        <!-- 头部区域 -->
           <TopHeader></TopHeader>
         <!-- 主体内容 -->
        <el-main>
            <router-view></router-view>
        </el-main>
     </el-container>
     </el-container>
  </div>

    </div>
</template>

<script setup>
import TopHeader from '../components/mainbox/TopHeader.vue'
import SideMenu from '../components/mainbox/SideMenu.vue'
</script>
<style lang="less" scoped>
.el-main{
   overflow: auto;
   height: calc(100vh-60px);
}
</style>
