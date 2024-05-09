const logger = require("../utils/logs/logs")
const datajs = require('../data')
const result = require('../common/result')
const OSUtils = require('../utils/cpuMessage');
const os = require('os'); // 获取系统信息
const TShock = require('../utils/TShock/TShock.js')

const modController = {
  getCpuMessage: async function (req, res, next) {
    try {
      console.time('getCPUUsage')
      // 获取 CPU 利用率,获取时间长达1秒
      const cpuUsage = await OSUtils.getCPUUsage({ ms: 0, percentage: true });

      console.timeEnd('getCPUUsage')
      
      const cpuData = {
        cpuNum: os.cpus().length / 2,
        cpuUsage: Number(cpuUsage),
        memoryNum: OSUtils.getMemoryUsage('gb'),
        memoryUsage: OSUtils.getMemoryUsage('', true)
      }
      res.json(result.success(cpuData))
    } catch (error) {
      res.json(result.fail('程序内部发生错误'))
      logger.error(error)
    }
  },
  startWorld: async function (req, res, next) {
    try {
      const { status, worldName } = req.query
      if (status != '1' && status != '0') {
        return res.json(result.fail('参数有误'))
      }
      let back = null
      if (status == '1') {
        back = await TShock.startWorld(`${worldName}.wld`)
        datajs.saveFile('world/name', worldName)
      } else {
        back = await TShock.stopWorld()
      }
      res.json(result.success( back ? {adminCode: back[0]}: ''))
    } catch (error) {
      res.json(result.fail(error))
      logger.error(error)
    }
  },
  getWorldStatus: async function (req, res, next) {
    const userData = await datajs.readFile()
    try {
      const worldsName = TShock.getWorldName()
      const worldData = {
        worldsName,
        status: userData.world.status,
        name: userData.world.name
      }
      res.json(result.success(worldData))
    } catch (error) {
      res.json(result.fail('程序内部发生错误'))
      logger.error(error)
    }
  }
}

module.exports = modController