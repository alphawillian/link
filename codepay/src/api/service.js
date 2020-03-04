/**
 * 接口请求的方法名
 */
import fetch from '../common/fetch'
import fetchAxios from '../common/fetchAxios'
import * as api from './index'

// 到家商户列表
export const queryDaojiaShopList = (params) => fetch(api.QUERY_DAOJIA_SHOP_LIST, params, 'get')
// 到家商户列表_地图模式
export const queryDaojiaMapShopList = (params) => fetch(api.QUERY_DAOJIAMAP_SHOP_LIST, params, 'get')

// 猎户商户列表
export const queryLiehuShopList = (params) => fetchAxios(api.QUERY_LIEHU_SHOP_LIST, params, 'post')

// 泰山数据
export const queryTai = (params) => fetch(api.QUERY_TAI, params, 'get')

// 城市信息
export const queryCityInfo = (params) => fetch(api.QUERY_CITY_INFO, params, 'get')

// 用户是否为码付新用户
export const queryUserStatus = (params) => fetch(api.QUERY_USER_STATUS, params, 'get')
// 页面的泰山配置数据
export const queryModuleData = (params) => fetch(api.QUERY_MODULE_DATA, params, 'get')
// 根据经纬度获取附近商户信息
export const queryShopList = (params) => fetch(api.QUERY_SHOP_LIST, params, 'get')
// 接受任务
export const getTask = (params) => fetch(api.GET_TASK, params, 'get')
// 领取任务奖励
export const getReward = (params) => fetch(api.GET_REWARD, params, 'get')
// 金币商城券包列表和金币任务列表
export const queryGoldList = (params) => fetchAxios(api.QUERY_GOLD_LIST, params, 'post')
// 金币兑换优惠券
export const goldCoinExcg = (params) => fetchAxios(api.GET_GOLD_COIN, params, 'post')



