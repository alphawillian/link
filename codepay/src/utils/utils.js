/* eslint-disable */
export const utils = {
  pageLock: function () {
    document.addEventListener("touchmove", utils.pageLockHandler, false)
  },
  pageUnlock: function () {
    document.removeEventListener("touchmove", utils.pageLockHandler, false)
  },
  pageLockHandler: function (e) {
    e.preventDefault();
  }
};


/*
金额格式化
    */
export function formatCurrency (s) {
  if (!/^(-?\d+)(\.\d*)?$/.test(s)) {
    return 'invalid value';
  }

  let sign = '';
  s = Number(s);
  if (s < 0) {
    sign = '-';
  } else {
    sign = '';
  }
  s = Math.abs(s);
  if (/^\d+$/.test(s)) {
    return (sign + (s + '').replace(/\B(?=(\d{3})+$)/g, ',') + '.00');
  }
  if (/^(\d+)\.(\d+)$/.test(s)) {
    s = s + '0';
    var v = s.split('.');
    var f = (v[0] + '').replace(/\B(?=(\d{3})+$)/g, ',');
    var h = v[1].substring(0, 2);
    return (sign + f + '.' + h);
  }
}

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
export function getAllUrlParams (url) {
  var url = url ? url : window.location.href;
  var params = url.indexOf("#") > -1 ? url.substring(url.indexOf("?"), url.indexOf("#")) : url.substring(url.indexOf("?"))
  return params;
}


/*
 操作 sessionstorage
 */
export function setStorage (name, obj) {
  let str = JSON.stringify(obj)
  sessionStorage[name] = str
}

export function getStorage (name) {
  if (sessionStorage[name]) {
    return JSON.parse(sessionStorage[name])
  } else {
    return false
  }
}


/*
 表单验证正则
 */
export function validator (type, value) {

  let validRules = {
    name: {
      reg: /^[\u4e00-\u9fa5a-zA-Z\·]+$/,
      str: "姓名不可以输入数字和特殊字符"
    },
    number: {
      reg: /^[0-9]+$/,
      str: "必须为数字"
    },
    number_letter: {
      reg: /^[0-9a-zA-Z\_]+$/,
      str: "只允许输入英文字母、数字、_"
    },
    email: {
      reg: /^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
      str: "Email格式不正确"
    },
    chinese: {
      reg: /[\u4E00-\u9FA5\uf900-\ufa2d]/gi,
      str: "必须含有中文"
    },
    url: {
      reg: /^[a-zA-z]+:\/\/[^s]*/,
      str: "URL格式不正确"
    },
    phone: {
      reg: /^\d{7,8}$/,
      str: "电话号码格式不正确"
    },
    mobile: {
      reg: /^1[34578]\d{9}$/,
      str: "手机号格式不正确"
    },
    qq: {
      reg: /[1-9][0-9]{4,}/,
      str: "QQ账号不正确"
    },
    idcard: {
      reg: /^(\d{6})(18|19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X|x)?$/, ///(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      str: "身份证号码不正确"
    },
    licenseCode: {
      reg: /^[0-9a-zA-Z]{15,30}$/,///^(\d{15})?$/,
      str: "营业执照代码不正确"
    }
  }

  if (validRules[type]) {
    var val = validRules[type]["reg"];
    if (!val.test(value)) {
      return validRules[type]["str"]
    }
    return true
  } else {
    return "找不到该表单验证正则项"
  }
}


/**
 * 仅限数字 并且首位不为0
 * @return number
 */
export function onlyPositiveNumber (input) {
  var val = input.val();
  var _val = ""

  if ('' != val.replace(/^[1-9]\d*$/, '')) {
    var matchVal = val.match(/\d{1,}\.{0,1}\d{0,2}/)
    if (matchVal == null || matchVal == 0) {
      _val = ""
    } else {
      _val = matchVal;
    }

    input.val(_val)
  }
}

/**
 * 仅限数字
 * @return number
 */
export function onlyNumber (input) {
  var val = input.val();
  var _val = ""

  if ('' != val.replace(/^[0-9]\d*$/, '')) {
    var matchVal = val.match(/\d{1,}\.{0,1}\d{0,2}/);

    if (matchVal == null) {
      _val = ""
    } else {
      _val = matchVal;
    }

    input.val(_val)
  }
}


/*
* 获取今日前几天的日期
* */
export function getBeforeDate (n) {
  var n = n;
  var d = new Date();
  var year = d.getFullYear();
  var mon = d.getMonth() + 1;
  var day = d.getDate();
  if (day <= n) {
    if (mon > 1) {
      mon = mon - 1;
    } else {
      year = year - 1;
      mon = 12;
    }
  }
  d.setDate(d.getDate() - n);
  year = d.getFullYear();
  mon = d.getMonth() + 1;
  day = d.getDate();
  var s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
  return s;
}


/*
 * 格式化日期
 * formatDate('yyyy-MM-dd HH:mm:ss','时间戳')
 * */
export function formatDate (format, time) {
  var t = time != undefined ? new Date(time) : new Date();
  var tf = function (i) {
    return (i < 10 ? '0' : '') + i
  };
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());
        break;
      case 'MM':
        return tf(t.getMonth() + 1);
        break;
      case 'mm':
        return tf(t.getMinutes());
        break;
      case 'dd':
        return tf(t.getDate());
        break;
      case 'HH':
        return tf(t.getHours());
        break;
      case 'ss':
        return tf(t.getSeconds());
        break;
    }
  })
}


