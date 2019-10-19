<template>
  <div>
    <status-bar />

  </div>
</template>

<script>

import threadApi from '@/api/threadApi'
export default {
  name: 'thread',
  data () {
    return {
      tid: 0
    }
  },
  onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
    console.log(option); //打印出上个页面传递的参数。
    this.tid = option.tid
    this.getThread()
  },

  methods: {
    getThreadConfig () {
      threadApi.getThreadConfig(this.tid)
        .then(res => {
        })
    },
    getThread () {
      threadApi.getThread(this.tid)
        .then(res => {
        })
    }
  }
}

</script>