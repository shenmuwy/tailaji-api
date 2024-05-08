const { spawn, exec, execFile } = require('child_process')
const path = require('path')
const filePath = "C:\\Users\\wangyi\\Documents\\My Games\\Terraria\\Worlds\\"
const logger = require('../logs/logger')
const fs = require('fs')


class TShock {

  constructor() {
    this.wordPath = null
    this.child = null
  }

  async startWorld(wordname) {
    this.wordPath = filePath + wordname
    const TShockExe = path.join(__dirname, 'TShock.Server.exe')
    console.log(this.wordPath)
    process.env.DOTNET_ROOT = path.join(__dirname, 'dotnet')
    return new Promise((resolve, reject) => {
      this.child = exec(`${TShockExe} -world "${this.wordPath}" -port 7777 -maxplayers 8`, {cwd: __dirname})

      this.child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
        if (data.includes('/setup ')) {
          if (typeof data == 'object') {
            data = Buffer.from(data).toString('utf8')
          }
          const pattern = /\d+/g
          const matches = data.match(pattern)
          resolve(matches)
        } else if (data.includes('Server started')) {
          resolve()
        }
      })

      this.child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
        reject()
      })
    })
  }

  stopWorld() {
    return new Promise((resolve, reject) => {
      this.child.on('exit', (code, signal) => {
        console.log(`child process exited with code ${code + signal}`)
        resolve()
      })
      fs.readFile(path.join(__dirname, 'tshock', 'tshock.pid'), 'utf8', (err, data) => {
        if (err) {
          reject(err.message)
        }
        if (data) {
          process.kill(data, 'SIGINT')
        }
      })
    })
  }
}

module.exports = new TShock()
