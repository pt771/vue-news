//数据库操作
const UserModel = require('../../models/UserModel')

const UserService = {
    //路由操作数据库
    login: async ({ username, password }) => {
        return UserModel.find({
            username,
            password
        })
    },
    //更新数据上传到数据库操作
    infoUpload: async ({ _id, username, introduction, gender, avatar }) => {
        if (avatar) {
            //根据ID更新数据库字段
            return UserModel.updateOne({ _id }, { username, introduction, gender, avatar })
        } else {
            return UserModel.updateOne({ _id }, { username, introduction, gender })
        }
    },
    //添加用户到数据库
    add: async ({ username, introduction, gender, avatar, role, password }) => {
        //用create方法创建数据路对象
        return UserModel.create({
            username, introduction, gender, avatar, role, password
        })
    },
    getUserList: async ({id}) => {
        return id ? UserModel.find({ _id: id }, ['username', 'role', 'password', 'introduction'])
            : UserModel.find({}, ['username', 'role', 'avatar', 'introduction', 'gender'])
    },
    deleteUserList: async ({_id}) => {
        return UserModel.deleteOne({_id})
    },
    putUserList:async (body) => {
        return UserModel.updateOne({_id:body._id},body)
    },
}
module.exports = UserService;