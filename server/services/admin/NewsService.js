//数据库操作
const NewsModel = require('../../models/NewsModel')

const NewsServices = {
    //添加新闻到数据库
    add: async ({ title, content, category, isPublish, cover, editTime,author }) => {
        //用create方法创建数据路对象
        return NewsModel.create({
            title, content, category, isPublish, cover, editTime,author
        })
    },
    //修改新闻到数据库
    updateNewsList: async ({_id, title, content, category, isPublish, cover, editTime }) => {
        if (cover) {
            //根据ID更新数据库字段
            return NewsModel.updateOne({ _id }, { title, content, category, isPublish, cover, editTime })
        } else {
            return NewsModel.updateOne({ _id }, { title, content, category, isPublish,editTime })
        }
    },
    //根据作者查询新闻
    getNewsAuthorList: async (author) => {
        console.log(author);
        return NewsModel.find({author})
    },
    //根据ID查询新闻
    getNewsList: async ({_id}) => {
        return _id ? NewsModel.find({_id}) : NewsModel.find({})
    },
    //修改发布状态
    publish:async ({_id,isPublish,editTime}) => {
        return NewsModel.updateOne({_id},{isPublish,editTime})
    },
     //删除新闻
    deleteNewsList: async ({_id}) => {
        return NewsModel.deleteOne({_id})
    },
     //修改新闻
    putNewsList:async (body) => {
        return NewsModel.updateOne({_id:body._id},body)
    },
}
module.exports = NewsServices;