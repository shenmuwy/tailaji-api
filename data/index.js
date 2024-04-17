const fs = require('fs')
const logger = require('../logger')
const filePath = './data/index.json'
const filecreate = {
  create: function () {
    if (!fs.existsSync(filePath)) {
      new Promise((resolve, reject) => {
        const data = {
          id: '1',
          userName: 'admin',
          passWord: '123456',
        }
        writeFile(data)
      })
    } else {
      logger.info('文件已存在')
    }
  },
  readFile: function () {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(JSON.parse(data))
      })
    })
  },
  writeFile: function (data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(data, null, '\t'), (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  }
}
module.exports = filecreate;