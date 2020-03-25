/**
 * 封装promise请求对象
 */
import axios from 'axios'
// import { BASE_URL_TEST } from '../api'
// import qs from 'qs'

export default function fetch1 (baseUrl, url = '', data = {}, method = 'get') {
  method = method.toLowerCase()
  let ops = { data: data }

  // console.log(url)

  // 公共参数存储(待添加...)
  let options = {
    url,
    ...ops,
    method
  }

  return new Promise((resolve, reject) => {
    // 创建一个axios实例
    const instance = axios.create({
      // 设置默认根地址
      baseURL: baseUrl,
      // 设置请求超时设置
      timeout: 30000,
      // 允许携带cookie
      withCredentials: true,
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    // 请求处理
    instance(options)
      .then(({ data }) => {
        // 未登录
        let isLogin = true
        if (data && data.resultCode === '1' && data.resultStatus === '010000') {
          isLogin = false
        }
        if (!isLogin) {
          let returnurl = window.location.href
          let loginUrl = '//plogin.m.jd.com/user/login.action?appid=100&returnurl='
          window.location.href = loginUrl + encodeURIComponent(returnurl)
          return false
        }
        return resolve(data)
      })
      .catch(error => {
        // 请求失败时,根据业务判断状态
        if (error.response) {
          // let resError = error.response
          let resCode = error.status
          let resMsg = error.message
          let err = { code: resCode, respMsg: resMsg }
          // console.log('请求数据失败！')
          return reject(err)
        } else {
          // console.log('数据请求超时')
          let err = { type: 'canceled', respMsg: '数据请求超时' }
          return reject(err)
        }
      })
  })
}