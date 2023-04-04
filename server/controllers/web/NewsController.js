//业务处理 路由和数据库综合操作
const NewsService = require("../../services/web/NewsService");

const NewsController = {
    //获取信息列表
    getNewsList: async (req, res) => {
        //操作数据库获取
       const result = await NewsService.getNewsList({_id:req.params.id})
        //操作完成过后返回
        res.send({
            ActionType: 'ok',
            data:result
        }) 
    },
    //获取前4项
    getTopList: async (req, res) => {
                //操作数据库获取
       const result = await NewsService.getTopList({limit:req.query.limit})
       //操作完成过后返回
       res.send({
           ActionType: 'ok',
           data:result
       }) 
    }
} 


module.exports = NewsController