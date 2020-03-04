/**
 * 获得当前地址栏传递参数
 * @returns {null}
 */
export function getParams (name) {
  let match = RegExp('[?&]' + name + '=([^&|#?]*)').exec(window.location.href)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

/**
 * 获得当前地址栏全部参数字符串
 * @returns {null}
 */
export function getAllUrlParams (arg) {
  let url = arg || window.location.href;
  let params = url.indexOf('#') > -1 ? url.substring(url.indexOf('?'), url.indexOf('#')) : url.substring(url.indexOf('?'))
  return params;
}
// 格式化日期
export function formatDate (format, time) {
  var t = time !== undefined ? new Date(time) : new Date()
  var tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function (a) {
    switch (a) {
      case 'YYYY':
        return tf(t.getFullYear())
      case 'MM':
        return tf(t.getMonth() + 1)
      case 'mm':
        return tf(t.getMinutes())
      case 'DD':
        return tf(t.getDate())
      case 'hh':
        return tf(t.getHours())
      case 'ss':
        return tf(t.getSeconds())
    }
  })
}
// 获取定位信息
export function getLngLat () {
  let timeout = 5000
  let complate = false
  let u = window.navigator.userAgent
  let isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  let isJDJR = /jdjr-app/i.test(u.toLowerCase())
  return new Promise(function (resolve, reject) {
    let timer = window.setTimeout(function () {
      if (!complate) {
        complate = true
        resolve(null)
      }
    }, timeout)
    console.log(timer)
    console.time('getGeoH5')
    window.navigator.geolocation.getCurrentPosition(
      function (pos) {
        if (!complate) {
          complate = true
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          })
          console.log('H5获取地理位置成功')
          console.timeEnd('getGeoH5')
        }
      },
      function (err) {
        if (!complate) {
          if (!isJDJR) {
            console.log(err)
            resolve(null)
          }
          console.log('H5未获取到地理位置')
          console.timeEnd('getGeoH5')
        }
      }, {
        enableHighAccuracy: true,
        timeout: 4000,
        maximumAge: 0
      }
    )
    // 金融定位
    if (isJDJR) {
      console.time('timerJr')
      if (!isIos) {
        window.jdjrBridge = window.jsBridgeV3.onReady()
      }
      window.jdjrBridge.then(function (result) { // eslint-disable-line
        console.log('result:', result)
        result.jsToGetResp(function (d) {
          d = (typeof d === 'object') ? d : JSON.parse(d)
          console.log(d)
          if (!complate) {
            complate = true
            resolve({
              lat: d.location.latitude,
              lng: d.location.longitude
            })
            console.log('JR获取位置成功')
            console.timeEnd('timerJr')
          }
        }, {
          type: 9,
          isLocation: true,
          data: ''
        })
      })
    }
  })
}
// 发送埋点数据
export function sendPointFn (pageId, moduleId, clickId) {
  const pageBiz = 'JR,FE,TRAFFIC'
  pageId = pageId || 'default'
  moduleId = moduleId || 'default'
  clickId = clickId || 'default'
  // eslint-disable-next-line
  JPTrack.emit(pageBiz, [pageId, moduleId, clickId])
}