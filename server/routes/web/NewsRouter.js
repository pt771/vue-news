//操作路由
var express = require('express');
const NewsController = require('../../controllers/web/NewsController'); 

var NewsRouter = express.Router();


/* GET home page. */
//获取用户信息列表
NewsRouter.get('/webapi/news/list', NewsController.getNewsList); 
NewsRouter.get('/webapi/news/list/:id', NewsController.getNewsList); 
//获取前4项数据
NewsRouter.get('/webapi/news/toplist', NewsController.getTopList); 

  

module.exports = NewsRouter;

