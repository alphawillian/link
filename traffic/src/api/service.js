/**
 * 接口请求的方法名
 */
import fetch from '../common/fetch'
import * as api from './index'
// 主页数据接口
export const queryHome = (params) => fetch(api.QUERY_HOME, params, 'get')
// 城市列表查询接口
export const queryCityList = (params) => fetch(api.QUERY_CITYLIST, params, 'get')
// 城市信息接口
export const queryCityInfo = (params) => fetch(api.QUERY_CITYINFO, params, 'get')
// 权益卡列表接口
export const apiQueryCardsList = (params) => fetch(api.QUERY_CARDS_LIST, params, 'post')
// 权益卡详情接口
export const apiQueryCardDetail = (params) => fetch(api.QUERY_CARD_DETAIL, params, 'post')
// 常见问题接口
export const apiQueryQaTab = (params) => fetch(api.QUERY_QA_TAB, params, 'post')
