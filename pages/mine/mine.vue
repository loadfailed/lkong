<template>
  <div v-if="!isClearStorage">
    <div class="header">

      <div class="image__content">
        <div class="user">
          <image class="mine__avatar"
                 :mode="aspectFit"
                 :src="user.avatarUrl">
          </image>
          <div>

            <p>{{user.name}}</p>

            <p class="wallet">

              <span>龙币：{{user.extcredits2}}</span>
              <span>{{' '+'|'+' '}}</span>
              <span>龙晶：{{user.extcredits3}}</span>

            </p>

          </div>
        </div>
        <div class="icon-font icon-set set-icon"
             @click="openPopup"></div>
      </div>

      <div class="user__info">
        <div>
          <p class="num">{{user.fansnum}}</p>
          <p>粉丝列表</p>
        </div>
        <div>
          <p class="num">{{user.followuidnum}}</p>
          <p>我关注的</p>
        </div>
        <div>
          <p class="num">{{user.threads}}</p>
          <p>我的主题</p>
        </div>
        <div>
          <p class="num">{{user.posts}}</p>
          <p>所有帖子</p>
        </div>
      </div>

      <div class="punch"
           @click="userPunch">
        <p v-if="user.isPunch">
          <span>已连续签到</span>
          <span style="font-weight:bold;padding:0 12rpx;">{{user.punchday}}</span>
          <span>天</span>
        </p>
        <p v-if="!user.isPunch">今天还没有签到，立即签到</p>
      </div>

    </div>

    <div class="post__title">{{user.posts?'- - 我的动态 - -':'- - 暂无动态 - -'}}</div>

    <div class="post__list"
         v-if="user.posts">
      <ul>
        <li v-for="(post,index) in posts"
            :key="index">
          <post-list-card :post="post"
                          :isMine="true" />
        </li>
      </ul>
      <uniLoadMore />
    </div>

    <div>
      <uni-popup ref="popup"
                 type="center"
                 custom="true">
        <button type="default"
                @click="clearStorages">退出账号</button>
      </uni-popup>
    </div>

  </div>
</template>

<script>

import formatQuoteMsg from '../../tools/formatQuoteMsg'
import getAvatarUrl from '../../tools/getAvatarUrl';

import PostListCard from '../../components/postListCard';

import mineApi from '../../api/mineApi'


import { uniLoadMore, uniPopup } from '@dcloudio/uni-ui'

