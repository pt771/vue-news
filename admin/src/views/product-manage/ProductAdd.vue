<template>
  <div >
 <!-- 页头 -->
  <el-page-header content="添加产品" icon="" title="产品管理"></el-page-header>
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
          <el-form-item label="封面图片" prop="cover">
           <!--   upload组件应用 -->
           <Upload :avatar="productForm.cover" @dataChange="handleCover" />
       </el-form-item>
          <!-- 提交按钮 -->
          <el-form-item>
            <el-button type="primary" @click="addProduct()">添加产品</el-button>
          </el-form-item>
  </el-form>
</div>
</template>
<script>
/* import store from '@/store/index' */
import { ref, reactive } from 'vue'
import store from '@/store/index'
import { ElMessage } from 'element-plus'
/* 引入提交方法 */
import upload from '@/utils/upload'
/* 引入提交组件 */
import Upload from '@/components/upload/upload.vue'
/* 引入路由钩子 */
import { useRouter } from 'vue-router'
export default {
  name: 'ProductAdd'
}
</script>
<script setup>
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
// 操作本地显示上传图片
const handleCover = (uploadFile) => {
  productForm.cover = URL.createObjectURL(uploadFile)
  // 添加file对象以完善图片数据信息
  productForm.file = uploadFile
}
// 操作提交
const router = useRouter()
const addProduct = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      /* 引入提交组件upload方法 */
      const res = await upload('adminapi/product/add', productForm)
      if (res.ActionType === 'ok') {
        ElMessage.success('提交成功！')
        /* 跳转到用户管理页面 */
        router.push('/product-manage/productlist')
      }
    }
  })
}
</script>
<style lang="less" scoped>
.el-form{
margin-top: 50px;
}
.el-form-item__label{
  justify-content:none
}
</style>
