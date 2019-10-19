import request from '../tools/request'
const indexApi = {
  // 请求信息流
  getIndexPosts() {
    return request(`mod=data&sars=index/&_=${new Date().getTime()}`)
  },
  // 请求更多信息流
  getMoreIndexPosts(nexttime) {
    return request(`mod=data&sars=index/&nexttime=${nexttime}&_=${new Date().getTime()}`)
  },
  // 请求@我
  getAtMePosts() {
    return request(`mod=data&sars=my/atme&_=${new Date().getTime()}`)
  },
  // 请求更多@我
  getMoreAtMePosts(nexttime) {
    return request(`mod=data&sars=my/atme&nexttime=${nexttime}&_=${new Date().getTime()}`)
  },

  // 请求主题
  getThreadPosts() {
    return request(`mod=data&sars=index/thread&_=1${new Date().getTime()}`)
  },
  // 请求更多主题
  getMoreThreadPosts(nexttime) {
    return request(`mod=data&sars=index/thread&nexttime=${nexttime}&_=${new Date().getTime()}`)
  }
}
export default indexApi