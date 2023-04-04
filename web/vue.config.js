const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 跨域反向代理
  devServer: {
    proxy: {
      '/webapi': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
