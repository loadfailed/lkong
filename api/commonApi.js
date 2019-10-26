import request from '../tools/request'
const commonApi = {
  // 获取关注位面列表，由于能力问题，就暴力匹配了首页lkong.cn的div，在龙空main.js中找到关于这个有var F = $("#setfollows").text()后进行处理u.prototype.setfollow
  async followForum() {
    const html = await request(`http://lkong.cn/`)
    const regFollow = /{"uid":\[[\S\s]*\]}/
    return JSON.parse(regFollow.exec(html)[0])
  }
}
export default commonApi