<template>
  <div>
    <status-bar />

    <div class="title">{{`- - 论坛版块 - -`}}</div>

    <ul class="forumlist">
      <li v-for="(item ,index) in forumlist"
          :key="index"
          :class="{isFollow:item.isFollow}">
        <image class="forum-avatar"
               :mode="aspectFit"
               :src="item.avatarUrl"></image>
        <span>{{item.name}}</span>
      </li>
    </ul>

    <div class="title">{{`- - 私人位面 - -`}}</div>

    <ul class="forumlist"
        v-if="sysweimian.length">

      <li v-for="(item ,index) in sysweimian"
          :key="index"
          :class="{isFollow:item.isFollow}">
        <image class="forum-avatar"
               :mode="aspectFit"
               :src="item.avatarUrl"></image>
        <span>{{item.name}}</span>
      </li>
    </ul>
    <ul class="sysweimian">
      <li v-for="(item ,index) in sysweimian"
          :key="index"></li>
    </ul>
  </div>
</template>

<script>
import forumApi from '@/api/forumApi'
import getAvatarUrl from '@/tools/getAvatarUrl';
export default {
  data () {
    return {
      forumlist: [],
      sysweimian: [],
      followList: []
    }
  },
  onLoad () {
    this.checkLogin('/pages/forum/forum', 2)
    this.getforumList()
  },
  methods: {
    // 获取版面列表
    getforumList () {
      forumApi.forumList()
        .then(res => {

          // 设置版面头像
          for (let i of res.forumlist) {
            i.avatarUrl = getAvatarUrl('forumavatar', i.fid, 'small')
            i.isFollow = false
          }

          // 设置位面头像
          for (let i of res.sysweimian) {
            i.avatarUrl = getAvatarUrl('forumavatar', i.fid, 'small')
            i.isFollow = false
          }
          this.forumlist = res.forumlist
          this.sysweimian = res.sysweimian
          this.getFollowForum()
        })
    },
    getFollowForum () {
      forumApi.followForum()
        .then(res => {
          // 检查是否被关注
          for (let i of this.forumlist) {
            i.isFollow = res.fid.includes(i.fid + '')
          }
          for (let i of this.sysweimian) {
            i.isFollow = res.fid.includes(i.fid + '')
          }
          uni.setStorageSync('fid', res.fid)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  width: 100%;
  height: 80rpx;
  font-size: 32rpx;
  line-height: 80rpx;
  text-align: center;
  color: $uni-text-color-grey;
  margin: 20rpx auto 0;
}

.forumlist {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #fff;
  padding: 40rpx;
  li {
    width: 45%;
    margin-bottom: 40rpx;
    background: #eef0ed;
    border-radius: 100rpx;
    color: #666;
    padding: 16rpx;
    display: flex;
    align-items: center;
    span {
      width: 70%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .forum-avatar {
      height: 64rpx;
      width: 64rpx;
      border-radius: 50%;
      background: $uni-color-primary;
      margin-right: 12rpx;
    }
  }
  .isFollow {
    color: #333;
    background: #d8edfd;
  }
}
</style>