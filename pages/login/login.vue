<template>
  <view>
    <div></div>

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
    // #ifdef APP-PLUS

    // 微信登录
    // uni.login({
    //   success: (res => {
    //     const info = res
    //     uni.getUserInfo({
    //       success: function (info) {
    //         uni.request({
    //           url: _this.apiServer + '/users/login',
    //           method: 'POST',
    //           header: { 'content-type': 'application/x-www-form-urlencoded' },
    //           data: info.userInfo,
    //           success: res => { console.log('请求成功', JSON.stringify(res)) },
    //           fail: e => { console.log('请求失败', JSON.stringify(res)); },
    //         })

    //       },
    //       fail: () => {
    //         uni.showToast({ title: '登录失败请重试', icon: 'none' })
    //       }
    //     })
    //   }),
    //   fail: () => {
    //     uni.showToast({ title: '微信授权登录失败', icon: 'none' })
    //   }
    // })

    uni.request({
      url: 'http://lkong.cn/index.php?mod=login',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        action: 'login',
        email: '190766630@qq.com',
        password: 'xxxxx',
      },
      success: res => {
        console.log('登录成功', JSON.stringify(res))
        if (res.success) {
          uni.setStorageSync('name', res.name)
          uni.setStorageSync('uid', res.uid)
          uni.setStorageSync('token', res.yousuu)
        } else {
          uni.showModal({
            title: '登录失败',
            content: res.data.error,
            showCancel: false
          })
        }
      }
    })

    // #endif
  }
}
</script>
