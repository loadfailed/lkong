// #ifdef APP-PLUS || H5
const baseURL = 'http://lkong.cn/index.php?'
// #endif

// #ifndef APP-PLUS || H5
const baseURL = 'http://111.231.114.121:5000/api'
// #endif



function request(url, data, method = 'GET') {

  // #ifndef APP-PLUS || H5
  const dzsbhey = uni.getStorageSync('dzsbhey')
  const auth = uni.getStorageSync('auth')
  if (!dzsbhey && !auth) {
    uni.redirectTo({
      url: '../login/login?backpage=/pages/index/index&backtype=2'
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
    method,
    data
  }
  // #endif
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + params.url,
      method: params.method,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        ...params.data
      },
      success: res => {
        console.log(res.data);
        resolve(res.data)
      },
      fail: err => {
        reject(err)
      }
    })

  })
}

export default request