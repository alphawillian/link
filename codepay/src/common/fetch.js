/**
 * 封装promise请求对象
 */
import Jsonp from 'jsonp'
import qs from 'qs'

export default function fetch (url = '', data = {}) {
  return new Promise((resolve, reject) => {
    let baseUrl = url
    let completeData = qs.stringify(data)
    let ran = new Date().getTime()
    Jsonp(baseUrl + '?v=' + ran + '&' + completeData, (err, data) => {
      if (err) {
        return reject(err)
      }
      if (data) {
        if (data.code === '010000') {
          window.location.href =
          '//plogin.m.jd.com/user/login.action?appid=579&returnurl=' +
          encodeURIComponent(window.location.href)
          return false
        }
        return resolve(data)
      }
    })
  })
}
