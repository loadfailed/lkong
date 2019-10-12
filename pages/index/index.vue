<template>
  <view class="content">
    <post-list-card />
  </view>
</template>

<script>
import PostListCard from '../../components/postListCard';
export default {
  data () {
    return {
      title: 'Hello'
    }
  },
  components: {
    PostListCard
  },
  onLoad () {


  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
/* .content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
} */
/* 
.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
} */
</style>
