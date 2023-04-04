//操作路由
var express = require('express');
const ProductController = require('../../controllers/web/ProductController'); 

var ProductRouter = express.Router();


/* GET home page. */
//获取用户信息列表
ProductRouter.get('/webapi/product/list', ProductController.getProductList); 


  

module.exports = ProductRouter;

