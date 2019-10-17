<template>
  <div class="content">
    <status-bar />
    <div class="nav-bar">
      <div class="title">
        <span>全部</span>
        <span :style="{color:'#ddd'}">|</span>
        <span>仅看主题</span>
        <span :style="{color:'#ddd'}">|</span>
        <span>@我的</span>
      </div>
      <div class="search">搜索</div>
    </div>
    <ul class="post-list">
      <li v-for="(post,index) in posts"
          :key="index">
        <post-list-card :post='post'
                        :isMine="false" />
      </li>
    </ul>
  </div>
</template>

<script>
import PostListCard from '../../components/postListCard'
import indexApi from '../../api/indexApi'
import setQuoteMsg from '../../tools/setQuoteMsg'



export default {
  data () {
    return {
      posts: {},
      curtime: 0,
      nexttime: 0
    }
  },
  components: {
    PostListCard
  },
  onLoad () {
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
        // console.log('首页请求结果', posts)
      })
  },
  // 上拉刷新
  onPullDownRefresh () {
    console.log('refresh');
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 1000);
  },
  methods: {


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
  height: 120rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  position: fixed;
  z-index: 998;
  box-shadow: 0 0 4rpx 4rpx rgba(#999, 0.5);
  .title {
    span {
      padding: 0 20rpx;
      font-size: 34rpx;
    }
  }
}
</style>
