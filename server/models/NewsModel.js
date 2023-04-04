//创建用户数据模型
const mongoose = require('mongoose')
 const Schema = mongoose.Schema 

const NewsType = {
    title: String,
    content:String,
    category:Number,
    cover:String,
    isPublish: Number,
    editTime: Date,
    author:String
}

const NewsModel = mongoose.model('news',new Schema(NewsType)) 

module.exports = NewsModel