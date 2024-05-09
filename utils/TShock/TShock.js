const { spawn, exec, execFile } = require('child_process')
const path = require('path')
const filePath = "C:\\Users\\wangyi\\Documents\\My Games\\Terraria\\Worlds\\"
const logger = require('../logs/logger')
const fs = require('fs')
const datajs = require('../../data')


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
      datajs.saveFile('world/status', true)

      this.child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
        if (data.includes('/setup ')) {
          if (typeof data == 'object') {
            data = Buffer.from(data).toString('utf8')
          }
          const pattern = /\d+/g
          const matches = data.match(pattern)
          resolve(matches)
        }
        if (!fs.existsSync(path.join(__dirname, 'tshock', 'setup-code.txt'))) {
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
    return new Promise(async(resolve, reject) => {
      exec('tasklist | findstr TShock.Server.exe', (err, stdout, stderr) => {
        if (err) {
          datajs.saveFile('world/status', false)
          reject(err.message)
        }
        if (stdout) {
          console.log('stdout:', stdout)
          const pid = stdout.split(' ').filter(item => item !== '')
          const isRunning = process.kill(pid[1], 'SIGINT')
          if (isRunning) {
            datajs.saveFile('world/status', false)
          }
          resolve()
        }
        if (stderr) {
        console.log(stderr)  
        }
      })
    })
  }
}

module.exports = new TShock()
