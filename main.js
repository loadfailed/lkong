import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.checkLogin()=function(backpage,backtype){
	let SUID = uni.getStorageSync('SUID')
	let SRAND = uni.getStorageSync('SRAND')
	let SNAME = uni.getStorageSync('SNAME')
	let SFACE = uni.getStorageSync('SFACE')
	
	if(SUID ==='' || SRAND ===' ' || SFACE===''){
		uni.redirectTo({
			  url:"../login/login?backpage="+backpage+"&backtype="+backtype
		})
		return false
	}
	return [SUID,SRAND,SNAME,SFACE]
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
