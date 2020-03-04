import fetch from 'common/fetch.js'
// import jsonpPro from 'common/jsonp.fetch.js'
import * as api from 'api/index.js'

// 获取商品列表
export const apiUploadInfo = (params) => fetch(api.uploadInfo, params, 'post')
