//创建用户数据模型
const mongoose = require('mongoose')
 const Schema = mongoose.Schema 

const ProductType = {
    title: String,
    detail:String,
    cover:String,
    introduction: String,
    editTime: Date,
    author:String
}

const ProductModel = mongoose.model('product',new Schema(ProductType)) 

module.exports = ProductModel