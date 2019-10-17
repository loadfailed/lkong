import request from '../tools/request'
const indexApi = {
  getPosts() {
    return request(`mod=data&sars=index/&_=${new Date().getTime()}`)
  },
  getMorePosts(nexttime) {
    return request(`mod=data&sars=index/&nexttime=${nexttime}&_=${new Date().getTime()}`)
  }
}
export default indexApi