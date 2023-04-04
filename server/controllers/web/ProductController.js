//业务处理 路由和数据库综合操作
const ProductService = require("../../services/web/ProductService");

const ProductController = {
    //获取信息列表
    getProductList: async (req, res) => {
        //操作数据库获取
       const result = await ProductService.getProductList({_id:req.params.id})
        //操作完成过后返回
        res.send({
            ActionType: 'ok',
            data:result
        }) 
    }
} 


module.exports = ProductController