<template>
  <view class="content">

    <view class="login-bg">
      <div class="animated-helix">
        <div class="dot"
             v-for="(item,index) in dots"
             :key="index"></div>

      </div>
    </view>

    <view class="login">
      <div class="login-input email">
        <i class="icon">
          <text class="iconfont icon-yinhangka input-icon"></text>
        </i>
        <input class="uni-input"
               focus
               placeholder="请输入账号"
               v-model="email" />
      </div>
      <div class="login-input pwd">
        <i class="icon">
          <text class="iconfont icon-mima input-icon"></text>
        </i>
        <input class="uni-input"
               password
               placeholder="请输入密码"
               v-model="password" />
      </div>
      <div>
        <button class="login-btn"
                @click="submit">立即登录</button>
      </div>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      inputText: '',
      dots: [],
      email: '',
      password: '',

      options: {}
    }
  },
  computed: {
  },
  methods: {
    submit () {
      // 校验邮箱
      const reg = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/
      if (!reg.test(this.email)) {
        uni.showToast({
          icon: 'none',
          title: '邮箱格式错误'
        })
        return
      }

      // 判断密码是否为空
      if (!this.password) {
        uni.showToast({
          icon: 'none',
          title: '密码不能为空'
        })
        return
      }

      const data = {
        action: 'login',
        email: this.email,
        password: this.password,
      }

      // 登录请求
      uni.request({
        url: 'http://lkong.cn/index.php?mod=login',
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data,
        success: res => {
          if (res.data.success) {
            console.log(res);
            uni.setStorageSync('name', res.data.name)
            uni.setStorageSync('uid', res.data.uid)
            uni.setStorageSync('token', res.data.yousuu)
            if (this.options.backtype === '1') uni.redirectTo({ url: this.options.backpage })
            else uni.switchTab({ url: this.options.backpage })
          } else {
            console.log('???');
            uni.showModal({
              title: '登录失败',
              content: res.data.error,
              showCancel: false
            })
          }
        },
        fail: res => {
          console.log(res);
        }
      })

    }
  },
  mounted () {
    for (let i = 0; i < 71; i++) this.dots.push(i)
  },
  onLoad (options) {
    this.options = options
    console.log(this.options);
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



    // #endif
  }
}
</script>

<style lang="scss" scoped>
@import url("./../../common/animation.css");

.login {
  .login-input {
    display: flex;
    .uni-input {
      background: #fff;
      height: 120rpx;
      width: 630rpx;
    }

    .icon {
      width: 120rpx;
      height: 120rpx;
      background: #fff;
      position: relative;
      .input-icon {
        font-size: 48rpx;
        color: #333;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -24rpx;
      }
    }
  }
  .email,
  .pwd {
    margin: 30rpx 0;
  }

  .login-btn {
    margin-top: 80rpx;
    width: 380rpx;
    height: 100rpx;
    border-radius: 60rpx;
    border: none;
    background: $uni-color-primary;
    color: #fff;
    font-size: 42rpx;
    line-height: 100rpx;
  }
}

.login-bg {
  position: relative;
  height: 400rpx;
  width: 100%;
  border-radius: 0 0 200px 150px / 0 0 50px 40px;
}
</style>