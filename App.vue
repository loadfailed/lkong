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
@import "./static/editor.css";

page {
  background: #f6f6f6;
  font-size: 32rpx;
}
:not(not) {
  box-sizing: border-box;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
}
</style>
