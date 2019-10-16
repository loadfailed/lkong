import request from '../tools/request'
const indexApi = {
  getIndexPosts() {
    return request(`mod=data&sars=index/&_=${new Date().getTime()}`)
  }
}
export default indexApi