<template>
  <div class="content">

    <div class="header"
         v-if="!isMine">

      <div class="user">

        <image class="avatar"
               :mode="aspectFit"
               :src="avatarUrl">
        </image>

        <p class="name">{{post.username}}</p>

      </div>

    </div>

    <div v-else
         class="dec">
      <p>
        <span>{{date+' '}}</span>
        <span v-if="post.isthread&&!post.isquote">发表了</span>
        <span v-else>回复了</span>
        <span>帖子：</span>
      </p>
    </div>

    <div class="quote">

      <div class="header-line">

        <p class="user">
          <span class="icon-font icon-user user-icon"></span>
          <span>{{post.beQuoteUser?post.beQuoteUser:post.t_author}}</span>
        </p>

      </div>

      <p class="title">
        <span>{{post.subject}}</span>
      </p>

      <div class="context">{{post.beQuoteMsg}}</div>

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
    font-size: 24rpx;
    line-height: 64rpx;
    color: $uni-text-color-grey;
  }

  .quote {
    background: #f6fbff;
    padding: 20rpx;
    margin: 0 -20rpx;
    border-radius: 10rpx;
    font-size: 30rpx;
    line-height: 50rpx;

    .header-line {
      display: flex;
      justify-content: space-between;
      color: $uni-text-color-grey;
      padding: 10rpx 0;
      font-size: 26rpx;
      line-height: 40rpx;
      .user {
        .user-icon {
          font-family: "iconfont";
          padding: 0 6rpx;
          color: $uni-text-color-grey;
        }
      }
    }
    .title {
      color: #666;
    }
    .context {
      color: $uni-text-color-grey;
    }
  }
  .reply {
    padding: 30rpx 0 0;
    .context {
      font-size: 32rpx;
    }
  }
}
</style>