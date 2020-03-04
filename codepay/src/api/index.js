export const BASE_URL_DAOJIA = '//lbspayapi.jd.com'
export const BASE_URL_LIEHU = '//lbspayapi.jd.com'
// export const BASE_URL_MAIN = '//jdpayhome.jd.com/my' // 预发环境
// export const BASE_URL_MAIN = '//lbspayapi.jd.com'
export const BASE_URL_TAI = '//mktcloud.jd.com'
export const BASE_URL_QQ = 'https://apis.map.qq.com'
export const BASE_URL_BAIDU = 'https://api.map.baidu.com'
export const BASE_URL_PAYHOME = '//payhome.jd.com'

// 获取到家商户列表
export const QUERY_DAOJIA_SHOP_LIST = BASE_URL_DAOJIA + '/omdj/ml.htm'

// 获取到家商户列表_地图模式
export const QUERY_DAOJIAMAP_SHOP_LIST = BASE_URL_DAOJIA + '/omdj/mapml.htm'

// 获取猎户商家列表
export const QUERY_LIEHU_SHOP_LIST = BASE_URL_LIEHU + '/omm/ml.htm'

// 获取泰山配置数据
export const QUERY_TAI = BASE_URL_TAI + '/jsonp/matchTemplateByFront'

// 获取城市信息
// export const QUERY_CITY_INFO = BASE_URL_QQ + '/ws/geocoder/v1/'
export const QUERY_CITY_INFO = BASE_URL_BAIDU + '/reverse_geocoding/v3/'
// 用户是否为码付新用户
export const QUERY_USER_STATUS = BASE_URL_PAYHOME + '/my/api/codepayStatus'
// 页面的泰山配置数据
export const QUERY_MODULE_DATA = BASE_URL_PAYHOME + '/my/api/moduleData'
// 根据经纬度获取附近商户信息
export const QUERY_SHOP_LIST = BASE_URL_LIEHU + '/omo/mlp.htm'
// 接受任务
export const GET_TASK = BASE_URL_PAYHOME + '/my/api/payRightsCenter/acceptMission'
// 领取任务奖励
export const GET_REWARD = BASE_URL_PAYHOME + '/my/api/payRightsCenter/rewardMission'
// 金币商城券包列表和金币任务列表
export const QUERY_GOLD_LIST = '/my/api/quickpay/goldCoinMallAndTask'
// 金币兑换优惠券
export const GET_GOLD_COIN = '/my/api/quickpay/goldCoinExchange'
