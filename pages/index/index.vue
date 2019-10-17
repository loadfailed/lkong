<template>
  <div class="content">
    <status-bar />
    <div class="nav-bar">

      <p :class="{activeTab:'全部'===activeTab}"
         @click="getIndexPosts">全部</p>

      <p :style="{color:'#ddd'}">|</p>

      <p :class="{activeTab:'仅看主题'===activeTab}"
         @click="getThreadPosts">仅看主题</p>

      <p :style="{color:'#ddd'}">|</p>

      <p :class="{activeTab:'@我的'===activeTab}"
         @click="getAtPosts">@我的</p>

    </div>
    <ul class="post-list">
      <li v-for="(post,index) in posts"
          :key="index">
        <post-list-card :post='post'
                        :isMine="false" />
      </li>
    </ul>
    <uniLoadMore />

  </div>
</template>

<script>

import postListCard from '../../components/postListCard'
import indexApi from '../../api/indexApi'
import setQuoteMsg from '../../tools/setQuoteMsg'
import { uniLoadMore, uniPopup } from '@dcloudio/uni-ui'


export default {
  data () {
    return {
      posts: {},
      curtime: 0,
      nexttime: 0,
      activeTab: '全部'
    }
  },
  components: {
    postListCard,
    uniLoadMore
  },
  onLoad () {
    this.getIndexPosts()
  },
  // 上拉刷新
  onPullDownRefresh () {
    this.getIndexPosts()
    uni.stopPullDownRefresh()
  },
  // 下拉加载
  onReachBottom () {
    this.getMorePosts()
  },
  methods: {
    // 请求首页帖子列表
    getIndexPosts () {
      this.posts = []
      indexApi.getIndexPosts()
        .then(res => {
          // console.log(res.data);
          const posts = res.data.map(item => {
            if (item.isquote) {
              return setQuoteMsg(item)
            } else {
              return item
            }
          })
          this.curtime = res.curtime
          this.nexttime = res.nexttime
          this.posts = posts.reverse()
        })
    },

    // 请求更多
    getMorePosts () {
      this.activeTab = '全部'
      indexApi.getMorePosts(this.nexttime)
        .then(res => {
          const posts = res.data.map(item => {
            if (item.isquote) {
              return setQuoteMsg(item)
            } else {
              return item
            }
          })
          for (let post of posts.reverse()) {
            this.posts.push(post)
          }
          this.nexttime = res.data.nexttime
        })
    },

    // 请求全部
    getIndexPosts () {
      this.activeTab = '全部'
        = 'index'
      this.getIndexPosts()
    },

    // 只看主题
    getThreadPosts () {
      this.activeTab = '仅看主题'
      const arr = this.posts.reduce((newArr, item) => {
        if (item.isthread) {
          return 1
        }
      }, 0)
    },

    // 请求@我的
    getAtPosts () {
      this.activeTab = '@我的'
      this.getIndexPosts()
    }


  }
}
</script>

<style lang="scss" scoped>
.post-list {
  border-radius: 30rpx;
  margin-top: 160rpx;
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
  justify-content: center;
  align-items: center;
  background: #09c;
  color: #ddd;
  position: fixed;
  z-index: 998;
  box-shadow: 0 0 4rpx 4rpx rgba(#999, 0.5);
  p {
    padding: 30rpx;
    text-align: center;
    font-size: 34rpx;
  }
  .activeTab {
    color: #fff;
    border-bottom: 2px solid #fff;
  }
}
</style>
