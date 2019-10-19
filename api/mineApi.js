import request from '../tools/request'

const mineApi = {
  getUserInfo() {
    return request(`mod=ajax&action=userconfig&_=${new Date().getTime()}`)
  },

  getUserPosts() {
    const uid = uni.getStorageSync('uid')
    return request(`mod=data&sars=user/${uid}&_=${new Date().getTime()}`)
  },

  getMorePosts(nexttime) {
    const uid = uni.getStorageSync('uid')
    return request(`mod=data&sars=user/${uid}&nexttime=${nexttime}&_=${new Date().getTime()}`)
  },

  getPunch() {
    return request(`mod=ajax&action=punch`)
  }
}


export default mineApi