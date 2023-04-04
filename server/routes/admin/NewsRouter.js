//操作路由
var express = require('express');
const NewsController = require('../../controllers/admin/NewsController'); 

var NewsRouter = express.Router();

//引入multer组件解析上传的文件
const multer = require('multer')
//生成存储上传文件夹uploads
const upload = multer({dest:'public/newsUploads/'})

/* GET home page. */
 //上传用户信息路由
// UserRouter.post('/adminapi/user/upload', upload.single('file'), UserController.infoUpload); 
//添加用户操作
NewsRouter.post('/adminapi/news/add', upload.single('file'), NewsController.add); 
//获取用户信息列表
//根据作者获取
NewsRouter.get('/adminapi/news/list', NewsController.getNewsAuthorList); 
//根据id获取
NewsRouter.get('/adminapi/news/list/:id', NewsController.getNewsList); 
//修改新闻
NewsRouter.post('/adminapi/news/list', upload.single('file'),NewsController.updateNewsList); 
//获取用户信息列表
NewsRouter.put('/adminapi/news/publish', NewsController.publish); 
 //实现用户列表的删除
NewsRouter.delete('/adminapi/news/list/:id', NewsController.deleteNewsList); 


  

module.exports = NewsRouter;

