<template>

  <div class="content">

    <div class="dec">
      <p>
        <span>{{date+' '}}</span>
        <span v-if="post.isthread&&!post.isquote">发表了</span>
        <span v-else>回复了</span>
        <span>帖子：</span>
      </p>
    </div>

    <div class="quote">

      <div class="header-line">

        <p class="thread-title">
          <span>{{post.subject}}</span>
        </p>

        <p class="user"
           v-if="post.t_authorid">
          <span class="icon-font icon-user user-icon"></span>
          <span>{{post.beQuoteUser?post.beQuoteUser:post.t_author}}</span>

        </p>

      </div>

      <div class="context"
           v-if="post.beQuoteMsg">{{post.beQuoteMsg}}</div>

    </div>

    <div class="reply">

      <div class="class"></div>

      <div class="context">{{post.message}}</div>
    </div>

  </div>

</template>

<script>
import formaDate from '../tools/formaDate'

export default {
  data () {
    return {
      avatarUrl: '',
      date: '未知'
    }
  },
  props: {
    post: Object,
    isMine: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    // console.log(this.post);
    if (this.post) {
      this.date = formaDate(this.post.sortkey)
    }
  },
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

  .dec {
    font-size: 26rpx;
    line-height: 64rpx;
    color: $uni-text-color-grey;
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
      color: #333;
    }
  }
  .reply {
    padding: 30rpx 0 0;
    .context {
      font-size: 36rpx;
      letter-spacing: 2rpx;
    }
  }
  .thread-title {
    color: #333;
    font-weight: bold;
  }
}
</style>