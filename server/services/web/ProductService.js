//数据库操作
const ProductModel = require('../../models/ProductModel')

const ProductService = {
    //根据ID查询新闻
    getProductList: async ({ _id }) => {
        return _id ? ProductModel.find({_id}) : ProductModel.find()
    }
}
module.exports = ProductService;