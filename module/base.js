const knex = require('../module/knex')

class Base{
  constructor(props){
    this.table = props
  }

  all (params) {
    // let sql = knex(this.table).select({
    //   id: 'id',
    //   name: 'name',
    //   phone: 'phone',
    //   img: 'user_img'
    // })
    let sql = knex(this.table).select('id', 'name', 'phone', 'user_img')
    if (params) {
      sql = sql.where({
        'id': params
      })
    }
    return sql
  }
  login (name, psw) {
    return knex(this.table).where({
      'name': name,
      'password': psw
    })
  }

  insert (params) {
    return knex(this.table).insert(params);
  }

  update (id, params) {
    return knex(this.table).where({'id': id}).update(params);
  }

  delete (id) {
    return knex(this.table).where({'id': id}).del();
  }
}

module.exports = Base