<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>


<style lang="scss">
/*每个页面公共css */
@import "./static/iconfont.css";

page {
  background: #f6f6f6;
  font-size: 32rpx;
}
.content {
  padding: 0 0 100rpx;
}
</style>
