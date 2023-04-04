//业务处理 路由和数据库综合操作
const NewsService = require("../../services/admin/NewsService");

const NewsController = {
    //添加用户
    add: async (req, res) => {
        const { title, content, category, isPublish, author} = req.body
        const cover =req.file ?  `/newsUploads/${req.file.filename}` : ""
        //操作数据库更新
        await NewsService.add({ title, content, category: Number(category), editTime:new Date(), isPublish:Number(isPublish), cover,author })
        //操作完成过后返回
        res.send({
            ActionType: 'ok'
        })
    },
    //修改编辑新闻
    updateNewsList: async (req, res) => {
        const { title, content, category, isPublish, _id} = req.body
        const cover =req.file ?  `/newsUploads/${req.file.filename}` : ""
        //操作数据库更新
        await NewsService.updateNewsList({ _id, title, content, category: Number(category), editTime:new Date(), isPublish:Number(isPublish), cover })
        //操作完成过后返回
        res.send({
            ActionType: 'ok'
        })
    },
    //根据作者获取用户
    getNewsAuthorList: async (req, res) => {
        //操作数据库获取
       const result = await NewsService.getNewsAuthorList( req.query.author )
        //操作完成过后返回
        res.send({
            ActionType: 'ok',
            data:result
        }) 
    },
    //根据ID获取用户
    getNewsList: async (req, res) => {
        //操作数据库获取
       const result = await NewsService.getNewsList({_id:req.params.id})
        //操作完成过后返回
        res.send({
            ActionType: 'ok',
            data:result
        })
    },
    //修改发布状态
    publish: async (req, res) => {
        //操作数据库更新 更新时间
        await NewsService.publish({...req.body,editTime:new Date()})
        //操作完成过后返回
        res.send({
            ActionType: 'ok'
        })
    },
    //删除用户
    deleteNewsList: async (req, res) => {
        //获取携带的id
        const id = req.params.id 
        //根据id操作数据库_id进行删除
         const result = await NewsService.deleteNewsList({_id:id})
        //操作完成过后返回
        res.send({
            ActionType: 'ok'
        })
    },
    //修改用户
    putNewsList: async (req, res) => {
        //操作数据库更新
         const result = await NewsService.putNewsList(req.body)
        //操作完成过后返回
        res.send({
            ActionType: 'ok'
        })
    }
} 


module.exports = NewsController