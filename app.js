var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('./logger')
var { expressjwt: jwt } = require("express-jwt");

var usersRouter = require('./routes/users');
const configs = require('./configs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
// 配置解析表单请求体：application/json
app.use(express.json());
//配置解析表单请求体：application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 访问静态资源
app.use('/public',express.static('public'));


//插件类抖往上放  完事授权
//验证token是否过期并规定哪些路由不用验证


// 解析token获取用户信息
// app.use(async (req, res, next)=>{
//   let token = req.headers.authorization;
//   console.log(req);
//   console.log(token);
//   if(token == undefined){
//     return next();
//   }
//   try{
//     let data=await vertoken.verToken(token)
//     console.log(data);
//     return next();
//   }catch{
//     return next();
//   }
// });

app.use(jwt({
  secret: configs.server.signkey,
  algorithms: ['HS256'],
}).unless({
  path: ['/user/user_login', '/user/user_reg', /^\/public\/.*/]//除了这些地址，其他的URL都需要验证
}));
// 啥都不加 和单独加/ 一个作用  先定义的生效 后定义的不执行 所以 顺序很重要 你要监听全部 bi
app.use('/user', usersRouter);

let code401 = '请先登录!'

const _errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} ` + err.message)
  let errMsg = ''
  if (err.status == '401') {
    errMsg = code401
  }
  res.status(err.status || 500).json({
    code: err.status,
    message: errMsg,
    data: {}
  })
}
app.use(_errorHandler)

module.exports = app;
