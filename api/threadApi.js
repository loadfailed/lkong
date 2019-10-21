import request from '../tools/request'
const threadApi = {
  // 获取帖子信息
  getThreadConfig(tid) {
    return request(`mod=ajax&action=threadconfig_${tid}&_=${new Date().getTime()}`)
  },
  // 获取帖子详情
  getThread(tid) {
    return request(`mod=data&sars=thread/${tid}&_=${new Date().getTime()}`)
  },
  // 回帖
  sendPost(data) {
    return request(`mod=post`, data)
  }
}

export default threadApi