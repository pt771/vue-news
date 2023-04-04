<template>
    <div>
    <!-- 页头 -->
      <el-page-header content="新闻列表"  title="新闻管理"></el-page-header>
    <!-- 表格 -->
    <el-table :data="newsData" style="width: 100%" strip  border>
          <el-table-column prop="title" label="标题" width="120" />
          <el-table-column prop="category" label="分类">
            <template #default="scope">
              {{ categoryFormat(scope.row.category) }}
            </template>
          </el-table-column>
          <el-table-column prop="editTime" label="更新时间" >
            <template #default="scope">
              {{ formatTime.getTime(scope.row.editTime) }}
            </template>
            </el-table-column>
          <el-table-column prop="isPublish" label="是否发布" >
            <template #default="scope">
              <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0" @change="handleSwitch(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column  label="操作" >
            <template #default="scope">
              <!-- 预览效果 -->
              <el-button type="success" :icon="Star" circle  @click="handlePreview(scope.row)"/>
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
        <!-- 预览效果对话框 -->
        <el-dialog  v-model="dialogVisible"  title="预览新闻"  width="60%" >
          <div>
            <!-- 标题 -->
            <h2>{{ previewData.title }}</h2>
            <!-- 时间 -->
            <div class="previewTime">{{ formatTime.getTime(previewData.editTime) }}</div>
            <!-- 分割线 -->
            <el-divider content-position="right"></el-divider>
            <!-- 新闻内容 -->
            <div v-html="previewData.content" class="htmlContent"></div>
          </div>
        </el-dialog>
    </div>
</template>
<script setup>
import store from '@/store/index'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import formatTime from '@/utils/formatTime'
import { Edit, Star, Delete } from '@element-plus/icons-vue'
import router from '@/router'
// 设置接收表单
const newsData = ref([])
// 设置预览数据
const previewData = ref()
// 设置对话框
const dialogVisible = ref(false)
const author = store.state.UserInfo.username
// 挂载刷新页面
onMounted(() => {
  getNewsData()
})
// 根据作者获取用户数据
const getNewsData = async () => {
  const res = await axios.get('/adminapi/news/list', { params: { author: author } })
  if (res.data.ActionType === 'ok') {
    newsData.value = res.data.data
    return ElMessage.success('获取成功！')
  } else {
    ElMessage.error('获取失败！')
  }
}
// 格式化分类信息
const categoryFormat = (category) => {
  const arr = ['最新动态', '典型案例', '通知公告']
  return arr[category - 1]
}
// 预览操作
const handlePreview = (data) => {
  previewData.value = data
  dialogVisible.value = true
}
// 编辑按钮操作
const handleEdit = async (item) => {
  console.log(item)
  // 跳转到编辑页面
  router.push(`/news-manage/eidtnews/${item._id}`)
}
// 操作发布情况更新
const handleSwitch = async (item) => {
  await axios.put('/adminapi/news/publish', { _id: item._id, isPublish: item.isPublish })
  getNewsData()
}
// 删除按钮操作
const handleDelete = async (item) => {
  // 操作删除
  await axios.delete(`/adminapi/news/list/${item._id}`)
  // 刷新页面
  getNewsData()
}
</script>
<style lang="less" scoped>
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
