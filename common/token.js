//用于生成和解析token
const jwt = require('jsonwebtoken');
const configs = require('../configs');

exports.setToken = function(username,userid){
  return new Promise((resolve,reject)=>{
    let token = jwt.sign({
      name:username,
      _id:userid
    },configs.server.signkey,{ expiresIn:'1h' });
    // token = 'Bearer' + ' ' + token
    resolve(token);
  })
}

exports.verToken = function(token){
  return new Promise((resolve,reject)=>{
    const info = jwt.verify(token.split(' ')[1],signkey);
    resolve(info);
  })
}