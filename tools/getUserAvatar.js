function getUserAvatar(uid, type) {
  let avatarUrl = [...uid.toString()]
  avatarUrl.splice(-2, 0, '/')
  avatarUrl.splice(-5, 0, '/')
  avatarUrl.splice(-8, 0, '/')
  if (avatarUrl.length === 9) {
    for (let i = 0; i < 3; i++) {
      avatarUrl.unshift('0')
    }
  } else {
    for (let i = 0; i < 2; i++) {
      avatarUrl.unshift('0')
    }
  }
  avatarUrl = `http://img.lkong.cn/avatar/${avatarUrl.join('')}_avatar_${type}.jpg`
  return avatarUrl
}

export default getUserAvatar