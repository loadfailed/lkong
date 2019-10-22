<template>
  <div class="replies-btn"
       @click="onClick">
    <div class="icon-font icon-edit-square square-icon"></div>
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.replies-btn {
  background: #fff;
  margin: 0rpx;
  height: 100rpx;
  color: #333;
  font-size: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  @include thinBorder((top), #ddd);

  .square-icon {
    font-family: "iconfont";
    font-size: 40rpx;
    color: #999;
    padding: 0 10rpx;
  }
}
</style>