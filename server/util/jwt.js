//设置jwt工具

const jwtwebtoken = require('jsonwebtoken')
//设置密钥
const secret = "gao"

const JWT = {
    //jwt生成器(加密内容，设置密钥有效期)
    generate(value,expires) {
        //设置加密类型
      return  jwtwebtoken.sign(value,secret,{expiresIn:expires})
    },
    //jwt解密验证
    verify(token) {
       try {
        return jwtwebtoken.verify(token,secret) 
       } catch (e) {
        return false
       }
    }
}

module.exports = JWT