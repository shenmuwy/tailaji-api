class resultCode {
  code;
  desc;

  constructor(code, desc) {
    this.code = code
    this.desc = desc
  }

  static SUCCESS = new resultCode(200, '操作成功')
  static VALIDATE_FAILED = new resultCode(400, '参数校验失败')
  static AUTH_FAILED = new resultCode(401, 'token验证失败')
  static API_NOT_FOUNT = new resultCode(404, '接口不存在')
  static FAILED = new resultCode(500, '操作失败')
  static API_BUSY = new resultCode(700, '操作过于频繁')
}

module.exports = resultCode