// 设置回帖格式
function formatQuoteMsg(item) {
  // 修改插图的比例
  const regImgUrl = /<img/gi
  if (regImgUrl.test(item.message)) {
    item.message = item.message.replace(regImgUrl, '<img style="max-width:100%"')

  }
  // 提取回帖
  if (item.isquote) {
    // 在App当中使用(?<=x)的模式好像会出BUG，于是暴力匹配
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
    console.log(item.message);
  }
  item.message = '<div style="word-wrap: break-word;overflow:hidden;white-space: pre-wrap;width:100%">' + item.message + '</div>'
  return item
}

// 去除正则匹配多余字符
function setStr(str, num1, num2) {
  let res = str.substring(num1)
  res = res.substring(0, res.length - num2)
  return res
}

export default formatQuoteMsg