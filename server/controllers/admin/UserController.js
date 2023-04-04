//业务处理 路由和数据库综合操作
const UserService = require("../../services/admin/UserService");
const JWT = require("../../util/jwt");

const UserController = {
    //登录操作
    login: async (req, res) => {
        var result = await UserService.login(req.body);
        //console.log(result);
       if (result.length === 0) {
            res.send({
                code: "-1",
                error:"用户名密码不匹配"
            })
       } else {
           //生成token 用返回结果的id和username做加密内容 有效时长60s
           const token = JWT.generate({
               _id: result[0]._id,
               username: result[0].username
           }, '1d')

           //设置响应头部的Authorization
           res.header('Authorization', token)
           
           //响应内容
            res.send({
                ActionType: "ok",
                data: {
                    username: result[0].username,
                    role: result[0].role,
                    gender: result[0].gender ? result[0].gender : 0,
                    avatar: result[0].avatar,
                    introduction: result[0].introduction,
                }
               
            })
        }  
    },  
    //上传表单信息操作
    infoUpload: async (req, res) => {
        const { username, introduction, gender } = req.body
        const avatar =req.file ?  `/avatarUploads/${req.file.filename}` : ""
        //从头部中获取token信息
        const token = req.headers['authorization'].split(' ')[1]
        var payload = JWT.verify(token)
        //操作数据库更新
        await UserService.infoUpload({ _id: payload._id, username, introduction, gender: Number(gender), avatar })
        //操作完成过后返回
        if (avatar) {
            res.send({
                ActionType: 'ok',
                data: {
                    username,
                    introduction,
                    gender: Number(gender),
                    avatar
                }
            })
        } else {
            res.send({
                ActionType: 'ok',
                data: {
                    username,
                    introduction,
                    gender: Number(gender)
                }
            })
        }
    },
    //添加用户
    add: async (req, res) => {
        const { username, introduction, gender, role, password } = req.body
        const avatar =req.file ?  `/avatarUploads/${req.file.filename}` : ""
        //操作数据库更新
        await UserService.add({ username, introduction, gender: Number(gender), avatar, role:Number(role), password })
        //操作完成过后返回
        res.send({
            ActionType: 'ok'
        })
    },
    //获取用户
    getUserList: async (req, res) => {
        //操作数据库获取
       const result = await UserService.getUserList(req.params)
        //操作完成过后返回
        res.send({
            ActionType: 'ok',
            data:result
        })
    },
    //删除用户
    deleteUserList: async (req, res) => {
        //获取携带的id
        const id = req.params.id 
        //根据id操作数据库_id进行删除
         const result = await UserService.deleteUserList({_id:id})
        //操作完成过后返回
        res.send({
            ActionType: 'ok'
        })
    },
    //修改用户
    putUserList: async (req, res) => {
        //操作数据库更新
         const result = await UserService.putUserList(req.body)
        //操作完成过后返回
        res.send({
            ActionType: 'ok'
        })
    }
} 


module.exports = UserController