<template>
    <div>
        <el-carousel height="calc(100vh - 89px)" direction="vertical" :autoplay="false" v-if="loopList.length">
            <el-carousel-item v-for="item in loopList" :key="item._id">
            <div class="item" :style="{backgroundImage:`url(http://localhost:3000${item.cover})`}">
                <el-card class="box-card">
                    <template #header>
                    <div class="card-header">
                        <h2>{{ item.title }}</h2>
                    </div>
                    </template>
                    <!-- 简介 -->
                    <div>{{ item.introduction }}</div>
                    <!-- 详细介绍 -->
                    <div class="detail">{{ item.detail }}</div>
                    <!-- 更多信息 -->
                    <div class="more">更多信息请访问：http://abc.com</div>
                 </el-card>
            </div>
            </el-carousel-item>
        </el-carousel>
        <el-empty v-else description="暂无产品"></el-empty>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios'
const loopList = ref([])
onMounted(async () => {
    const res = await axios.get(`/webapi/product/list`)
    //console.log(res.data.data);
    loopList.value = res.data.data
})
</script>
<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
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
.item{
    background-size: cover;
    width: 100%;
    height: 100%;
    color: #d3dce6;
}
.box-card{
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
}
.detail, .more{
    margin-top: 20px;
}
</style>