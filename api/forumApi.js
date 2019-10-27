// http://lkong.cn/index.php?mod=ajax&action=forumlist&_=1572012368516

import request from '../tools/request'
const forumApi = {
  // 获取版块列表
  forumList() {
    return request(`mod=ajax&action=forumlist&_=${new Date().getTime()}`)
  },

}
export default forumApi