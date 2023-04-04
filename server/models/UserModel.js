//创建用户数据模型
const mongoose = require('mongoose')
 const Schema = mongoose.Schema 

const UserType = {
    username: String,
    password:String,
    gender:Number,
    introduction:String,
    avatar:String,
    role:Number
}

const UserModel = mongoose.model('user',new Schema(UserType)) 

module.exports = UserModel