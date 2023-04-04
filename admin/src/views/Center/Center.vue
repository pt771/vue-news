<template>
    <div>
          <!-- 页头 -->
      <el-page-header content="个人中心" icon="" title="新闻管理系统"></el-page-header>
<!-- 24栅格布局 -->
       <el-row :gutter="20">
          <!-- 头像栏 -->
          <el-col :span="8">
            <el-card class="left">
              <el-avatar :size="100" :src="avatarUrl" />
              <h2>{{ store.state.UserInfo.username }}</h2>
              <h3>{{ store.state.UserInfo.role === 1 ? '管理员' : '编辑' }}</h3>
            </el-card>
          </el-col>
          <!-- 内容栏 -->
          <el-col :span="16">
            <el-card>
          <!-- 表头 -->
              <template #header>
                <div class="card-header"> <span>个人信息</span> </div>
              </template>
              <el-form  ref="userInfoFormRef" :model="userInfoForm" :rules="userInfoRules" label-width="120px" class="demo-ruleForm" status-icon>
              <el-form-item label="用户名" prop="username">
                  <el-input v-model="userInfoForm.username" />
              </el-form-item>
              <el-form-item label="性别" prop="gender" >
                <el-select v-model="userInfoForm.gender" class="m-2" placeholder="选择性别" size="large" style="width:100%">
                   <el-option
                     v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"
                   />
                </el-select>
              </el-form-item>
              <el-form-item label="简介" prop="introduction">
                  <el-input v-model="userInfoForm.introduction" type="textarea"/>
              </el-form-item>
              <el-form-item label="头像" prop="avatar">
             <!--   upload组件应用 -->
                <Upload :avatar="userInfoForm.avatar" @dataChange="handleAvatar" />
              </el-form-item>
              <!-- 提交按钮 -->
              <el-form-item>
                <el-button type="primary" @click="submitForm()">更新</el-button>
              </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
    </div>
</template>
<script>
import store from '@/store/index'
import { computed, reactive, ref } from 'vue'

import { ElMessage } from 'element-plus'
/* 引入提交方法 */
import upload from '@/utils/upload'
/* 引入提交组件 */
import Upload from '@/components/upload/upload.vue'

export default {
  name: 'CenterView'
}
</script>
<script setup>
const defaultPicUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const avatarUrl = computed(() => store.state.UserInfo.avatar ? 'http://127.0.0.1:3000' + store.state.UserInfo.avatar : defaultPicUrl)
const { username, gender, introduction, avatar } = store.state.UserInfo
const userInfoFormRef = ref()
// 设置表单数据对象
const userInfoForm = reactive({
  username,
  gender,
  avatar,
  introduction,
  file: null
})
// 设置表单验证规则
const userInfoRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在3-5个字符', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'blur' }
  ],
  introduction: [
    { required: true, message: '请输入个人介绍', trigger: 'blur' }
  ],
  avatar: [
    { required: true, message: '请上传头像', trigger: 'blur' }
  ]
})
// 设置性别选择
const options = [
  {
    label: '保密',
    value: 0
  },
  {
    label: '男',
    value: 1
  }, {
    label: '女',
    value: 2
  }
]
// 操作本地显示上传头像
const handleAvatar = (uploadFile) => {
  userInfoForm.avatar = URL.createObjectURL(uploadFile)
  // 添加file对象以完善图片数据信息
  userInfoForm.file = uploadFile
}
// 操作提交
const submitForm = () => {
  userInfoFormRef.value.validate(async (valid) => {
    if (valid) {
      /* 引入提交组件upload方法 */
      const res = await upload('adminapi/user/upload', userInfoForm)
      if (res.ActionType === 'ok') {
        store.commit('changeUserInfo', res.data)
        ElMessage.success('更新成功！')
      }
    }
  })
}
</script>
<!-- 样式区域 -->
<style lang="less" scoped>
.el-row{
margin-top: 20px;
.left{
  text-align: center;
}
}

</style>
