const fs=require('fs');
const path=require('path');
const express=require('express');
const router=express.Router();

let apis=[];

fs.readdirSync(__dirname)
.filter(function(filename){
    return (filename!=='index.js')&&(filename.slice(-3)==='.js');
})
.forEach(function(filename){
    let filepath=path.join(__dirname,filename);
    apis.push(require(filepath))
})

apis.forEach(api => {
    router.use('/',api)
})
module.exports=router;
