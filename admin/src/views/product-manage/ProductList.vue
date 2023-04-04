<template>
  <div>
  <!-- 页头 -->
    <el-page-header content="产品列表" icon="" title="产品管理"></el-page-header>
  <!-- 表格 -->
  <el-table :data="productData" style="width: 100%" strip  border>
        <el-table-column prop="title" label="产品名称" width="120" />
        <el-table-column prop="introduction" label="简要描述" width="120" />
        <el-table-column prop="editTime" label="更新时间" >
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
          </el-table-column>
        <el-table-column  label="操作" >
          <template #default="scope">
            <!-- 编辑按钮 -->
            <el-button circle :icon="Edit"  type="primary" @click="handleEdit(scope.row)"></el-button>
            <!--删除按钮 -->
            <!-- 添加提示框 -->
            <el-popconfirm title="确认删除该条信息吗？" width="200" confirm-button-text="是" cancel-button-text="否" @confirm="handleDelete(scope.row)">
                <template #reference>
                  <el-button  circle :icon="Delete"  type="danger" ></el-button >
                </template>
              </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script setup>
import store from '@/store/index'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import formatTime from '@/utils/formatTime'
import { Edit, Delete } from '@element-plus/icons-vue'
import router from '@/router'
// 设置接收表单
const productData = ref([])
const author = store.state.UserInfo.username
// 挂载刷新页面
onMounted(() => {
  getproductData()
})
// 根据作者获取用户数据
const getproductData = async () => {
  const res = await axios.get('/adminapi/product/list', { params: { author: author } })
  if (res.data.ActionType === 'ok') {
    productData.value = res.data.data
    return ElMessage.success('获取成功！')
  } else {
    ElMessage.error('获取失败！')
  }
}
// 编辑按钮操作
const handleEdit = async (item) => {
  console.log(item)
  // 跳转到编辑页面
  router.push(`/product-manage/eidtproduct/${item._id}`)
}
// 删除按钮操作
const handleDelete = async (item) => {
// 操作删除
  await axios.delete(`/adminapi/product/list/${item._id}`)
  // 刷新页面
  getproductData()
}
</script>
<style lang="less" scoped>
.el-table{
  margin-top: 50px
}
.previewTime{
font-size: 12px;
color: gray;
}
/* 设置内容图片样式不超过预览范围 */
::v-deep .htmlContent{
img{
  max-width: 100%;
}
}
</style>
