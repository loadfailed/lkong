function formatThread(message) {

  const post = {}

  // 修改插图的比例
  const regImgUrl = /<img/gi
  if (regImgUrl.test(message)) {
    message = message.replace(regImgUrl, '<img style="max-width:100%"')
  }


  // 编辑信息
  const regPstatus = /^<i\sclass="pstatus">\s本帖最后由[\S\s]*编辑\s<\/i>/
  if (regPstatus.test(message)) post.pstatus = setStr(regPstatus.exec(message)[0], 20, 5)

  // 被回复者
  const regQuoteUser = /"\s>@[\S\s]*<\/a>\s发表于/
  if (regQuoteUser.test(message)) post.beQuoteUser = setStr(regQuoteUser.exec(message)[0], 4, 8)

  // 被回复帖子的发表时间
  const regQuoteDate = /发表于\s[\d\s-\:]*/
  if (regQuoteDate.test(message)) post.beQuoteDate = setStr(regQuoteDate.exec(message)[0], 4, 0)

  // 被回复帖子的内容
  const regQuoteMsg = /class="icon-reply"[\S\s]*<\/blockquote>/
  if (regQuoteMsg.test(message)) post.beQuoteMsg = setStr(regQuoteMsg.exec(message)[0], 38, 13)

  // 回帖
  // 由于富文本编辑器的匹配复杂度，所以使用删减原文的方法
  const regQuote = /<blockquote[\S\s]*<\/blockquote>/
  post.message = message.replace(regPstatus, '').replace(regQuote, '')

  return post

}

// 去除正则匹配多余字符
function setStr(str, num1, num2) {
  let res = str.substring(num1)
  res = res.substring(0, res.length - num2)
  return res
}

export default formatThread