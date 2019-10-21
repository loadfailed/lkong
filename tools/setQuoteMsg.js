// 设置回帖格式
function setQuoteMsg(item) {
  if (item.isquote) {
    // 在App当中使用(?<=x)的模式会出现错误，于是暴力匹配
    // 被引用的人
    const regQuoteUser = /">@\S*<\/a/
    item.beQuoteUser = regQuoteUser.exec(item.message)[0]
    item.beQuoteUser = setStr(item.beQuoteUser, 3, 3)
    //被引用的内容
    const regQuoteMsg = /<\/a>\s:\s[\S\s]*<\/div><div><a/
    item.beQuoteMsg = regQuoteMsg.exec(item.message)[0]
    item.beQuoteMsg = setStr(item.beQuoteMsg, 7, 13)

    // 回复的内容
    const regMessage = /<\/div><\/div><\/div>[\S\s]*/
    item.message = regMessage.exec(item.message)[0]
    item.message = setStr(item.message, 18, 0)
    return item
  } else return item
}

// 去除正则匹配多余字符
function setStr(str, num1, num2) {
  let res = str.substring(num1)
  res = res.substring(0, res.length - num2)
  return res
}

export default setQuoteMsg