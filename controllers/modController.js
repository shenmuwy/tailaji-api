const logger = require("../utils/logs/logs")
const datajs = require('../data')
const result = require('../common/result')

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
  showMod: async function (req, res, next) {
    try {
      const modData = await datajs.readFile()
      console.log(modData.mods && modData.mods.length === 0)
      if (!(modData.mods && modData.mods.length !== 0)) {
        return res.json(result.fail('还没添加模组'))
      }
      res.json(result.success(modData.mods))
    } catch (error) {
      res.json(result.fail('程序内部发生错误'))
      logger.error(error)
    }
  }
}

module.exports = modController