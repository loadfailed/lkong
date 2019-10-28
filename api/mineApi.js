import request from '../tools/request'

const mineApi = {
  userInfo() {
    return request(`mod=ajax&action=userconfig&_=${new Date().getTime()}`)
  },

  userPosts() {
    const uid = uni.getStorageSync('uid')
    return request(`mod=data&sars=user/${uid}&_=${new Date().getTime()}`)
  },

  morePosts(nexttime) {
    const uid = uni.getStorageSync('uid')
    return request(`mod=data&sars=user/${uid}&nexttime=${nexttime}&_=${new Date().getTime()}`)
  },

  punch() {
    return request(`mod=ajax&action=punch`)
  }
}


export default mineApi