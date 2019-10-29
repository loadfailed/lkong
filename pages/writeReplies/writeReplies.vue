<template>
  <div>
    <status-bar />
    <header>
      <span>“</span>
      <span>{{data.title}}</span>
      <span>”</span>
    </header>
    <new-editor @input="onInput" />
    <mine-button @click="commitReply">发表</mine-button>
  </div>
</template>

<script>
import threadApi from '@/api/threadApi'
export default {
  data () {
    return {
      data: {
        title: '',
        type: 'reply',
        content: ''
      }
    }
  },
  components: {
  },
  onLoad (option) { //option为object类型，会序列化上个页面传递的参数
    console.log(option); //打印出上个页面传递的参数。
    for (let key in option) {
      this.$set(this.data, key, option[key])
    }
  },
  methods: {
    onClick () {

    },
    onInput (val) {
      this.data.content = val
    },
    commitReply () {
      threadApi.sendPost(this.data)
        .then(res => {
          if (res.success) {
            uni.showToast({
              icon: 'none',
              title: '发表成功',
            })
            setTimeout(() => {
              uni.navigateBack()
            }, 750);
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  padding: 30rpx;
  font-size: 32rpx;
  color: #999;
  background: #fff;
  margin-bottom: 20rpx;
  font-style: italic;
}
</style>