// dataURI转blob 上传文件使用 zx
export function dataURItoBlob (dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

// jsonp请求的简单封装
export function feJsonp (url, queryObj, successFn, failFn, timeout) {
  timeout = timeout || 100000

  let queryText = url.indexOf('?') > -1 ? '&' : '?'
  for (let key in queryObj) {
    queryText += `${key}=${queryObj[key]}&`
  }

  let cbname = 'fejp_' + Date.parse(new Date())
  let srcText = `${url}${queryText}callback=${cbname}`

  let scriptEl = document.createElement("script")
  scriptEl.src = srcText

  let isout = false
  const timeId = window.setTimeout(function () {
    isout = true
    failFn()
    document.body.removeChild(scriptEl)
  }, timeout)

  window[cbname] = function (res) {
    if (isout) {
      return false
    } else {
      successFn(res)
      window.clearTimeout(timeId)
      document.body.removeChild(scriptEl)
    }
  }


  document.body.appendChild(scriptEl)
}

export const docCookies = {
  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
}
// 操作dom
export function getClass (ele) {
  return ele.className.replace(/\s+/, ' ').split(' ')
}

export function hasClass (ele, cls) {
  return (' ' + ele.className + ' ').indexOf(' ' + cls + ' ') > -1
}

export function addClass (ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className += ' ' + cls
    var curClass = ele.className

    var classes = (cls || '').split(' ')
    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i]
      if (!clsName) continue

      if (ele.classList) {
        ele.classList.add(clsName)
      } else if (!hasClass(ele, clsName)) {
        curClass += ' ' + clsName
      }
    }
    if (!ele.classList) {
      ele.className = curClass
    }
  }
}

export function removeClass (ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)', 'gi')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export function toggleClass (ele, cls) {
  if (hasClass(ele, cls)) {
    removeClass(ele, cls)
  } else {
    addClass(ele, cls)
  }
}
export function getGeoH5 () {
  let latLng = {}
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition( // 该函数有如下三个参数
      function (pos) { // 如果成果则执行该回调函数
        latLng = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
        console.log('latLng:', latLng)
        return resolve(latLng)
        // eslint-disable-next-line
      }, function (err) { // 如果失败则执行该回调函数
        return reject('未获取到地理位置')
      }, { // 附带参数
        enableHighAccuracy: true, // 提高精度(耗费资源)
        timeout: 5000, // 超过timeout则调用失败的回调函数
        maximumAge: 1000 // 获取到的地理信息的有效期，超过有效期则重新获取一次位置信息
      }
    )
  })
}

// export function getLngLat () {
//   let timeout = 6000
//   console.log('测试时间代码')
//   return new Promise(function (resolve, reject) {
//     let resList = Promise.all([getH5LngLat(timeout), getJDJRLngLat(timeout)])
//     resList
//       .then(function (list) {
//         console.log(list)
//         if (list[1]) {
//           console.log('金融定位:', JSON.stringify(list[0]))
//           resolve(list[1])
//         } else {
//           console.log('H5定位:', JSON.stringify(list[0]))
//           resolve(list[0])
//         }
//       })
//       .catch(function (err) {
//         console.log(err)
//         reject(err)
//       })
//   })
// }
export function getLngLat () {
  let timeout = 4000
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
      }, function (err) {
        if (!complate) {
          if (!isJDJR) {
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
            console.timeEnd("timerJr")
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

function getH5LngLat (timeout) {
  return new Promise(function (resolve, reject) {
    let complate = false
    let timer = window.setTimeout(function () {
      if (!complate) {
        resolve(null)
      }
    }, timeout)
    // h5定位
    console.time('getGeoH5')
    window.navigator.geolocation.getCurrentPosition(
      function (pos) {
        complate = true
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
        console.log('H5获取地理位置成功')
        console.timeEnd('getGeoH5')
      }, function (err) {
        complate = true
        resolve(null)
        console.log('H5未获取到地理位置')
      }, {
        enableHighAccuracy: true,
        timeout: 100000,
        maximumAge: 0
      }
    )

  })
}

function getJDJRLngLat (timeout) {
  return new Promise(function (resolve, reject) {
    console.time("timertest")
    let isJDJR = /jdjr-app/i.test(window.navigator.userAgent.toLowerCase())
    if (isJDJR) {
      console.log('1')
      let complate = false
      let timer = window.setTimeout(function () {
        if (!complate) {
          resolve(null)
        }
      }, timeout)
      jsBridgeDefer.then(function (result) { // eslint-disable-line
        result.jsToGetResp(function (d) {
          d = (typeof d === 'object') ? d : JSON.parse(d)
          complate = true
          resolve({
            lat: d.location.latitude,
            lng: d.location.longitude
          })
          console.log('JR获取位置成功')
          console.timeEnd("timertest");
        }, {
            type: 9,
            isLocation: true,
            data: ''
          })
      })
    } else {
      console.log('JR获取位置失败')
      console.timeEnd("timertest");
      resolve(null)
    }
  })
}
