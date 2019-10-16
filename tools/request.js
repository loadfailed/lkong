// #ifdef APP-PLUS || H5
const baseURL = 'http://lkong.cn/index.php?'
// #endif

// #ifndef APP-PLUS || H5
const baseURL = 'http://111.231.114.121:5000/api'
// #endif



function request(url) {

  // #ifndef APP-PLUS || H5
  const dzsbhey = uni.getStorageSync('dzsbhey')
  const auth = uni.getStorageSync('auth')
  if (!dzsbhey && !auth) {
    uni.redirectTo({
      url: '../login/login?backpage=' + backpage + '&backtype=' + backtype
    })
  }
  const params = {
    url: '/users/forwarding',
    method: 'POST',
    data: {
      url,
      dzsbhey,
      auth
    }
  }
  // #endif

  // #ifdef APP-PLUS || H5
  const params = {
    url,
    method: 'POST',
    data: {}
  }
  // #endif


  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + params.url,
      method: params.method,
      data: {
        ...params.data
      },
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        reject(err)
      }
    })

  })
}

export default request