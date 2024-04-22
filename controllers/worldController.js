const logger = require("../utils/logs/logs")
const datajs = require('../data')
const result = require('../common/result')
const OSUtils = require('../utils/cpuMessage');
const os = require('os'); // 获取系统信息

const modController = {
  insertMode: async function (req, res, next) {
    try {
      const { modID, version } = req.body
      let modData = await datajs.readFile()
      if (!modID) {
        return res.json(result.fail('模组ID不能为空'))
      }
      if (modData.mods) {
        modData.mods.push({ modID, version })
      } else {
        modData.mods = []
        modData.mods.push({ modID, version })
      }
      
      datajs.writeFile(modData)
      return res.json(result.success())
    } catch (error) {
      logger.error(error)
    }
  },
  modifyMode: async function (req, res, next) {
    try {
      const { modID, version } = req.body
      let modData = await datajs.readFile()
      if (!modID) {
        return res.json(result.fail('模组ID不能为空'))
      }
      if (modData.mods) {
        modData.mods.map((item) => {
          if (item.modID === modID) {
            item.version = version
          }
        })
        datajs.writeFile(modData)
        return res.json(result.success())
      } else {
        return res.json(result.fail('还没添加模组'))
      }
    } catch (error) {
      logger.error(error)
    }
  },
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
  }
}

module.exports = modController