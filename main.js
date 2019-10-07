import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.checkLogin = function (backpage, backtype) {
  // backtype,1/redirectTo,2/switchTab
  let SUID = uni.getStorageSync('SUID')
  let SRAND = uni.getStorageSync('SRAND')
  let SNAME = uni.getStorageSync('SNAME')
  let SFACE = uni.getStorageSync('SFACE')

  if (SUID === '' || SRAND === ' ' || SFACE === '') {
    uni.redirectTo({
      url: '../login/login?backpage=' + backpage + '&backtype=' + backtype
    })
    return false
  }
  return [SUID, SRAND, SNAME, SFACE]
}

Vue.prototype.apiServer = 'http://localhost:5000/api'

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()