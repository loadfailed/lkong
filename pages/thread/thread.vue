<template>
  <scroll-view scroll-y="true"
               @scroll="test">
    <status-bar />
    <div class="title">
      <h1>{{config.subject}}</h1>
      <div class="digest">
        <p>
          <span>查看：</span>
          <span>{{config.views}}</span>
          <span style="padding:0 10rpx;color:#ddd;">|</span>
          <span>回复：</span>
          <span>{{config.replies}}</span>
        </p>
        <p>{{config.forumname}}</p>
      </div>
    </div>

    <ul>
      <li v-for="(item,index) in posts"
          :key="index"
          @click="onFloorToReplies(item.pid,item.author)">
        <div class="header">
          <div style="display:flex;">

            <image class="user-avatar"
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
        <div>

          <rich-text :nodes="item.message.pstatus"
                     style="color:#999;font-size:28rpx;font-style:italic;"></rich-text>

          <div class="quote"
               v-if="item.message.beQuoteUser">
            <div class="header-line">
              <div style="display:flex;align-items:center">
                <span class="icon-font icon-user user-icon"></span>
                <rich-text :nodes="item.message.beQuoteUser"></rich-text>
              </div>
              <rich-text :nodes="item.message.beQuoteDate"></rich-text>
            </div>
            <rich-text :nodes="item.message.beQuoteMsg"></rich-text>
          </div>

          <rich-text :nodes="item.message.message"
                     style="font-size:34rpx;letter-spacing: 2rpx;word-break: break-all;"></rich-text>
        </div>
      </li>
    </ul>

    <div style="margin:40rpx 0 40rpx;"
         v-if="config.replies>20">
      <uni-pagination :total="config.replies"
                      :pageSize="20"
                      @change="changePage" />
    </div>

    <mine-button @click="onMineButtonToReplies">回复主题</mine-button>
  </scroll-view>
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
      posts: []

    }
  },
  components: {
    uniLoadMore,
    uniPopup,
    uniPagination
  },
  onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
    console.log(option); //打印出上个页面传递的参数。
    this.tid = option.tid
    this.getThreadConfig()
    this.getThread()
  },

  methods: {
    test () {
      console.log('done');
    },
    onMineButtonToReplies () {
      let str = ''
      this.config.subject.length > 19 ? str = this.config.subject.substring(0, 18) + '…' : str = this.config.subject
      uni.navigateTo({
        url: `/pages/writeReplies/writeReplies?tid=${this.config.tid}&myrequestid=thread_${this.config.tid}&title=${str}`
      })
    },
    onFloorToReplies (pid, author) {
      uni.navigateTo({
        url: `/pages/writeReplies/writeReplies?tid=${this.config.tid}&myrequestid=post${pid}&replyid=${pid}&title=你正在回复 ${author}`
      })
    },
    // 获取帖子信息
    getThreadConfig () {
      threadApi.getThreadConfig(this.tid)
        .then(res => {
          for (let i in res) {
            this.$set(this.config, i, res[i])
          }
        })
    },
    // 获取回帖列表
    getThread () {
      threadApi.getThread(this.tid)
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
      threadApi.changePage(this.config.tid, obj.current)
        .then(res => {
          res.data.forEach(item => {
            item.message = formatMessage(item.message)
            item.avatarUrl = getAvatarUrl('avatar', item.authorid, 'small')
          })
          this.posts = res.data
        })
    }
  }
}

</script>

<style lang="scss" scoped>
.title {
  background: #fff;
  h1 {
    font-size: 38rpx;
    padding: 40rpx 20rpx 20rpx;
    color: #333;
  }
  .digest {
    color: #999;
    display: flex;
    font-size: 28rpx;
    padding: 0 20rpx 20rpx;
    justify-content: space-between;
  }
}
li {
  margin: 30rpx 0;
  padding: 40rpx 20rpx;
  background: #fff;
  border-radius: 10rpx;

  .header {
    padding: 10rpx 0 30rpx;
    border-bottom: 1rpx solid #eee;
    margin-bottom: 20rpx;
    display: flex;
    color: #999;
    justify-content: space-between;
    .user-avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      margin-right: 10rpx;
      background: $uni-color-primary;
    }
  }

  .quote {
    background: #e5f6fb;
    padding: 20rpx;
    border-radius: 10rpx;
    color: #666;
    font-size: 28rpx;
    .header-line {
      display: flex;
      justify-content: space-between;
      color: $uni-text-color-grey;
      padding: 10rpx;
      .user-icon {
        font-family: "iconfont";
        padding: 0 6rpx;
      }
    }
  }
}

.input {
  width: 700rpx;
  height: 400rpx;
  border-radius: 10rpx;
  padding: 20rpx;
  background: #fff;
}

.editor {
  background: #fff;
  padding: 40rpx;
}
</style>