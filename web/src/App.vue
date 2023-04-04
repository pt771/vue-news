<template>
  <el-scrollbar height="660px">
  <Navbar></Navbar>
  <router-view/>
  </el-scrollbar>

</template>
<script setup>
import Navbar from "@/components/NavBar.vue";
</script>

<style lang="less" scoped>
*{
  margin: 0;
  padding: 0;
}
/* 设置全局滚动条 */
::-webkit-scrollbar{
  width: 5px;
  height: 5px;
  position: absolute;
}

::-webkit-scrollbar-thumb{
  background: #1890ff;
}

::-webkit-scrollbar-track{
  background: #ddd;
}
</style>