import request from '../tools/request'
const uid = uni.getStorageSync('uid')

const mineApi = {
  getUserInfo(params = {}) {
    return request(`mod=ajax&action=userconfig&_=${new Date().getTime()}`)
  },

  getUserPosts(params = {}) {
    return request(`mod=data&sars=user/${uid}&_=${new Date().getTime()}`)
  },

  getMorePosts(nexttime) {
    return request(`mod=data&sars=user/${uid}&nexttime=${nexttime}&_=${new Date().getTime()}`)
  }
}


export default mineApi