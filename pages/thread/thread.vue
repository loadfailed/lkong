<template>
  <div>
    <scroll-view scroll-y="true"
                 class="scroll"
                 scroll-with-animation="true"
                 :scroll-top="scrollTop"
                 @scroll="test">

      <div class="title"
           v-show="page===1">
        <h1>{{config.subject}}</h1>
        <div class="digest">
          <p>
            <span>查看：</span>
            <span>{{config.views}}</span>
            <span style="padding:0 12rpx;color:#ddd;">|</span>
            <span>回复：</span>
            <span>{{config.replies}}</span>
          </p>
          <p style="padding:20rpx;margin:-20rpx"
             @click="navigateToForum">{{config.forumname}}</p>
        </div>
      </div>

      <ul>
        <li v-for="(item,index) in posts"
            :key="index"
            :id="`lou_${item.lou}`">
          <div class="header">
            <div style="display:flex;align-items:center">

              <image class="user__avatar"
                     :mode="aspectFit"
                     :src="`${item.avatarUrl}`">
              </image>
              <div>
                <p style="color:#333;">{{item.author}}</p>
                <p style="font-size:26rpx;">{{item.dateline}}</p>
              </div>
            </div>

            <p>
              <span>{{item.lou}}</span>
              <span>楼</span>
            </p>
          </div>

          <div @click="onFloorToReplies(item.pid,item.author)">

            <p style="color:#999;font-size:28rpx;font-style:italic;margin-bottom:12rpx;text-align:center">{{item.message.pstatus}}</p>

            <div class="quote"
                 v-if="item.message.beQuoteUser">
              <div class="header__line">
                <div style="display:flex;align-items:center">
                  <span class="icon-font icon-user user__icon"></span>
                  <p>{{item.message.beQuoteUser}}</p>
                </div>
                <p>{{item.message.beQuoteDate}}</p>
              </div>
              <rich-text :nodes="item.message.beQuoteMsg"
                         style="font-size:30rpx"></rich-text>
            </div>

            <div style="margin-top:20rpx;">
              <rich-text :nodes="item.message.message"
                         style="font-size:34rpx;letter-spacing: 2rpx;word-break: break-all;"></rich-text>
            </div>
          </div>

        </li>
      </ul>

      <div style="margin:40rpx 0 40rpx;"
           v-if="config.replies>20">
        <uni-pagination :total="config.replies"
                        :current="page"
                        :pageSize="20"
                        @change="changePage" />
      </div>
      <mine-button @click="onMineButtonToReplies">回复主题</mine-button>
    </scroll-view>
  </div>
</template>

<script>

import threadApi from '@/api/threadApi'
import getAvatarUrl from '@/tools/getAvatarUrl'
import formatMessage from '@/tools/formatMessage'
import { uniLoadMore, uniPopup, uniPagination } from '@dcloudio/uni-ui'
export default {
  name: 'thread',
  data () {
    return {
      tid: 0,
      config: {},
      posts: [],
      page: 1,

      scrollTop: 0,
      oldScrollTop: 0
    }
  },
  components: {
    uniLoadMore,
    uniPopup,
    uniPagination
  },
  onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
    this.tid = option.tid
    this.threadConfig()
    this.threads()
  },
  async onShow () {
    // 回帖之后跳转到最后一页对应位置
    // if (this.config.subject) this.page = Math.ceil((this.config.replies + 1) / 20)
    // await this.changePage(null)
    // this.lou = `lou_${this.posts[this.posts.length].lou}`
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.threadConfig()
    this.changePage()
    uni.stopPullDownRefresh()
  },

  methods: {
    test (e) {
      this.oldScrollTop = e.detail.scrollTop
    },
    // 回复楼层
    onMineButtonToReplies () {
      let str = ''
      this.config.subject.length > 19 ? str = this.config.subject.substring(0, 18) + '…' : str = this.config.subject
      uni.navigateTo({
        url: `/pages/writeReplies/writeReplies?tid=${this.config.tid}&myrequestid=thread_${this.config.tid}&title=${str}`
      })
    },
    // 回复主题
    onFloorToReplies (pid, author) {
      uni.navigateTo({
        url: `/pages/writeReplies/writeReplies?tid=${this.config.tid}&myrequestid=post${pid}&replyid=${pid}&title=你正在回复 ${author}`
      })
    },
    // 获取帖子信息
    threadConfig () {
      threadApi.threadConfig(this.tid)
        .then(res => {
          for (let i in res) {
            this.$set(this.config, i, res[i])
          }
        })
    },
    // 获取第一页的回帖列表，可以不用这个函数，用翻页中页面数传个1即可
    threads () {
      threadApi.threads(this.tid)
        .then(res => {
          res.data.forEach(item => {
            item.message = formatMessage(item.message)
            item.avatarUrl = getAvatarUrl('avatar', item.authorid, 'small')
          })
          this.posts = res.data
        })
    },
    // 翻页
    changePage (obj) {
      this.scrollTop = this.oldScrollTop
      if (obj) this.page = obj.current
      threadApi.changePage(this.config.tid, this.page)
        .then(res => {
          this.scrollTop = 0
          res.data.forEach(item => {
            item.message = formatMessage(item.message)
            item.avatarUrl = getAvatarUrl('avatar', item.authorid, 'small')
          })
          this.posts = res.data
        })
    },
    //跳转到版面
    navigateToForum () {
      const avatarUrl = getAvatarUrl('forumavatar', this.config.fid, 'small')
      uni.navigateTo({
        url: `/pages/forum/forum?fid=${this.config.fid}&name=${this.config.forumname}&avatarUrl=${encodeURIComponent(JSON.stringify(avatarUrl))}`
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.scroll {
  padding-top: var(--status-bar-height);
  height: 100vh;
}

.title {
  color: $uni-text-color;
  @include main-layout;
  background: $uni-bg-color;
  h1 {
    font-size: 38rpx;
  }
  .digest {
    color: #999;
    display: flex;
    font-size: 28rpx;
    margin-top: 20rpx;
    justify-content: space-between;
  }
}
li {
  @include main-layout;
  .header {
    padding-bottom: 20rpx;
    @include thinBorder("bottom", $uni-bg-color-grey);
    margin-bottom: 20rpx;
    display: flex;
    color: #999;
    justify-content: space-between;
    align-items: center;
    .user__avatar {
      @include avatar;
      width: 60rpx;
      height: 60rpx;
    }
  }

  .quote {
    background: $uni-bg-color;
    padding: 20rpx;
    border-radius: 12rpx;
    color: #666;
    font-size: 28rpx;
    .header__line {
      display: flex;
      justify-content: space-between;
      color: $uni-text-color-grey;
      padding-bottom: 12rpx;
      margin-bottom: 12rpx;
      @include thinBorder((bottom), #cbe7f0);
      .user__icon {
        font-family: "iconfont";
        padding: 0 6rpx;
      }
    }
  }
}

.input {
  width: 700rpx;
  height: 400rpx;
  border-radius: 12rpx;
  padding: 20rpx;
  background: #fff;
}

.editor {
  background: #fff;
  padding: 40rpx;
}
</style>