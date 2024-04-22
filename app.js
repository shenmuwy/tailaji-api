const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('./utils/logs/logs')
const { expressjwt: jwt } = require("express-jwt");

const router = require('./routes/index');
const configs = require('./configs');
const datajs = require('./data');
const result = require('./common/result');

const app = express();

datajs.create();

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

app.use((req, res, next) => {  
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Token')
  next()
});



//插件类抖往上放  完事授权
//验证token是否过期并规定哪些路由不用验证


// 解析token获取用户信息
// app.use(async (req, res, next)=>{
//   let token = req.headers['x-token'];
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
  getToken: (req) => {
    if (req.headers['x-token']) {
      return req.headers['x-token'].replace('Bearer ', '')
    }
    return null
  }
}).unless({
  path: ['/api/user_login', '/user/user_reg', /^\/public\/.*/],
  method: ['OPTIONS']
}));
app.use('/api', router);


const _errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} ` + err.message)
  if (err.status == '401') {
    res.status(200).json(result.authFailed())
  }
}
app.use(_errorHandler)


app.use((req, res, next) => {
  res.status(404).send(result.noFound())
})


module.exports = app;
