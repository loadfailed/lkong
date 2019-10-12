function formaDate(date) {
  const oDate = new Date(date * 1000)
  const year = oDate.getFullYear()
  const month = oDate.getMonth()
  const day = oDate.getDate()
  const hour = oDate.getHours()
  const minutes = oDate.getMinutes()

  const tempTime = new Date().getTime() - (date * 1000)
  if (tempTime <= 1 * 1 * 60 * 1000) {
    return `${parseInt(tempTime/1000)} 秒前`

  } else if (tempTime <= 1 * 60 * 60 * 1000) {
    return `${parseInt(tempTime/60/1000)} 分钟前`
  } else if (tempTime <= 24 * 60 * 60 * 1000) {
    return `${parseInt(tempTime/60/60/1000)} 小时前`
  } else {
    return year + '年' + month + '月' + day + '日 ' + hour + ':' + minutes
  }
}

export default formaDate