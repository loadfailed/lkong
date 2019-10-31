<template>
  <div class="main">
    <header>

      <div class="content">
        <image :src="avatarUrl"
               :mode="aspectFit"
               class="forumAvatar"></image>
        <div>

          <div class="name">
            <p>{{name}}</p>
            <p class="followList">{{followList}}</p>
          </div>

          <p class="num">
            <span>粉丝数：{{config.fansnum}}</span>
            <span>今日发帖：{{config.todayposts}}</span>
          </p>

        </div>
      </div>

      <div class="description">
        <rich-text :nodes="config.description"></rich-text>
      </div>

    </header>

    <div class="moderators">
      <span class="title">版主列表：</span>
      <span v-for="(moderator,index) in config.moderators"
            :key="index"
            class="item">{{moderator}}</span>
    </div>

    <ul class="threadList">
      <li v-for="(post,index) in posts"
          :key="index"
          @click="navigateToThread(post.id)">

        <p class="title">
          <span class="reply__num">{{post.replynum}}</span>
          <span :style="post.isBold"
                class="thread__title">{{post.subject}}</span>
        </p>

        <div class="userInfo">

          <div class="avatar__name">
            <image class="userAvatar"
                   :src="post.avatarUrl"></image>
            <p>{{post.username}}</p>
          </div>

          <p>{{post.dateline}}</p>

        </div>

      </li>

    </ul>

    <loading-animator />

  </div>
</template>

<script>

import forumApi from '@/api/forumApi'

import formatQuoteMsg from '@/tools/formatQuoteMsg'
import getAvatarUrl from '@/tools/getAvatarUrl'

export default {
  name: 'forum',
  data () {
    return {
      fid: 0,
      name: '',
      avatarUrl: '',
      config: {},
      posts: [],
      curtime: 0,
      nexttime: 0,

      lockReach: null

    }
  },
  components: {
  },
  onLoad (options) {
    this.fid = options.fid
    this.name = options.name
    this.avatarUrl = JSON.parse(decodeURIComponent(options.avatarUrl))
    this.forumConfig()
    this.forumPosts()
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.forumConfig()
    this.forumPosts()
    uni.stopPullDownRefresh()
  },
  computed: {
    followList () {
      return '已关注'
    }
  },
  methods: {

    // 格式化帖子数据，这里需要设置头像url进行二次循环，因为性能问题,不使用rich-text
    formatThreadTitle (data) {

      // 使用(?<=y)x这种后行断言编译会出问题
      const regSubject = /[\s"]>+?[\S\s]*(?=<\/span>)/
      const regBold = /font-weight:\sbold;color:\s#[A-Za-z0-9]{6}/

      for (let i of data) {
        // 先设置属性
        if (regBold.test(i.subject)) {
          i.isBold = regBold.exec(i.subject)[0]
          console.log(i.isBold);
        }
        // 后格式化标题
        if (regSubject.test(i.subject)) {
          i.subject = regSubject.exec(i.subject)[0].substring(2)
        }
        // 设置头像
        i.avatarUrl = getAvatarUrl('avatar', i.uid, 'small')
      }
      return data
    },
    // 获取版面信息
    forumConfig () {
      this.posts = []
      forumApi.forumConfig(this.fid)
        .then(res => {
          this.config = res
        })
    },
    // 获取版面帖子列表
    forumPosts () {
      this.posts = []
      forumApi.forumPosts(this.fid)
        .then(res => {
          this.posts = this.formatThreadTitle(res.data)
        })
    },

    // 跳转到帖子
    navigateToThread (id) {
      const tid = id.substring(7);
      uni.navigateTo({
        url: `/pages/thread/thread?tid=${tid}`
      })
    },

    // 获取更多帖子
    moreForumPosts () {
      forumApi.moreForumPosts(this.fid, this.nexttime)
        .then(res => {
          const posts = this.formatThreadTitle(res.data)
          this.posts = this.posts.concat(posts)
          this.curtime = res.curtime
          this.nexttime = res.nexttime
        })
    },

    // 上拉加载
    onReachBottom () {
      // 防抖
      if (!this.lockReach) {
        clearTimeout(this.lockReach)
        this.lockReach = setTimeout(() => {
          this.moreForumPosts()
          this.lockReach = null
        }, 500)
      }
    },
  }
}
</script>
<style lang="scss" scoped>
header {
  @include main-layout;
  .content {
    display: flex;

    .forumAvatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      margin-right: 20rpx;
    }

    div {
      width: 70%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .name {
        width: 100%;
        margin-top: 8rpx;
        font-size: 36rpx;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .followList {
          padding: 12rpx 20rpx;
          margin: -12rpx -12% 0 0;
          font-size: 28rpx;
          font-weight: normal;
          border-radius: 12rpx;
          color: #999;
          background: $uni-bg-color-grey;
        }
        .isFollow {
          color: $uni-color-primary;
          background: $uni-bg-color;
        }
      }

      .num {
        margin-top: 20rpx;
        span {
          font-size: 28rpx;
          color: #999;
          display: inline-block;
          margin-right: 32rpx;
        }
      }
    }
  }
  .description {
    margin-top: 40rpx;
    padding-top: 40rpx;
    font-size: 32rpx;
    @include thinBorder((top), $uni-bg-color-grey);
  }
}

.moderators {
  @include main-layout;
  padding: 20rpx 40rpx;
  font-size: 28rpx;
  margin-top: 20rpx;
  line-height: 60rpx;
  .title,
  .item {
    margin: 12rpx 0;
    color: #666;
  }
  .title {
    font-weight: bold;
    margin-right: 10rpx;
  }
  .item {
    display: inline-block;
    padding: 0 24rpx;
    background: $uni-bg-color;
    border-radius: 12rpx;
    margin-right: 20rpx;
  }
}

.threadList {
  li {
    @include main-layout;
    .title {
      font-size: 32rpx;
      .reply__num {
        font-size: 24rpx;
        display: inline-block;
        background: $uni-bg-color-grey;
        padding: 8rpx 16rpx;
        border-radius: 8rpx;
        color: #999;
        margin: -4rpx 12rpx 0 0;
        vertical-align: middle;
      }
      .thread__title {
        padding: 4rpx 0;
      }
    }

    .userInfo {
      @include thinBorder((top), $uni-bg-color-grey);
      @include userInfo;
      display: flex;
      justify-content: space-between;
      .avatar__name {
        display: flex;
        align-items: center;
        .userAvatar {
          @include avatar;
        }
      }
    }
  }
}
</style>