//数据库操作
const NewsModel = require('../../models/NewsModel')

const NewsServices = {
    //根据ID查询新闻
    getNewsList: async ({ _id }) => {
        return _id ? NewsModel.find({ _id,isPublish:1 }) : NewsModel.find({isPublish:1 }).sort({editTime:-1})
    },
    //查询最新新闻
    getTopList: async ({ limit }) => {
        return NewsModel.find({isPublish:1 }).sort({editTime:-1}).limit(limit)
    }
}
module.exports = NewsServices;