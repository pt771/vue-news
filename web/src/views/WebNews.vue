<template>
    <div class="container">
        <!-- 头部背景 -->
        <div class="news-header" :style="{backgroundImage:`url(${require('@/assets/newsbg.png')})`}"></div>
        <!-- 搜索框 -->
        <div class="search">
            <el-popover placement="bottom" title="检索结果" width="50%" :visible="visiable" >
             <template #reference>
                <el-input v-model="searchText" class="w-50 m-2" placeholder="请输入文章关键字"
                 :prefix-icon="Search" size="large" type="search"
                  @input="visiable = true" @blur="visiable = false"></el-input>
             </template>
             <!-- 渲染搜索列表 -->
             <div v-if="titleSearchList.length">
                <div v-for="data in titleSearchList" 
                :key="data._id" class="search-item" @click="showNew(data._id)">{{ data.title }}</div>
            </div>
             <div v-else>
                <el-empty description="暂无内容" :image-size="50"/>
             </div>
            </el-popover>
        </div>
        <!-- 最新推荐 -->
        <div class="topnews">
            <el-row :gutter="20">
               <el-col :span="6" v-for="item in topNewsList" :key="item._id">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="showNew(item._id)">
                        <div class="image" :style="{backgroundImage:`url(http://localhost:3000${item.cover})`}"></div>
                        <div style="padding: 14px">
                          <span>{{item.title}}</span>
                          <div class="bottom">
                            <time class="time">{{ formatTime(item.editTime) }}</time>
                          </div>
                        </div>
                      </el-card>
               </el-col>
            </el-row>
        </div>
        <!-- 选项卡 -->
        <div class="tabsOption">
            <el-tabs v-model="whichTab" class="demo-tabs">
                <!-- 第一次循环出标签 -->
               <el-tab-pane v-for="item in tabList" :label="item.label" :name="item.name" :key="item.name">
                        <el-row :gutter="20">
                            <!-- 左边栏 -->
                            <el-col :span="18" >
                            <!-- 循环出对应数据内容 -->
                            <div v-for="item2 in tabnews[item.name]" :key="item2._id" style="padding: 10px;">
                            <!-- 进行内容卡片美化 -->
                              <el-card :body-style="{ padding: '0px'}" shadow="hover" @click="showNew(item2._id)">
                                <!-- 图片区域 -->
                                <div class="tab-image" :style="{backgroundImage:`url(http://localhost:3000${item2.cover})`}"></div>
                                <!-- 标题、文本、事件区域 -->
                                <div style="padding: 14px; float:left ">
                                    <span>{{item2.title}}</span>
                                    <div class="bottom"><time class="tab-time">{{ formatTime(item2.editTime) }}</time></div>
                               </div>
                              </el-card>
                            </div>
                            </el-col>
                            <!-- 右边栏 -->
                            <el-col :span="6" >
                                <el-timeline>
                                   <el-timeline-item  v-for="(item3, index) in tabnews[item.name]" 
                                    :key="index"  :timestamp="formatTime(item3.editTime)">
                                     {{ item3.title }}
                                   </el-timeline-item>
                                 </el-timeline>
                            </el-col>
                        </el-row>
               </el-tab-pane>
            </el-tabs>
            <!-- 回到顶部 -->
            <el-backtop :visibility-height="100" />
        </div>
    </div>
</template>
<script setup>
import moment from 'moment'
import axios from "axios";
import { Search } from "@element-plus/icons-vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import _ from 'lodash'
//设置地域时间
moment.locale('zh-cn')
//搜索文本
const searchText = ref('')
//搜索内容列表可视化
const visiable = ref(false)
//存储数据
const newsList = ref([])
//设置当前初始标签
const whichTab = ref(1)
//页面刷新后获取所有信息数据
onMounted(async () => {
  var res = await axios.get('/webapi/news/list')
    newsList.value = res.data.data
}
)
//设置计算属性 根据内容进行搜索
const titleSearchList = computed(() => searchText.value ? newsList.value.filter(item => item.title.includes(searchText.value)) : [])
//截取前4项渲染至页面
const topNewsList = computed(() => newsList.value.slice(0,4))
//时间格式化
const formatTime = (time) => {
    return moment(time).format('lll')
}
//设置标签数组
const tabList = [
    {
        label: '最新状态',
        name:1
    },    {
        label: '典型案例',
        name:2
    },    {
        label: '通知公告',
        name:3
    },
]
//按照category进行分类整理出新数组
const tabnews = computed(() => _.groupBy(newsList.value, item => item.category))
//跳转到该条新闻
const router = useRouter()
const showNew = (id) => {
    //根据id跳转
    router.push(`/new/${id}`)
}
</script>
<style lang="less" scoped>
.container{
    position: relative;
}
.news-header{
    width: 100%;
    height: 400px;
    background-size: cover;
}
.search{
    position: absolute;
    top: 300px;
    width: 100%;
    text-align: center;
    .el-input{
        width: 50%;
    }
}
.search-item{
    height: 50px;
    line-height: 50px;
    &:hover{
        color: red;
        background: whitesmoke;
    }
}
.topnews{
    margin: 20px;
}
.image{
    width: 100%;
    height: 150px;
    background-size: cover;
}
.time, .tab-time{
    font-size: 13px;
    color: gray;
}
.tabsOption{
    margin: 20px;
}
.tab-image{
    width: 150px;
    height: 150px;
    background-size: cover;
    float: left;
}
</style>