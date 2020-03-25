/**
 * 接口请求的方法名
 */
import fetch from '../common/fetch'
import fetch1 from '../common/fetch1'
import * as api from './index'

// 测试接口
export const apiTest = (params) => fetch1(api.BASE_URL, api.API_TEST, params, 'post')
// 到家商户列表
export const queryDaojiaShopList = (params) => fetch1(api.BASE_URL, api.QUERY_DAOJIA_SHOP_LIST, params, 'post')
// 到家商户列表_地图模式
export const queryDaojiaMapShopList = (params) => fetch(api.QUERY_DAOJIAMAP_SHOP_LIST, params, 'get')

// 猎户商户列表
export const queryLiehuShopList = (params) => fetch1(api.BASE_URL, api.QUERY_LIEHU_SHOP_LIST, params, 'post')

// 泰山数据
export const queryTai = (params) => fetch(api.QUERY_TAI, params, 'get')

// 城市信息
export const queryCityInfo = (params) => fetch(api.QUERY_CITY_INFO, params, 'get')
// 查询城市列表信息
export const queryCityList = (params) => fetch1(api.BASE_URL, api.QUERY_CITY_LIST, params, 'post')
// 领券和领奖接口
export const getCouponLottery = (params) => fetch1(api.BASE_URL, api.GET_COUPON_LOTTERY, params, 'post')
// 经纬度地址逆解析
export const queryAddressName = (params) => fetch1(api.BASE_URL, api.QUERY_ADDRESS_NAME, params, 'post')
// 经纬度地址逆解析
export const queryPlaceSearch = (params) => fetch1(api.BASE_URL, api.QUERY_PLACE_SEARCH, params, 'post')
// 商户详情页
export const queryStoreDetail = (params) => fetch1(api.BASE_URL, api.QUERY_STORE_DETAIL, params, 'post')



