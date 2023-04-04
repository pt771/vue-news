//操作路由
var express = require('express');
const UserController = require('../../controllers/admin/UserController'); 



var UserRouter = express.Router();

//引入multer组件解析上传的文件
const multer = require('multer')
//生成存储上传文件夹uploads
const upload = multer({dest:'public/avatarUploads/'})

/* GET home page. */
//登录路由
UserRouter.post('/adminapi/user/login', UserController.login); 
 //上传用户信息路由
UserRouter.post('/adminapi/user/upload', upload.single('file'), UserController.infoUpload); 
//添加用户操作
UserRouter.post('/adminapi/user/add', upload.single('file'), UserController.add); 
//获取用户信息列表
UserRouter.get('/adminapi/user/list/', UserController.getUserList); 
UserRouter.get('/adminapi/user/list/:id', UserController.getUserList); 
//实现用户列表的删除
UserRouter.delete('/adminapi/user/list/:id', UserController.deleteUserList); 
//实现用户列表的更新
UserRouter.put('/adminapi/user/list/:id', UserController.putUserList); 

  

module.exports = UserRouter;

