<template>
  <view class="status_bar">
    <view class="top_view"></view>
  </view>
</template>

<script>
export default {
  name: 'statuBar'
}
</script>

<style lang="scss" scoped>
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
  background-color: $uni-color-primary;
}
.top_view {
  height: var(--status-bar-height);
  width: 100%;
  position: fixed;
  background-color: $uni-color-primary;
  top: 0;
  z-index: 999;
}
</style>