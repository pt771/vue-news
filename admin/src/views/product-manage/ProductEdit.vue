<template>
    <div>
    <!-- 页头 -->
      <el-page-header content="编辑产品"  title="产品管理" @back="handleBack()"></el-page-header>
    <!-- 表单 -->
    <el-form  ref="productFormRef" :model="productForm" :rules="productRules" label-width="120px" class="demo-ruleForm" status-icon>
        <el-form-item label="产品名称" prop="title">
           <el-input v-model="productForm.title" />
       </el-form-item>
       <el-form-item label="产品简要描述" prop="introduction">
              <el-input type="textarea" v-model="productForm.introduction" />
          </el-form-item>
          <el-form-item label="产品详细描述" prop="detail">
              <el-input type="textarea" v-model="productForm.detail" />
          </el-form-item>
       <el-form-item label="产品图片" prop="cover">
           <!--   upload组件应用 -->
           <Upload :avatar="productForm.cover" @dataChange="handleCover" />
       </el-form-item>
       <el-form-item >
        <el-button type="primary" @click="productPublish()">更新产品</el-button>
       </el-form-item>
    </el-form>
    </div>
</template>
<script>
import store from '@/store/index'
import { ref, reactive, onMounted } from 'vue'
/* 引入提交方法 */
import upload from '@/utils/upload'
/* 引入提交组件 */
import Upload from '@/components/upload/upload.vue'

import router from '@/router'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
  name: 'ProductAdd',
  components: { upload }
}
</script>
<script setup>
const route = useRoute()
const productFormRef = ref()
// 设置表单数据对象
const productForm = reactive({
  title: '',
  detail: '',
  cover: '',
  introduction: '',
  file: null,
  author: store.state.UserInfo.username
})
// 设置表单验证规则
const productRules = reactive({
  title: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在2-10个字符', trigger: 'blur' }
  ],
  introduction: [
    { required: true, message: '请输入简要描述', trigger: 'blur' }
  ],
  detail: [
    { required: true, message: '请输入详细描述', trigger: 'blur' }
  ],
  cover: [
    { required: true, message: '请上传产品图片', trigger: 'blur' }
  ]
})
// 返回事件
const handleBack = () => {
  router.back()
}
// 获取当前页面数据
onMounted(async () => {
  const res = await axios.get(`/adminapi/product/list/${route.params.id}`)
  // 根据reactive特性实现响应式表单赋值
  Object.assign(productForm, res.data.data[0])
})
// 操作本地显示上传图片
const handleCover = (uploadFile) => {
  productForm.cover = URL.createObjectURL(uploadFile)
  // 添加file对象以完善图片数据信息
  productForm.file = uploadFile
}
// 提交发布
const productPublish = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      // 使用封装的提交方法提交
      await upload('/adminapi/product/list', productForm)
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
