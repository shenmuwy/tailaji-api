const User = require('../module/user')
const result = require('../common/result')
const token = require('../common/token')
const formidable = require('formidable')
const fs = require('fs')
const {v4: uuidv4} = require('uuid')
const datajs = require('../data');
const logs = require('../utils/logs/logs')

const userController = {
  // showUser 获取用户数据并展示到页面
  showUser: async function(req, res, next) {
    let id = req.query.id
    User.all(id).then((data) => {
      // console.log(data);
      if (data.length===0) {
        res.json(result.fail('该用户不存在'))
        return
      }
      res.json(result.success(data))
    }).catch((error) => {
      res.json(result.fail('程序内部发生错误'))
    })
  },
  // 用户注册
  insertUser: async function(req, res, next) {
    try {
      let user = req.body
      let userData = await User.insert(user)
      res.json(result.success({}))
    } catch (error) {
      res.json(result.fail('程序内部发生错误'))
      console.log(error);
    }
  },
  // 用户登录
  loginUser: async function(req, res, next) {
    try {
      const {name, psw} = req.body
      if (!(name && psw)) {
        res.json(result.fail('账号或密码不能为空'))
        return
      }
      const userData = await datajs.readFile()
      console.log(userData)
      if (name === userData.userName && psw === userData.passWord) {
        token.setToken(name ,userData.id).then( (token) => {
          res.json(result.success({token, userId: userData.id}))
        })
        
      } else {
        res.json(result.fail('账号或密码不正确'))
      }
    } catch (error) {
      res.json(result.fail('程序内部发生错误'))
      console.log(error);
    }
  },
  // 用户上传头像
  uploadUser: async function(req, res, next) {
    try {
      const form = formidable({ multiples: true });

      form.parse(req, (err, fields, files) => {
        console.log(111);
        console.log(err, fields, files)
        if (err) {
          next(err);
          return;
        }
        if (files.img.mimetype != 'image/png') {
          res.json(result.fail('请上传图片'))
          return
        }
        let imgName = uuidv4()
        fs.writeFileSync(`public/images/${imgName}`, fs.readFileSync(files.img.filepath));
        res.json(result.success({img: `public/images/${imgName}.png`}))
      })
    } catch (error) {
      res.json(result.fail('程序内部发生错误'))
      console.log(error);
    }
  },
  modifyUser: async function(req, res, next) {
    try {
      const { oldPsw, psw } = req.query
      console.log(req.query)
      let userData = await datajs.readFile()
      if (!psw) {
        return res.json(result.fail('密码不能为空'))
      }
      if (oldPsw !== userData.passWord) {
        return res.json(result.fail('原密码不正确'))
      }
      if (psw === oldPsw) {
        return res.json(result.fail('新密码和旧密码不能相同'))
      }
      userData.passWord = psw
      await datajs.writeFile(userData)
      res.json(result.success())
    } catch (error) {
      res.json(result.fail('程序内部发生错误'))
      console.log(error);
    }
  }
}

module.exports = userController