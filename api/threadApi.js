import request from '../tools/request'
const threadApi = {
  // 获取帖子信息
  threadConfig(tid) {
    return request(`mod=ajax&action=threadconfig_${tid}&_=${new Date().getTime()}`)
  },
  // 获取帖子的回帖列表
  threads(tid) {
    return request(`mod=data&sars=thread/${tid}&_=${new Date().getTime()}`)
  },
  // 回帖
  sendPost(data) {
    return request(`mod=post`, data, 'POST')
  },
  // 翻页
  changePage(tid, page) {
    return request(`mod=data&sars=thread/${tid}/${page}&_=${new Date().getTime()}}`)
  }
}

export default threadApi