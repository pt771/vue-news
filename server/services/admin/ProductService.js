//数据库操作
const ProductModel = require('../../models/ProductModel')

const ProductServices = {
    //添加产品到数据库
    add: async ({ title, detail, author, cover,introduction,editTime }) => {
        //用create方法创建数据路对象
        return ProductModel.create({
            title, detail,  cover,introduction,editTime,author
        })
    },
    //修改产品到数据库
    updateProductList: async ({_id, title, detail,author, editTime,introduction , cover }) => {
        if (cover) {
            //根据ID更新数据库字段
            return ProductModel.updateOne({ _id }, { title, detail,author, editTime,introduction , cover })
        } else {
            return ProductModel.updateOne({ _id }, { title, detail,author, editTime,introduction  })
        }
    },
    //根据作者查询产品
    getProductAuthorList: async (author) => {
        return ProductModel.find({author})
    },
    //根据ID查询产品
    getProductList: async ({_id}) => {
        return _id ? ProductModel.find({_id}) : ProductModel.find({})
    },
    //修改发布状态
    publish:async ({_id,isPublish,editTime}) => {
        return ProductModel.updateOne({_id},{isPublish,editTime})
    },
     //删除产品
    deleteProductList: async ({_id}) => {
        return ProductModel.deleteOne({_id})
    },
     //修改产品
    putProductList:async (body) => {
        return ProductModel.updateOne({_id:body._id},body)
    },
}
module.exports = ProductServices;