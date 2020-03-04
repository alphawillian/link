/**
 * 封装promise请求对象
 */
import axios from 'axios'
import qs from 'qs'
import { BASE_URL_PAYHOME } from '../api'

export default function fetch (url = '', data = {}, method = 'get') {
  method = method.toLowerCase()
  let ops = {}
  if (method === 'post') {
    ops = { data: qs.stringify(data) }
    if (url.indexOf('/omm/ml.htm')) {
      ops = { data: data }
    }
  }

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
      baseURL: BASE_URL_PAYHOME,
      // 设置请求超时设置
      timeout: 30000,
      // 允许携带cookie
      withCredentials: true,
      crossDomain: true
      // headers: {
      //   'Content-Type': 'application/json;charset=UTF-8',
      //   'X-Requested-With': 'XMLHttpRequest'
      // }
    })
    // 请求处理
    instance(options)
      .then(({ data }) => {
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