import Vue from 'vue'
import App from './App'
import statusBar from './components/statusBar.vue'
import mineButton from './components/mineButton'
import newEditor from '@/components/newEditor'
import loadingAnimator from '@/components/loadingAnimator'

import store from './store/index'

Vue.prototype.$store = store

Vue.config.productionTip = false

Vue.component('statusBar', statusBar)
Vue.component('mineButton', mineButton)
Vue.component('newEditor', newEditor)
Vue.component('loadingAnimator', loadingAnimator)



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

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()