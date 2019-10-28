import request from '../tools/request'
const indexApi = {
  // 请求信息流
  indexPosts() {
    return request(`mod=data&sars=index/&_=${new Date().getTime()}`)
  },
  // 请求更多信息流
  moreIndexPosts(nexttime) {
    return request(`mod=data&sars=index/&nexttime=${nexttime}&_=${new Date().getTime()}`)
  },
  // 请求@我
  atMePosts() {
    return request(`mod=data&sars=my/atme&_=${new Date().getTime()}`)
  },
  // 请求更多@我
  moreAtMePosts(nexttime) {
    return request(`mod=data&sars=my/atme&nexttime=${nexttime}&_=${new Date().getTime()}`)
  },

  // 请求主题
  threadPosts() {
    return request(`mod=data&sars=index/thread&_=1${new Date().getTime()}`)
  },
  // 请求更多主题
  moreThreadPosts(nexttime) {
    return request(`mod=data&sars=index/thread&nexttime=${nexttime}&_=${new Date().getTime()}`)
  },
  // 定时请求是否有新的信息流
  checkReNew(curtime) {
    return request(`mod=data&checkrenew=1&sars=index/&curtime=${curtime}&_=${new Date().getTime()}`)
  },
  // 定时请求是否有更新的信息
  langloop() {
    return request(`mod=ajax&action=langloop&_=${new Date().getTime()}`)
  },

}
export default indexApi