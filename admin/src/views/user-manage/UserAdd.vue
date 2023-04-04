<template>
      <div >
     <!-- 页头 -->
      <el-page-header content="用户管理" icon="" title="添加用户"></el-page-header>
<!-- 表单 -->
      <el-form  ref="userAddFormRef" :model="userAddForm" :rules="userAddRules" label-width="120px" class="demo-ruleForm" status-icon>
              <el-form-item label="用户名" prop="username">
                  <el-input v-model="userAddForm.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="userAddForm.password" />
              </el-form-item>
              <el-form-item label="角色" prop="role" >
                <el-select v-model="userAddForm.role" class="m-2" placeholder="选择角色" size="large" style="width:100%">
                   <el-option
                     v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"
                   />
                </el-select>
              </el-form-item>
              <el-form-item label="个人简介" prop="introduction">
                  <el-input v-model="userAddForm.introduction" type="textarea"/>
              </el-form-item>
              <el-form-item label="头像" prop="avatar">
             <!--   upload组件应用 -->
                <Upload :avatar="userAddForm.avatar" @dataChange="handleAvatar" />
              </el-form-item>
              <!-- 提交按钮 -->
              <el-form-item>
                <el-button type="primary" @click="addUser()">添加用户</el-button>
              </el-form-item>
      </el-form>
    </div>
</template>
<script>
/* import store from '@/store/index' */
import { ref, reactive } from 'vue'

import { ElMessage } from 'element-plus'
/* 引入提交方法 */
import upload from '@/utils/upload'
/* 引入提交组件 */
import Upload from '@/components/upload/upload.vue'
/* 引入路由钩子 */
import { useRouter } from 'vue-router'
export default {
  name: 'UserAdd'
}
</script>
<script setup>
const userAddFormRef = ref()
// 设置表单数据对象
const userAddForm = reactive({
  username: '',
  role: 2,
  avatar: '',
  password: '',
  introduction: '',
  file: null,
  gender: 0
})
// 设置表单验证规则
const userAddRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在2-10个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在6-12个字符', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'blur' }
  ],
  introduction: [
    { required: true, message: '请输入个人介绍', trigger: 'blur' }
  ],
  avatar: [
    { required: true, message: '请上传头像', trigger: 'blur' }
  ]
})
// 设置角色选择
const options = [
  {
    label: '管理员',
    value: 1
  }, {
    label: '编辑',
    value: 2
  }
]
// 操作本地显示上传头像
const handleAvatar = (uploadFile) => {
  userAddForm.avatar = URL.createObjectURL(uploadFile)
  // 添加file对象以完善图片数据信息
  userAddForm.file = uploadFile
}
// 操作提交
const router = useRouter()
const addUser = () => {
  userAddFormRef.value.validate(async (valid) => {
    if (valid) {
      /* 引入提交组件upload方法 */
      const res = await upload('adminapi/user/add', userAddForm)
      if (res.ActionType === 'ok') {
        /*         store.commit('changeUserInfo', res.data) */
        ElMessage.success('提交成功！')
        /* 跳转到用户管理页面 */
        router.push('/user-manage/userlist')
      }
    }
  })
}
</script>
<style lang="less" scoped>
.el-form{
  margin-top: 50px;
}
</style>
