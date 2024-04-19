const common ={
  formatTime: function(format, date = new Date(), isPad = false) {
    date = new Date(date)
    function _format(format) {
      if (typeof format !== 'string') {
        throw new TypeError('format must be a string')
      }
      if (format === 'date') {
        format = 'yyyy-MM-dd'
      }
      if (format === 'dateTime') {
        format = 'yyyy-MM-dd HH:mm:ss'
      }

      const formatFunc = (dateInfo) => {
        const { year, MM, dd, HH, mm, ss } = dateInfo
        return format.replaceAll('yyyy', year).replaceAll('MM', MM).replaceAll('dd', dd).replaceAll('HH', HH).replaceAll('mm', mm).replaceAll('ss', ss)
      }
      return formatFunc
    }

    const dateInfo = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    }
    dateInfo.yyyy = dateInfo.year.toString()
    dateInfo.MM = dateInfo.month.toString()
    dateInfo.dd = dateInfo.date.toString()
    dateInfo.HH = dateInfo.hour.toString()
    dateInfo.mm = dateInfo.minute.toString()
    dateInfo.ss = dateInfo.second.toString()
  
    function _pad(prop, len) {
      dateInfo[prop] = dateInfo[prop].padStart(len, '0')
    }
  
    if (isPad) {
      _pad('yyyy', 4)
      _pad('MM', 2)
      _pad('dd', 2)
      _pad('HH', 2)
      _pad('mm', 2)
      _pad('ss', 2)
    }

    format = _format(format)
    return format(dateInfo)
  }
}

module.exports = common