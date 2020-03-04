/**
 * 封装promise请求对象
 */
import Jsonp from 'jsonp'
import qs from 'qs'

export default function fetch(url = '', data = {}) {
  return new Promise((resolve, reject) => {
    let baseUrl = url
    data = Object.assign(data, {})
    let completeData = qs.stringify(data)
    let ran = new Date().getTime()
    let timeout = 10000
    Jsonp(baseUrl + '?v=' + ran + '&' + completeData, ({ timeout: timeout }), (err, data) => {
      // Jsonp(baseUrl + '?' + completeData + '&v=' + ran, ({ timeout: timeout }), (err, data) => {
      if (err) {
        return reject(err)
      }
      if (data) {
        if (data.code === 'F_99999') {
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