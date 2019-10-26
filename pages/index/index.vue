<template>
  <div class="content">
    <status-bar />
    <div class="nav-bar">

      <p :class="{activeTab:'信息流'===activeTab}"
         @click="getIndexPosts">
        <span>信息流</span>
        <span class="notice"
              v-show="newPosts"></span>
      </p>

      <p :style="{color:'#ddd'}">|</p>

      <p :class="{activeTab:'仅看主题'===activeTab}"
         @click="getThreadPosts">
        <span>仅看主题</span>
      </p>

      <p :style="{color:'#ddd'}">|</p>

      <p :class="{activeTab:'@我的'===activeTab}"
         @click="getAtMePosts">
        <span>@我的</span>
        <span class="notice"
              v-show="newAtme"></span>
      </p>

    </div>
    <ul class="post-list">
      <li v-for="(post,index) in posts"
          :key="index">
        <post-list-card :post='post'
                        :isMine="false" />
      </li>
    </ul>
    <uniLoadMore />

    <div>{{list.length}}</div>
  </div>
</template>

<script>


import indexApi from '../../api/indexApi'
import commonApi from '../../api/commonApi'

import postListCard from '../../components/postListCard'
import { uniLoadMore, uniPopup } from '@dcloudio/uni-ui'

import formatQuoteMsg from '../../tools/formatQuoteMsg'


export default {
  data () {
    return {
      posts: {},
      curtime: 0,
      nexttime: 0,
      activeTab: '信息流',

      lockReach: null,

      crnInterval: null,
      llInterval: null,

      newAtme: 0,
      newPosts: 0
    }
  },
  components: {
    postListCard,
    uniLoadMore
  },
  onLoad () {
    this.checkLogin('/pages/index/index', 2)
    this.indexPosts()
    // 定时检查是否有新的信息流
    this.crnInterval = setInterval(() => {
      this.checkReNew()
    }, 30 * 1000)
    // 定时检查是否有新的Atme
    this.langloop()
    this.llInterval = setInterval(() => {
      this.langloop()
    }, 60 * 1000)
  },
  // 下拉刷新
  onPullDownRefresh () {
    if (this.activeTab === '信息流') this.indexPosts()
    else if (this.activeTab === '仅看主题') this.threadPosts()
    else this.getMoreAtMePosts()
    uni.stopPullDownRefresh()
  },
  // 上拉加载
  onReachBottom () {
    // 防抖
    if (!this.lockReach) {
      clearTimeout(this.lockReach)
      this.lockReach = setTimeout(() => {
        if (this.activeTab === '信息流') this.moreIndexPosts()
        else if (this.activeTab === '仅看主题') this.moreThreadPosts()
        else this.getMoreAtMePosts()
        this.lockReach = null
      }, 100)
    }
  },

  beforeDestroy () {
    // clearInterval(this.interval)
    // this.newAtme = 0
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

    // 请求信息流
    indexPosts () {
      this.posts = []
      this.newPosts = 0
      indexApi.getIndexPosts()
        .then(res => {
          this.posts = this.formatQuoteMsg(res.data)
          this.curtime = res.curtime
          this.nexttime = res.nexttime
        })
    },


    // 请求更多信息流
    moreIndexPosts () {
      indexApi.getMoreIndexPosts(this.nexttime)
        .then(res => {
          const posts = this.formatQuoteMsg(res.data)
          for (let post of posts) {
            this.posts.push(post)
          }
          this.nexttime = res.nexttime
        })
    },

    // 检查是否有新的信息流
    checkReNew () {
      indexApi.checkReNew(this.curtime)
        .then(res => {
          this.newPosts = res
        })
    },

    // 检查是否有新的atme
    langloop () {
      indexApi.langloop(this.curtime)
        .then(res => {
          this.newAtme = res.notice.atme
        })
    },


    // 请求主题帖子列表
    threadPosts () {
      this.posts = []
      indexApi.getThreadPosts()
        .then(res => {
          this.posts = this.formatQuoteMsg(res.data)
          this.curtime = res.curtime
          this.nexttime = res.nexttime
        })
    },

    // 请求更多主题帖子列表
    moreThreadPosts () {
      indexApi.getMoreThreadPosts(this.nexttime)
        .then(res => {
          const posts = this.formatQuoteMsg(res.data)
          for (let post of posts) {
            this.posts.push(post)
          }
          this.nexttime = res.nexttime
        })
    },




    // 只看信息流
    getIndexPosts () {
      this.activeTab = '信息流'
      this.indexPosts()
    },

    // 只看主题
    getThreadPosts () {
      this.activeTab = '仅看主题'
      this.threadPosts()
    },

    // 只看@我的
    getAtMePosts () {
      this.activeTab = '@我的'
      this.posts = []
      this.newAtme = 0
      indexApi.getAtMePosts()
        .then(res => {
          this.posts = this.formatQuoteMsg(res.data)
          this.nexttime = res.nexttime
        })
    },

    // 请求更多@我的
    getMoreAtMePosts () {
      indexApi.getMoreAtMePosts(this.nexttime)
        .then(res => {
          const posts = this.formatQuoteMsg(res.data)
          for (let post of posts) {
            this.posts.push(post)
          }
          this.nexttime = res.nexttime
        })
    },

    // 获取关注版面列表
    getFollowForum () {
      commonApi.followForum()
        .then(res => {
          // 检查是否被关注
          for (let i of this.forumlist) {
            i.isFollow = res.fid.includes(i.fid + '')
          }
          for (let i of this.sysweimian) {
            i.isFollow = res.fid.includes(i.fid + '')
          }
          uni.setStorageSync('fid', res.fid)
        })
    }


  }
}
</script>

<style lang="scss" scoped>
.post-list {
  border-radius: 30rpx;
  margin-top: 120rpx;
  li {
    margin: 40rpx 0rpx;
    padding: 20rpx 40rpx 30rpx;
    border-radius: 10rpx;
    background: #fff;
  }
}

.nav-bar {
  width: 100%;
  display: flex;
  padding: 0 20rpx;
  // justify-content: center;
  align-items: center;
  background: #09c;
  color: #ddd;
  position: fixed;
  z-index: 998;
  box-shadow: 0 0 4rpx 4rpx rgba(#333, 0.5);
  p {
    padding: 20rpx;
    text-align: center;
    font-size: 30rpx;
    position: relative;
    .notice::after {
      content: "●";
      font-size: 14rpx;
      color: #fff;
      position: absolute;
      margin: 6rpx 10rpx;
    }
  }
  .activeTab {
    color: #fff;
    margin-top: 8rpx;
    border-bottom: 8rpx solid #fff;
  }
}
</style>
