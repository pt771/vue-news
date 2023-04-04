<template>
    <div>
      <el-card>
        <!-- 页头 -->
      <el-page-header content="用户管理"  title="用户列表"></el-page-header>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" strip  border>
          <el-table-column prop="username" label="用户名" width="180" />
          <el-table-column  label="头像" >
            <template #default="scope">
              <div v-if="scope.row.avatar">
                <el-avatar :size="50" :src="'http://localhost:3000'+scope.row.avatar"></el-avatar>
              </div>
              <div v-else :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></div>
            </template>
          </el-table-column>
          <el-table-column prop="role" label="角色">
            <template #default="scope">
              <div >
                <el-tag v-if="scope.row.role === 1" class="ml-2" type="danger">管理员</el-tag>
                <el-tag v-else class="ml-2" type="info">编辑</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column  label="操作" >

            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-popconfirm title="确认删除该条信息吗？" width="200" confirm-button-text="是" cancel-button-text="否"
              @confirm="handleDelete(scope.row)">
                <template #reference>
                  <el-button  size="small"  type="danger" >删除</el-button >
                </template>
            </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 修改对话框 -->
      <el-dialog  v-model="dialogVisible"  title="编辑用户"  width="60%" >
        <el-form  ref="userFormRef" :model="userForm" :rules="userRules" label-width="120px" class="demo-ruleForm" status-icon>
              <el-form-item label="用户名" prop="username">
                  <el-input v-model="userForm.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="userForm.password" />
              </el-form-item>
              <el-form-item label="角色" prop="role" >
                <el-select v-model="userForm.role" class="m-2" placeholder="选择角色" size="large" style="width:100%">
                   <el-option
                     v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"
                   />
                </el-select>
              </el-form-item>
              <el-form-item label="个人简介" prop="introduction">
                  <el-input v-model="userForm.introduction" type="textarea"/>
              </el-form-item>
      </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="handleEditConfirm()">确认</el-button>
            </span>
          </template>
      </el-dialog>
    </div>
</template>
<script>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

export default {
  name: 'UserList'
}
</script>
<script setup>
const dialogVisible = ref(false)
const userFormRef = ref()
// 设置表单数据对象
const userForm = reactive({
  username: '',
  role: 2,
  password: '',
  introduction: ''
})
// 设置表单验证规则
const userRules = reactive({
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
// 设置接收表单
const tableData = ref([])
// 挂载刷新页面
onMounted(() => {
  getTableData()
})
// 获取用户数据
const getTableData = async () => {
  const res = await axios.get('/adminapi/user/list')
  console.log(res.data)
  if (res.data.ActionType === 'ok') {
    tableData.value = res.data.data
    return ElMessage.success('获取成功！')
  } else {
    ElMessage.error('获取失败！')
  }
}
// 编辑按钮操作
const handleEdit = async (data) => {
  // 根据id再次获取带有密码的数据对象
  const res = await axios.get(`/adminapi/user/list/${data._id}`)
  console.log(res.data.data)
  // 根据reactive特性实现响应式表单赋值
  Object.assign(userForm, res.data.data[0])
  dialogVisible.value = true
}
// 编辑提交
const handleEditConfirm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      // 发起更改请求
      await axios.put(`/adminapi/user/list/${userForm._id}`, userForm)
      // 关闭对话框
      dialogVisible.value = false
      // 刷新页面
      getTableData()
    }
  })
}
// 删除按钮操作
const handleDelete = async (data) => {
  // 操作删除
  await axios.delete(`/adminapi/user/list/${data._id}`)
  // 刷新页面
  getTableData()
}
</script>
<style lang="less" scoped>
.el-table{
  margin-top: 50px
}
</style>
