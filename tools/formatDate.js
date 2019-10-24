function formatDate(date) {
  const oDate = new Date(date * 1000)
  const year = oDate.getFullYear()
  const month = oDate.getMonth()
  const day = oDate.getDate()
  const hour = oDate.getHours()
  const minutes = oDate.getMinutes()

  const tempTime = new Date().getTime() - (date * 1000)
  if (tempTime <= 1 * 1 * 60 * 1000) {
    return `${Math.floor(tempTime/1000)} 秒前`

  } else if (tempTime <= 1 * 60 * 60 * 1000) {
    return `${Math.floor(tempTime/60/1000)} 分钟前`
  } else if (tempTime <= 24 * 60 * 60 * 1000) {
    return `${Math.floor(tempTime/60/60/1000)} 小时前`
  } else {
    let nHour = '0'
    hour < 10 ? nHour = nHour + hour : nHour = hour
    let nMinutes = '0'
    minutes < 10 ? nMinutes = nMinutes + minutes : nMinutes = minutes
    return year + '年' + month + '月' + day + '日 ' + hour + ':' + nMinutes
  }
}

export default formatDate