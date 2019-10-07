<template>
  <view>
    我的...
  </view>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  onLoad () {
    loginRes = this.checkLogin('../mine/mine.vue', 2)
    if (!loginRes) return
  },
  methods: {

  }
}
</script>

<style>
</style>