export default {
  data () {
    return {
      user: {
        uid: 0,
        name: '未登录',
        dzsbhey: '',
        auth: '',
        posts: 0,
        threads: 0,
        fansnum: 0,
        followuidnum: 0,
        extcredits2: 0,
        extcredits3: 0,
        punchday: 0,
        isPunch: false,
        sortkey: new Date().getTime()
      },

      posts: [],

      curtime: 0,
      nexttime: 0,

      isClearStorage: false


    }
  },
  components: {
    uniLoadMore,
    uniPopup,
    PostListCard
  },
  onLoad () {
    const user = this.checkLogin('/pages/mine/mine', 2)
    for (let i in user) {
      this.user[i] = user[i]
    }
    this.user.avatarUrl = getAvatarUrl('avatar', this.user.uid, 'middle')
    this.getUserInfo()
    this.getUserPosts(user.uid)
  },
  // 上拉刷新
  onPullDownRefresh () {
    this.getUserPosts()
    uni.stopPullDownRefresh()
  },
  // 下拉加载
  onReachBottom () {
    this.getMorePosts()
  },
  computed: {
  },
  methods: {
    // 格式化帖子
    formatQuoteMsg (list) {
      const posts = list.map(item => {
        return formatQuoteMsg(item)
      })
      return posts.reverse()
    },
    // 获取用户信息
    getUserInfo () {
      mineApi.getUserInfo()
        .then(res => {
          for (let key in res) {
            this.user[key] = res[key]
          }
          // 修改storage中的数据
          uni.setStorageSync('name', res.username)

          const punchtime = res.punchtime * 1000
          const year = new Date().getFullYear()
          const month = new Date().getMonth()
          const date = new Date().getDate()
          const todaytime = new Date(year, month, date).getTime()
          punchtime === todaytime ? this.user.isPunch = true : this.user.isPunch = false
        })
    },

    // 获取所有发帖
    getUserPosts (uid) {
      this.posts = []
      mineApi.getUserPosts(uid)
        .then(res => {
          const posts = this.formatQuoteMsg(res.data)
          this.curtime = res.curtime
          this.nexttime = res.nexttime
          this.posts = posts
          // console.log('请求所有发帖', this.posts)
        })
    },

    // 加载更多
    getMorePosts () {
      mineApi.getMorePosts(this.nexttime)
        .then(res => {
          const posts = this.formatQuoteMsg(res.data)
          for (let post of posts) {
            this.posts.push(post)
          }
          // console.log('请求加载更多', posts)
          this.nexttime = res.data.nexttime
        })
    },

    // 签到
    userPunch () {
      if (this.user.isPunch) {
        uni.showToast({
          title: '今天已签到',
          icon: 'none'
        })
      } else {
        mineApi.getPunch()
          .then(res => {
            this.user.punchday = res.punchday
            this.user.isPunch = true
          })
      }
    },


    // 弹窗
    openPopup () {
      this.$refs.popup.open()
    },

    // 退出账号
    clearStorages () {
      try {
        uni.clearStorageSync()
      } catch (err) {
        throw err
      }
      this.isClearStorage = true
      this.$nextTick(() => {
        this.isClearStorage = false
        this.checkLogin('/pages/index/index', 2)
      })
    }





  }
}
</script>

<style lang="scss" scoped>
$light-color: #b1d5e2;

.header {
  padding: 100rpx 20rpx 20rpx;
  overflow: hidden;
  background: linear-gradient(to bottom right, $uni-color-primary, #106a7d);
  border-radius: 0 0 50% 50%/0 0 40rpx 40rpx;

  .image__content {
    display: flex;
    justify-content: space-between;
    .user {
      display: flex;
      margin: 0 20rpx;
      .mine__avatar {
        @include avatar;
        height: 120rpx;
        width: 120rpx;
        border: 1rpx solid #fff;
      }
      p {
        line-height: 80rpx;
        color: #fff;
        font-size: 38rpx;
        padding: 0 20rpx;
      }
      .wallet {
        line-height: 40rpx;
        color: $light-color;
        font-size: 28rpx;
      }
    }
    .set-icon {
      font-family: "iconfont";
      line-height: 90rpx;
      font-size: 20px;
      font-weight: bold;
      color: $light-color;
      padding: 0 30rpx;
    }
  }
  .user__info {
    display: flex;
    margin: 30rpx -40rpx;
    div {
      width: 25%;
      p {
        color: $light-color;
        font-size: 24rpx;
        line-height: 48rpx;
        text-align: center;
      }
      .num {
        color: #fff;
        font-size: 28rpx;
        font-weight: bold;
      }
    }
  }

  .punch {
    width: 100%;
    height: 112rpx;
    border-radius: 12rpx;
    margin: 20rpx auto -40rpx;
    background: #47cd75;
    font-size: 28rpx;
    color: #fff;
    text-align: center;
    line-height: 112rpx;
  }
}

.post__title {
  width: 92%;
  height: 80rpx;
  font-size: 32rpx;
  line-height: 80rpx;
  text-align: center;
  color: $uni-text-color-grey;
  margin: 20rpx auto 0;
}

.post__list {
  border-radius: 30rpx;
  margin-top: -40rpx;
  li {
    margin: 40rpx 0rpx;
    padding: 20rpx 40rpx 30rpx;
    border-radius: 12rpx;
    background: #fff;
  }
}
</style>
