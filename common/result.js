const resultCode = require('./resultCode')
const moment = require('moment')

class result {
  code;
  msg;
  data;
  time

  constructor(code, msg, data) {
    this.code = code
    this.msg = msg
    this.data = data
    this.time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  }

  static success (data) {
    return new result(resultCode.SUCCESS.code, resultCode.SUCCESS.desc, data)
  }

  static fail (errData) {
    return new result(resultCode.FAILED.code, errData, '')
  }
  //参数校验失败
  static validateFailed (param) {
    return new result(resultCode.VALIDATE_FAILED.code, resultCode.VALIDATE_FAILED.desc, param)
  }
  //业务异常
  static bizFail(bizException) {
    return new BizResult(bizException.code, bizException.msg, null);
  }
}

module.exports = result