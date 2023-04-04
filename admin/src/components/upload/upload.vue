<template>
    <el-upload
       class="avatar-uploader"
       action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
       :show-file-list="false"
       :auto-upload="false"
       :on-change ="handleAvatar"
     >
     <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
     <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
   </el-upload>
</template>
<script>
import { defineEmits, defineProps, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'
export default {
  name: 'uploadData'
}
</script >
<script setup >
const props = defineProps({
  avatar: String
})
const emit = defineEmits([
  'dataChange'
])

const uploadAvatar = computed(() => props.avatar.includes('blob') ? props.avatar : 'http://127.0.0.1:3000' + props.avatar)

// 操作本地显示上传头像
const handleAvatar = (uploadFile) => {
  emit('dataChange', uploadFile.raw)
}
</script>

<style lang="less" scoped>
::v-deep .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep  .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

//设置本地头像大小
.avatar{
  height: 178px;
  width: 178px;
}
</style>
