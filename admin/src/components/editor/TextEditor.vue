<template >
    <div id="myeditor">
    </div>
</template>
<script setup>
import { onMounted, defineEmits, defineProps } from 'vue'
import E from 'wangeditor'
// 设置子传父事件 父组件通过event监听
const emit = defineEmits(['event'])
// 设置父传子事件
const props = defineProps({ content: String })
onMounted(() => {
  const editor = new E('#myeditor')
  editor.create()
  // 设置初始值
  props.content && editor.txt.html(props.content)
  // 监听输入内容变化
  editor.config.onchange = function (newHtml) {
    // 子传父
    emit('event', newHtml)
  }
})

</script>
<style lang="less" scoped>

</style>
