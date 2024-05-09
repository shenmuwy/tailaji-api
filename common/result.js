const resultCode = require('./resultCode')
const common = require('../utils/common')

class result {
  code;
  msg;
  data;
  time

  constructor(code, msg, data) {
    this.code = code
    this.msg = msg
    this.data = data
    this.time = common.formatTime('dateTime', new Date(), true)
  }

  static success (data) {
    return new result(resultCode.SUCCESS.code, resultCode.SUCCESS.desc, data)
  }

  static fail (errData) {
    return new result(resultCode.FAILED.code, errData || '服务异常', '')
  }
  // token验证失败
  static authFailed () {
    return new result(resultCode.AUTH_FAILED.code, resultCode.AUTH_FAILED.desc, null)
  }
  // 接口不存在
  static noFound () {
    return new result(resultCode.API_NOT_FOUNT.code, resultCode.API_NOT_FOUNT.desc, null)
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