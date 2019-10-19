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
          <text class="iconfont icon-user input-icon"></text>
        </i>
        <input class="uni-input"
               focus
               placeholder="请输入账号"
               v-model="email" />
      </div>
      <div class="login-input pwd">
        <i class="icon">
          <text class="iconfont icon-lock input-icon"></text>
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

      const userData = {
        action: 'login',
        email: this.email,
        password: this.password,
        rememberme: 'on'
      }


      // 登录请求
      uni.request({
        url: `http://lkong.cn/index.php?mod=login`,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: userData,
        success: res => {
          if (res.data.success) {
            // #ifndef APP-PLUS
            uni.setStorageSync('dzsbhey', res.cookies[0].split(';')[0].replace('dzsbhey=', ''))
            uni.setStorageSync('auth', res.cookies[1].split(';')[0].replace('auth=', ''))
            // #endif
            uni.setStorageSync('name', res.data.name)
            uni.setStorageSync('uid', res.data.uid)
            uni.setStorageSync('yousuu', res.data.yousuu)

            // 返回来的页面
            if (this.options.backtype === '1') uni.redirectTo({ url: this.options.backpage })
            else uni.switchTab({ url: this.options.backpage })
          } else {
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
  onLoad (options) {
    this.options = options
    for (let i = 0; i < 71; i++) this.dots.push(i)
  }
}
</script>

<style lang="scss" scoped>
@import url("./../../static/animation.css");

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