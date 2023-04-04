//业务处理 路由和数据库综合操作
const ProductService = require("../../services/admin/ProductService");

const ProductController = {
    //添加用户
    add: async (req, res) => {
        const { title, detail, introduction,author} = req.body
        const cover =req.file ?  `/ProductUploads/${req.file.filename}` : ""
        //操作数据库更新
        await ProductService.add({ title, detail,  cover,introduction,author,editTime:new Date() })
        //操作完成过后返回
        res.send({
            ActionType: 'ok'
        })
    },
    //修改编辑产品
    updateProductList: async (req, res) => {
        const { title, detail, author,introduction, _id} = req.body
        const cover =req.file ?  `/ProductUploads/${req.file.filename}` : ""
        //操作数据库更新
        await ProductService.updateProductList({ _id, title, detail,author, editTime:new Date(),introduction , cover })
        //操作完成过后返回
        res.send({
            ActionType: 'ok'
        })
    },
    //根据作者获取用户
    getProductAuthorList: async (req, res) => {
        //操作数据库获取
       const result = await ProductService.getProductAuthorList( req.query.author )
        //操作完成过后返回
        res.send({
            ActionType: 'ok',
            data:result
        }) 
    },
    //根据ID获取用户
    getProductList: async (req, res) => {
        //操作数据库获取
       const result = await ProductService.getProductList({_id:req.params.id})
        //操作完成过后返回
        res.send({
            ActionType: 'ok',
            data:result
        })
    },
    //删除用户
    deleteProductList: async (req, res) => {
        //获取携带的id
        const id = req.params.id 
        //根据id操作数据库_id进行删除
         const result = await ProductService.deleteProductList({_id:id})
        //操作完成过后返回
        res.send({
            ActionType: 'ok'
        })
    },
    //修改用户
    putProductList: async (req, res) => {
        //操作数据库更新
         const result = await ProductService.putProductList(req.body)
        //操作完成过后返回
        res.send({
            ActionType: 'ok'
        })
    }
} 


module.exports = ProductController