const common ={
  formatTime: function(format, date = new Date()) {
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }
    if (format==='yyyy-MM-dd') {
      return [year, month, day].join('-')
    }
  }
}

module.exports = common