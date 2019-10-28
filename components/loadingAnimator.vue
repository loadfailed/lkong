<template>
  <div class="loading">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.loading {
  margin: 40rpx 0;
  display: flex;
  justify-content: center;
  .box {
    width: 12rpx;
    height: 12rpx;
    border-radius: 50%;
    background: $uni-color-primary;
    margin: 0 12rpx;
    animation: box linear 1s infinite;
    -webkit-animation: box linear 1s infinite;
  }
  .box:nth-child(1) {
    animation-delay: 0s;
  }
  .box:nth-child(2) {
    animation-delay: 0.15s;
  }
  .box:nth-child(3) {
    animation-delay: 0.3s;
  }
  .box:nth-child(4) {
    animation-delay: 0.45s;
  }
  .box:nth-child(5) {
    animation-delay: 0.6s;
  }
  @keyframes box {
    0%,
    60%,
    100% {
      transform: scale(1);
    }
    30% {
      transform: scale(2.5);
    }
  }
  @-webkit-keyframes box {
    0%,
    60%,
    100% {
      transform: scale(1);
    }
    30% {
      transform: scale(2.5);
    }
  }
}
</style>