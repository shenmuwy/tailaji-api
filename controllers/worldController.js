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

      console.log(OSUtils.getMemoryUsage('gb'))
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
    const { status } = req.query
    try {
      const back = status == '1' ? await TShock.startWorld('世界2.wld') : await TShock.stopWorld()
      res.json(result.success( back ? {adminCode: back[0]}: ''))
    } catch (error) {
      res.json(result.fail(error))
      logger.error(error)
    }
  }
}

module.exports = modController