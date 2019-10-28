// http://lkong.cn/index.php?mod=ajax&action=forumlist&_=1572012368516

import request from '../tools/request'
const forumApi = {
  // 获取版块列表
  forumList() {
    return request(`mod=ajax&action=forumlist&_=${new Date().getTime()}`)
  },
  // 获取版面信息
  forumConfig(fid) {
    return request(`mod=ajax&action=forumconfig_${fid}&_=${new Date().getTime()}`)
  },
  // 获取版面的发帖列表
  forumPosts(fid) {
    return request(`mod=data&sars=forum/${fid}&_=${new Date().getTime()}`)
  },
  // 获取更多版面发帖列表
  moreForumPosts(fid, nexttime) {
    // http://lkong.cn/forum/index.php?mod=data&sars=forum/33&nexttime=1572274412&_=1572274436848
    return request(`mod=data&sars=forum/${fid}&nexttime=${nexttime}&_=${new Date().getTime()}`)
  }
}
export default forumApi