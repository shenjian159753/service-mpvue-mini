const Fly = require('flyio/dist/npm/wx')
const service = new Fly()

service.config.timeout = 60000
service.config.baseURL = 'https://chengzhx76.picp.vip/mock/mp/'

service.interceptors.request.use(
  config => {
    config.headers['X-Token'] = 'xxx'
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    wx.stopPullDownRefresh()
    wx.hideNavigationBarLoading()
    return response.data
  },
  error => {
    wx.stopPullDownRefresh()
    wx.hideNavigationBarLoading()
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export function getRequest (url, param) {
  return service.get(url, param || {})
}

export default service