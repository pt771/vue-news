<template>
    <el-row>
        <!-- 左侧栏 -->
    <el-col :span="17"  :offset="1">
        <!-- 标题区域 -->
        <div>
            <h2>{{ currentNew.title }}</h2>
            <div>
                <el-row>
                    <el-col :span="12">作者：{{ currentNew.author }}</el-col>
                    <el-col :span="8" class="time">{{ formatTime(currentNew.editTime) }}</el-col>
                </el-row>
            </div>
        </div>
        <!-- 分割线 -->
        <el-divider />
        <!-- 文章内容 -->
        <div v-html="currentNew.content"></div>
    </el-col>
    <!-- 右边栏 -->
    <el-col :span="4" :offset="1" :pull="1">
        <el-card class="box-card">
         <template #header>
        <div class="card-header">
        <span style="font-size: 16px;font-weight: bold;">最近新闻</span>
      </div>
    </template>
    <div v-for="item in topnews" :key="item._id" class="text item" style="padding: 14px;" @click="newShow(item._id)">
        <span>{{item.title}}</span>
        <div class="bottom"><time class="tab-time">{{ formatTime(item.editTime) }}</time></div>    
    </div>
  </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import moment from 'moment'
import {ref,watchEffect,onBeforeUnmount } from "vue";
import axios from 'axios'
/* 获取路由中的id */
import { useRoute } from "vue-router";
import router from '@/router';
const route = useRoute()
/* 根据id获取的数据 */
const currentNew = ref({})
/* 获取最近数据 */
const topnews = ref([])
//设置地域时间
moment.locale('zh-cn')
/* 监听页面路由变化 */
watchEffect(async () => {
    //判断路由中是否携带id参数 若无则退出
    if(!route.params.id) return 
    /* 根据id查询 */
    const res = await axios.get(`/webapi/news/list/${route.params.id}`)
    /* 获取最近数据 */
    const res2 = await axios.get(`/webapi/news/toplist?limit=4`)
    currentNew.value = res.data.data[0]
    topnews.value = res2.data.data
})
//卸载之前停止监听
onBeforeUnmount(() => {
    stop()
})
//时间格式化
const formatTime = (time) => {
    return moment(time).format('lll')
}
//跳转到内容
const newShow = (id) => {
    router.push(`/new/${id}`)
}
</script>
<style lang="less" scoped>
.el-row{
    margin-top: 30px;
}
.time, .tab-time{
    font-size: 13px;
    color: gray;
}
</style>