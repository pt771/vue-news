//操作产品路由
var express = require('express');
const ProductController = require('../../controllers/admin/ProductController'); 

var ProductRouter = express.Router();

//引入multer组件解析上传的文件
const multer = require('multer')
//生成存储上传文件夹uploads
const upload = multer({dest:'public/ProductUploads/'})

/* GET home page. */
 //上传用户信息路由
// UserRouter.post('/adminapi/user/upload', upload.single('file'), UserController.infoUpload); 
//添加用户操作
ProductRouter.post('/adminapi/product/add', upload.single('file'), ProductController.add); 

 //获取用户信息列表
//根据作者获取
ProductRouter.get('/adminapi/product/list', ProductController.getProductAuthorList); 
//根据id获取
ProductRouter.get('/adminapi/product/list/:id', ProductController.getProductList); 

 //修改新闻
ProductRouter.post('/adminapi/product/list', upload.single('file'),ProductController.updateProductList); 
/*//获取用户信息列表
ProductRouter.put('/adminapi/news/publish', ProductController.publish); */
 //实现用户列表的删除
ProductRouter.delete('/adminapi/product/list/:id', ProductController.deleteProductList);   
  

module.exports = ProductRouter;

