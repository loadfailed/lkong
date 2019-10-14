import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 检查用户有没有登录
Vue.prototype.checkLogin = function (backpage, backtype) {
  // backtype,1/redirectTo,2/switchTab
  let uid = uni.getStorageSync('uid')
  let name = uni.getStorageSync('name')
  let dzsbhey = uni.getStorageSync('dzsbhey')
  let auth = uni.getStorageSync('auth')

  if (uid === '' || auth === ' ') {
    uni.redirectTo({
      url: '../login/login?backpage=' + backpage + '&backtype=' + backtype
    })
    return false
  }
  console.log('uid', uid)

  // #ifndef APP-PLUS
  return {
    uid,
    name,
    dzsbhey,
    auth
  }
  // #endif

  // #ifdef APP-PLUS
  return {
    uid,
    name
  }
  // #endif



}

// 获取用户头像的URL


// 通用api
Vue.prototype.apiServer = 'http://localhost:5000/api'
Vue.prototype.lkongApi = 'http://lkong.cn/index.php?'

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()