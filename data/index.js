const fs = require('fs')
const filePath = './data/index.json'
const filecreate = {
  create: function () {
    if (!fs.existsSync(filePath)) {
      new Promise((resolve, reject) => {
        const data = {
          id: '1',
          userName: 'admin',
          passWord: '123456',
          world: {
            status: 0,
            name: ''
          }
        }
        writeFile(data)
      })
    } else {
      console.log('文件已存在')
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
  },
  updateJsonValue: function (data, name, value) {
    const keys = name.split('/')
    const key = keys.shift()
    if (keys.length === 0) {
      data[key] = value
    } else {
      if (!data.hasOwnProperty(key)) {
        data[key] = {}
      }
      this.updateJsonValue(data[key], keys.join('/'), value)
    }
    return data
  },
  saveFile: function (name, value) {
    return new Promise(async (resolve, reject) => {
      const data = await this.readFile()
      const res = this.updateJsonValue(data, name, value)
      this.writeFile(Object.assign(res, data))
    })
  }
}
module.exports = filecreate;