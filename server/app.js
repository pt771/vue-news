var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var JWT = require('./util/jwt')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');
const NewsRouter = require('./routes/admin/NewsRouter');
const WebNewsRouter = require('./routes/web/NewsRouter');
const ProductRouter = require('./routes/admin/ProductRouter');
const WebProductRouter = require('./routes/web/ProductRouter');



var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/* webapi 企业官网用的 */
app.use(WebNewsRouter)
app.use(WebProductRouter)

//利用中间件对发送的token进行验证
app.use((req,res,next) => {
  //如果第一次则直接通过
  if (req.url === '/adminapi/user/login') {
    next()
    return
  }
  //不是第一次则进行验证
  const token = req.headers['authorization'].split(' ')[1]
  if (token) {
    //定义验证数据即生成token时加密的字符串内容
    var payload = JWT.verify(token)
    if (payload) {
      //重新赋值token以延续有效时间
      const newToken = JWT.generate({
        _id: payload._id,
        username:payload.username
      }, '1d')
      //再次在响应头中设置携带
      res.header('Authorization', newToken)
      //中间件向下执行
      next()
    } else {
      res.status(401).send({errorcode:"-1",errorInfo:'token过期'})
    }
  }
})
/* adminapi  后台系统用的 */
app.use(UserRouter);
app.use(NewsRouter);
app.use(ProductRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
