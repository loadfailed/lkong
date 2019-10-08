<template>
  <view>
    写作...
  </view>
</template>

<script>
var loginRes
export default {
  data () {
    return {

    }
  },
  onLoad () {
    loginRes = this.checkLogin('/pages/write/write', 2)
    if (!loginRes) return
  },
  methods: {

  }
}
</script>

<style>
</style>
