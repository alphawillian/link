
export default function jsonpPro (url, queryObj = {}) {
  return new Promise((resolve, reject) => {
    let queryText = url.indexOf('?') > -1 ? '&' : '?'
    for (let key in queryObj) {
      queryText += `${key}=${queryObj[key]}&`
    }
    let cbname = 'fejp_' + (new Date()).valueOf() + parseInt(1000 * Math.random()) // 带hash防止缓存 注意真毫秒级 加随机数
    let srcText = `${url}${queryText}callback=${cbname}`

    let scriptEl = document.createElement('script')
    scriptEl.src = srcText

    let isout = false

    const timeId = window.setTimeout(function () {
      isout = true
      resolve({ msg: '请求超时' })
      document.body.removeChild(scriptEl)
    }, 10000)

    window[cbname] = function (res) {
      if (isout) {
        resolve({ msg: '请求超时' })
      } else {
        resolve(res)
        window.clearTimeout(timeId)
        document.body.removeChild(scriptEl)
      }
    }

    document.body.appendChild(scriptEl)
  })
}
