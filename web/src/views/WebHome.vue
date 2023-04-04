<template>
    <div class="container">
        <el-carousel height="calc(100vh - 59px)">
    <el-carousel-item  :key="1">
         <div :style="{backgroundImage:`url(${require('@/assets/home1.jpg')})`}"></div> 
      </el-carousel-item>
      <el-carousel-item  :key="2">
         <div :style="{backgroundImage:`url(${require('@/assets/home2.jpeg')})`}"></div> 
      </el-carousel-item>
      <el-carousel-item  :key="3">
         <div :style="{backgroundImage:`url(${require('@/assets/home3.jpg')})`}"></div> 
      </el-carousel-item>
      <el-carousel-item  :key="4">
         <div :style="{backgroundImage:`url(${require('@/assets/home4.jpg')})`}"></div> 
      </el-carousel-item>
    </el-carousel>
    <div class="center">清明节~怀念先烈</div>
    </div>
</template>
<script setup>

</script>
<style lang="less" scoped>
.el-carousel div{
    width: 100%;
    height: 100%;
    background-size: cover;
}
.container{
    position: relative;
}
.center{
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%,-50%);
    height: 100px;
    line-height: 100px;
    color: rgb(25, 28, 30);
    font-size: 60px;
    text-align: center;
}
</style>