function getAvatarUrl(type, uid, size) {
  let avatarCode = [...(1000000000 + uid * 1).toString()]
  for (let i = 4; i < 11; i += 3) {
    avatarCode.splice(i, 0, '/')
  }
  avatarCode = avatarCode.join('').substring(1)

  const avatarUrl = `http://img.lkong.cn/${type}/${avatarCode}_avatar_${size}.jpg`
  return avatarUrl
}

export default getAvatarUrl