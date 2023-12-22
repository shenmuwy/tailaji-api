let fs=require('fs');

let path=require('path');

let apis=[];

fs.readdirSync(__dirname)
.filter(function(filename){
    return (filename!=='index.js')&&(filename.slice(-3)==='.js');
})
.forEach(function(filename){
    let filepath=path.join(__dirname,filename);
    apis.push(require(filepath))
})

var express=require('express');
var router=express.Router();

apis.forEach(api => {
    router.use('/',api)
})
module.exports=router;
