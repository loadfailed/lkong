<template>
  <div>

    <div class="quote">

      <div class="header-line">

        <p class="thread-title">
          <span class="icon-font icon-form form-icon"></span>
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

  </div>

</template>

<style lang="scss" scoped>
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

  .thread-title {
    color: #333;
    font-weight: bold;
    .form-icon {
      font-family: "iconfont";
      padding: 0 10rpx;
    }
  }
}
</style>