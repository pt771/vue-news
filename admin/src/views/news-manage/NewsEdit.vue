<template>
    <div>
    <!-- 页头 -->
      <el-page-header content="编辑新闻"  title="新闻管理" @back="handleBack()"></el-page-header>
    <!-- 表单 -->
    <el-form  ref="newsAddFormRef" :model="newsAddForm" :rules="newsAddRules" label-width="120px" class="demo-ruleForm" status-icon>
       <el-form-item label="标题" prop="title">
           <el-input v-model="newsAddForm.title" />
       </el-form-item>
       <el-form-item label="内容" prop="content">
        <!-- 富文本编辑器 -->
           <editor @event="handleChange" :content="newsAddForm.content" v-if="newsAddForm.content"></editor>
       </el-form-item>
       <el-form-item label="类别" prop="category" >
          <el-select v-model="newsAddForm.category" class="m-2" size="large" style="width:100%">
             <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value"
             />
              </el-select>
        </el-form-item>
       <el-form-item label="封面图片" prop="cover">
           <!--   upload组件应用 -->
           <Upload :avatar="newsAddForm.cover" @dataChange="handleCover" />
       </el-form-item>
       <el-form-item >
        <el-button type="primary" @click="newsPublish()">更新新闻</el-button>
       </el-form-item>
    </el-form>
    </div>
</template>
<script>
import store from '@/store/index'
import { ref, reactive, onMounted } from 'vue'
import editor from '@/components/editor/TextEditor.vue'
/* 引入提交方法 */
import upload from '@/utils/upload'
/* 引入提交组件 */
import Upload from '@/components/upload/upload.vue'

import router from '@/router'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
  name: 'NewsAdd',
  components: { upload }
}
</script>
<script setup>
const route = useRoute()
const newsAddFormRef = ref()
// 设置表单数据对象
const newsAddForm = reactive({
  title: '',
  content: '',
  cover: '', // 封面
  file: null, // 封面图片路径
  category: 1, // 1最新动态 2典型案例 3通知公告
  isPublish: 0, // 0未发布 1发布
  author: store.state.UserInfo.username
})
// 设置表单验证规则
const newsAddRules = reactive({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 2, max: 15, message: '长度在2-15个字符', trigger: 'blur' }
  ],
  cover: [
    { required: true, message: '请上传图片', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择分类', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入正文', trigger: 'blur' }
  ]
})
// 设置分类选择
const options = [
  {
    label: '最新动态',
    value: 1
  }, {
    label: '典型案例',
    value: 2
  }, {
    label: '通知公告',
    value: 3
  }
]
// 返回事件
const handleBack = () => {
  router.back()
}
// 获取当前页面数据
onMounted(async () => {
  const res = await axios.get(`/adminapi/news/list/${route.params.id}`)
  // 根据reactive特性实现响应式表单赋值
  Object.assign(newsAddForm, res.data.data[0])
})
// 监听每次子组件编辑器传到的data
const handleChange = (data) => {
  // 接收到newsAddForm
  newsAddForm.content = data
}
// 操作本地显示上传图片
const handleCover = (uploadFile) => {
  newsAddForm.cover = URL.createObjectURL(uploadFile)
  // 添加file对象以完善图片数据信息
  newsAddForm.file = uploadFile
}
// 提交发布
const newsPublish = () => {
  newsAddFormRef.value.validate(async (valid) => {
    if (valid) {
      // 使用封装的提交方法提交
      await upload('/adminapi/news/list', newsAddForm)
      // 跳转列表
      router.back()
    }
  })
}
</script>
<style lang="less" scoped>
.el-form{
  margin-top: 50px;
}
</style>
