<template>
  <view>

  </view>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  onLoad (options) {
    const _this = this
    uni.request({
      url: _this.apiServer + '/users/test',
      methods: 'GET',
      data: {},
      success: res => { console.log('请求成功1', JSON.stringify(res)) },
      fail: e => { console.log('请求失败', JSON.stringify(res)); },
    })
    // #ifdef APP-PLUS
    uni.login({
      success: (res => {
        console.log('返回内容', JSON.stringify(res))
        uni.getUserInfo({
          success: function (info) {
            console.log('返回用户', JSON.stringify(info))
            uni.request({
              url: _this.apiServer + '/users/login',
              methods: 'POST',
              data: {},
              success: res => { console.log('请求成功2', JSON.stringify(res)) },
              fail: e => { console.log('请求失败', JSON.stringify(res)); },
            })
          },
          fail: () => {
            uni.showToast({ title: '登录失败请重试', icon: 'none' })
          }
        })
      }),
      fail: () => {
        uni.showToast({ title: '微信授权登录失败', icon: 'none' })
      }
    })
    // #endif
  }
}
</script>
