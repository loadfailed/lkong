import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.checkLogin = function (backpage, backtype) {
  // backtype,1/redirectTo,2/switchTab
  let uid = uni.getStorageSync('uid')
  let name = uni.getStorageSync('name')
  let token = uni.getStorageSync('token')

  if (uid === '' || token === ' ') {
    uni.redirectTo({
      url: '../login/login?backpage=' + backpage + '&backtype=' + backtype
    })
    return false
  }
  return [uid, name, token]
}

Vue.prototype.apiServer = 'http://localhost:5000/api'

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()