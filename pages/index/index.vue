<template>
  <div class="content">
    <ul>
      <li v-for="(post,index) in posts"
          :key="index">
        <post-list-card :post='post'
                        :isMine="false" />
      </li>
    </ul>
  </div>
</template>

<script>
import PostListCard from '../../components/postListCard'
import indexApi from '../../api/indexApi'

export default {
  data () {
    return {
      posts: {},
      curtime: 0,
      nexttime: 0
    }
  },
  components: {
    PostListCard
  },
  onLoad () {
    indexApi.getIndexPosts()
      .then(res => {
        this.posts = res.data
        console.log('首页请求结果', res);
      })
  },
  methods: {


  }
}
</script>

<style lang="scss" scoped>
</style>
