<template>
  <div class="content"
       @click="navigateTo">

    <!-- <div class="dec">
      <p>
        <span>{{date+' '}}</span>
        <span :style="{color:'#FA866F'}">{{post.isthread&&!post.isquote?'回复':'发表'}}</span>
        <span>了帖子：</span>
      </p>
    </div> -->

    <div class="quote">

      <div class="header-line">

        <p class="thread-title">
          <span class="icon-font icon-form form-icon"></span>
          <span>{{post.subject}}</span>
        </p>

        <p class="user"
           v-if="post.beQuoteUser">
          <span class="icon-font icon-user user-icon"></span>
          <span>{{post.beQuoteUser}}</span>
        </p>

      </div>

      <div class="context"
           v-if="post.beQuoteMsg">{{post.beQuoteMsg}}</div>

    </div>

    <div class="reply">
      <rich-text :nodes="post.message"
                 class="context"></rich-text>

      <div class="dec"
           v-if="isMine">{{date}}</div>

      <div v-else
           class="dec"
           :style="{display:'flex',justifyContent:'space-between'}">

        <div :style="{display:'flex',alignItems:'center'}">
          <image class="mine-avatar"
                 :mode="aspectFit"
                 :src="avatarUrl"></image>
          <p :style="{lineHeight:'48rpx',paddingLeft:'10rpx'}">{{post.username}}</p>
        </div>

        <p>{{date}}</p>

      </div>
    </div>

  </div>

</template>

<script>
import formaDate from '../tools/formaDate'
import getUserAvatar from '../tools/getUserAvatar';

export default {
  data () {
    return {
      avatarUrl: '',
      date: '未知',
      avatarUrl: ''
    }
  },
  props: {
    post: Object,
    isMine: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  mounted () {
    if (this.post) {
      this.date = formaDate(this.post.sortkey)
      this.avatarUrl = getUserAvatar(this.post.uid, 'small')
    }
  },
  methods: {
    navigateTo () {
      let tid = 0
      if (this.post.tid) tid = this.post.tid
      else tid = this.post.id.substring(7);
      uni.navigateTo({
        url: `/pages/thread/thread?tid=${tid}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  font-size: 30rpx;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 0 0 30rpx;
    color: $uni-text-color;
    line-height: 64rpx;
    font-size: 32rpx;
    .user {
      display: flex;

      .avatar {
        width: 64rpx;
        height: 64rpx;
        border-radius: 50%;
        background: $uni-color-primary;
      }
      .name {
        font-weight: bold;
        margin-left: 20rpx;
      }
    }
  }

  .quote {
    background: #e5f6fb;
    padding: 20rpx;
    margin: 0 -20rpx;
    border-radius: 10rpx;
    line-height: 50rpx;

    .header-line {
      color: $uni-text-color-grey;
      line-height: 40rpx;
      .user {
        padding-top: 20rpx;
        margin-top: 20rpx;
        @include thinBorder((top), #cbe7f0);
        .user-icon {
          font-family: "iconfont";
          padding: 0 6rpx;
        }
      }
    }

    .context {
      margin-top: 5rpx;
      color: #666;
    }

    .thread-title {
      color: #333;
      font-size: 34rpx;
      line-height: 60rpx;
      font-weight: bold;
      .form-icon {
        font-family: "iconfont";
        color: rgb(226, 114, 63);
        padding: 0 20rpx;
      }
    }
  }

  .reply {
    padding: 30rpx 0 0;
    .context {
      font-size: 34rpx;
      letter-spacing: 2rpx;
    }

    .dec {
      font-size: 30rpx;
      margin-top: 20rpx;
      color: $uni-text-color-grey;

      .mine-avatar {
        height: 64rpx;
        width: 64rpx;
        border-radius: 50%;
        background: rgb(226, 114, 63);
      }
    }
  }
}

.context {
  word-break: break-all;
}
</style>