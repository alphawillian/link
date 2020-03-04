import axios from 'axios'
import qs from 'qs'

export default function fetch (url = '', data = {}, method = 'get') {
  method = method.toLowerCase()

  let ops = { params: data }
  if (method === 'post') {
    ops = { data: data }
    // axios默认content-type是application/json 若要改成application/x-www-form-urlencoded 就放开
    ops = { data: qs.stringify(data) }
  }
  let options = {
    url,
    ...ops,
    method
  }

  // 返回一个promise对象
  return new Promise((resolve, reject) => {
    const instance = axios.create({ // 创建一个axios实例
      timeout: 10000, // 设置请求超时设置
      withCredentials: true
    })

    instance(options) // 请求处理
      .then(({ data }) => {
        if (data.code === 'F_99999') {
          window.location.href =
            '//plogin.m.jd.com/user/login.action?appid=579&returnurl=' +
            encodeURIComponent(window.location.href)
          return false
        }
        resolve(data) // 不论返回的success是true还是false，都进resolve，后续逻辑前端处理
      })
      .catch((error) => {
        console.log('fetch请求数据失败！', error)
        resolve(data) // 不论返回的success是true还是false，都进resolve，后续逻辑前端处理
      })
  })
}
