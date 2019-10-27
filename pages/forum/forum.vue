<template>
  <div class="main">
    <status-bar />

    <header>

      <div class="content">
        <image :src="avatarUrl"
               :mode="aspectFit"
               class="forumAvatar"></image>
        <div>

          <div class="name">
            <p>{{name}}</p>
            <p class="followForum">{{followForum}}</p>
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

    <ul>
      <li v-for="{post,index} in posts"
          :key="index">

      </li>
    </ul>

  </div>
</template>

<script>

import forumApi from '@/api/forumApi'

import { uniLoadMore, uniPopup } from '@dcloudio/uni-ui'

import formatQuoteMsg from '../../tools/formatQuoteMsg'

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
      nexttime: 0

    }
  },
  onLoad (options) {
    this.fid = options.fid
    this.name = options.name
    this.avatarUrl = JSON.parse(decodeURIComponent(options.avatarUrl))
    this.forumConfig()
    this.forumPosts()
  },
  methods: {

    // 格式化帖子数据，为了标红标题
    formatThreadTitle (res) {
      const regSubject = /(?<=class='datatitle'\s>)[\S\s]*(?=<\/span>)/
      for (let i of res.data) {
        if (regSubject.test(i.subject)) {
          i.subject = regSubject.exec(i.subject)[0]
          i.dataTitle = true
        }
      }
      return res
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
      forumApi.forumPosts(this.fid)
        .then(res => {
          this.posts = formatThreadTitle(res)
        })
    }
  },
  computed: {
    followForum () {
      return '已关注'
    }
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

        .followForum {
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
</style>