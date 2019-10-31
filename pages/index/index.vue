<template>
  <scroll-view class="content">
    <div class="nav-bar">
      <p :class="{activeTab:'信息流'===activeTab}"
         @click="indexPosts">
        <span>信息流</span>
        <span class="notice"
              v-show="newPosts"></span>
      </p>

      <p :style="{color:'#ddd'}">|</p>

      <p :class="{activeTab:'仅看主题'===activeTab}"
         @click="threadPosts">
        <span>仅看主题</span>
      </p>

      <p :style="{color:'#ddd'}">|</p>

      <p :class="{activeTab:'@我的'===activeTab}"
         @click="atMePosts">
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

    <loading-animator />
  </scroll-view>
</template>

<script>

import { mapMutations } from 'vuex'

import indexApi from '../../api/indexApi'
import commonApi from '../../api/commonApi'

import postListCard from '../../components/postListCard'

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
    postListCard
  },
  onLoad () {
    this.checkLogin('/pages/index/index', 2)
    this.indexPosts()
    this.followList()

  },
  onShow () {
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
  onHide () {
    clearInterval(this.crnInterval)
    clearInterval(this.llInterval)
  },
  // 下拉刷新
  onPullDownRefresh () {
    if (this.activeTab === '信息流') this.indexPosts()
    else if (this.activeTab === '仅看主题') this.threadPosts()
    else this.indexPosts()
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
        else this.moreAtMePosts()
        this.lockReach = null
      }, 100)
    }
  },

  beforeDestroy () {
    clearInterval(this.crnInterval)
    clearInterval(this.llInterval)
  },

  computed: {
  },
  methods: {
    ...mapMutations([
      'SET_FOLLOWLIST'
    ]),
    // 格式化帖子
    formatQuoteMsg (list) {
      const posts = list.map(item => {
        return formatQuoteMsg(item)
      })
      return posts.reverse()
    },

    // 请求信息流
    indexPosts () {
      this.activeTab = '信息流'
      this.posts = []
      this.newPosts = 0
      indexApi.indexPosts()
        .then(res => {
          this.posts = this.formatQuoteMsg(res.data)
          this.curtime = res.curtime
          this.nexttime = res.nexttime
        })
    },


    // 请求更多信息流
    moreIndexPosts () {
      indexApi.moreIndexPosts(this.nexttime)
        .then(res => {
          const posts = this.formatQuoteMsg(res.data)
          this.posts = this.posts.concat(posts)
          this.nexttime = res.nexttime
        })
    },

    // 请求主题帖子列表
    threadPosts () {
      this.activeTab = '仅看主题'
      this.posts = []
      indexApi.threadPosts()
        .then(res => {
          this.posts = this.formatQuoteMsg(res.data)
          this.curtime = res.curtime
          this.nexttime = res.nexttime
        })
    },

    // 请求更多主题帖子列表
    moreThreadPosts () {
      indexApi.moreThreadPosts(this.nexttime)
        .then(res => {
          const posts = this.formatQuoteMsg(res.data)
          this.posts = this.posts.concat(posts)
          this.nexttime = res.nexttime
        })
    },


    // 只看@我的
    atMePosts () {
      this.activeTab = '@我的'
      this.posts = []
      this.newAtme = 0
      indexApi.atMePosts()
        .then(res => {
          this.posts = this.formatQuoteMsg(res.data)
          this.nexttime = res.nexttime
        })
    },

    // 请求更多@我的
    moreAtMePosts () {
      indexApi.moreAtMePosts(this.nexttime)
        .then(res => {
          const posts = this.formatQuoteMsg(res.data)
          this.posts = this.posts.concat(posts)
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

    // 获取关注版面列表
    followList () {
      commonApi.followList()
        .then(res => {
          this.SET_FOLLOWLIST(res)
        })
    }


  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  width: 100%;
  display: flex;
  padding: var(--status-bar-height) 20rpx 0;
  align-items: center;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 998;
  font-size: 36rpx;
  box-shadow: 0 0 4rpx 4rpx rgba($uni-text-color, 0.2);
  p {
    padding: 20rpx;
    text-align: center;
    color: #999;
    font-size: 32rpx;
    position: relative;
    .notice::after {
      content: "●";
      font-size: 14rpx;
      color: #fff;
      position: absolute;
      margin: 6rpx 12rpx;
    }
  }
  .activeTab {
    color: $uni-text-color-grey;
    font-weight: bold;
    margin-top: 8rpx;
    color: $uni-color-primary;
    border-bottom: 8rpx solid #fff;
  }
}

.post-list {
  border-radius: 30rpx;
  margin-top: 160rpx;
  li {
    @include main-layout;
  }
}
</style>
