const Base = require('./base')

class User extends Base {
  constructor(props = 't_user') {
    super(props)
  }
}

module.exports = new User()