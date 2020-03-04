<template>
  <div class="container-out">
    <div class="address-city">
      <div class="city-current" v-if="cityInfo.cityName">
        <span class="desc">
          <i class="icon-location"></i>
          <span>当前城市</span>
        </span>
        <span class="city">{{cityInfo.cityName}}</span>
      </div>
      <div class="city-hot" v-if="hotCityList.length">
        <div class="title">热门城市</div>
        <ul class="hot-list">
          <li
            class="hot-item"
            v-for="(item, index) in hotCityList"
            :key="index"
            @click="confirmCity(item, 'hot')"
          >
            <span>{{item.cityName}}</span>
          </li>
        </ul>
      </div>
      <div class="city-block" v-if="cityList.length">
        <div class="alpha-block" v-for="(item, index) in cityList" :key="index">
          <div class="alpha" :ref="item.groupName">{{item.groupName}}</div>
          <ul class="city-list" v-for="(cityItem, index) in item.data" :key="index">
            <li class="city-item" @click="confirmCity(cityItem, 'normal')">{{cityItem.cityName}}</li>
          </ul>
        </div>
      </div>
      <div class="alphabet-block">
        <ul class="alpha-list">
          <li
            class="alpha-item"
            v-for="(item, index) in cityList"
            :key="index"
            @click="goAnchorAlpha(item.groupName)"
          >{{item.groupName}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import store from '../store'
import Fetoast from '../components/toast'
import loading from '../components/fullLoading/index.js'
import { queryCityList } from '../api/service'
import { sendPointFn } from '../utils/utils'
export default {
  name: '',
  components: {
  },
  data () {
    return {
      confirmedAddressInfo: {
        cityInfo: {
          cityName: '',
          cityCode: ''
        },
        addressInfo: {
          addressTxt: '',
          street: '',
          lat: '',
          lng: ''
        }
      },
      cityInfo: {
        cityCode: '',
        cityName: ''
      },
      hotCityList: [],
      cityList: [],
      data: {
        hotCityList: [],
        cityList: []
      }
    }
  },
  created () { },
  watch: {
  },
  mounted () {
    this.pageInit()
  },
  beforeRouteLeave (to, from, next) {
    console.log('to:', to)
    if (to.name === 'index') { // 去城市选择页面
      const cityInfoStr = JSON.stringify(this.cityInfo)
      sessionStorage.setItem('cityInfo', cityInfoStr)
    }
    next()
  },
  methods: {
    // 查询城市列表
    async doQueryCityList () {
      const reqParams = {
        biz: 'trafficHome'
      }
      let res = {}
      try {
        loading()
        res = await queryCityList(reqParams)
        loading.close()
      } catch (err) {
        loading.close()
        Fetoast('网络繁忙，请稍后重试！')
        return false
      }
      if (res.code === 'F_000000') {
        this.$store.commit('SET_RAW_CITYINFO', res.data)
        console.log('store.state.rawCityInfo:', this.$store.state.rawCityInfo)
        let rawCityInfo = this.$store.state.rawCityInfo
        this.hotCityList = rawCityInfo.hotCityList
        this.cityList = rawCityInfo.cityList
      } else {
        Fetoast(res.msg || '网络繁忙，请稍后重试！')
      }
    },
    pageInit () {
      this.handleSessionStorage()
      this.getStoreInfo()
      // this.doQueryCityList()
    },
    handleSessionStorage () {
      const cityInfo = JSON.parse(sessionStorage.getItem('beforeCityInfo'))
      console.log('cityInfo', cityInfo)
      if (cityInfo) {
        this.cityInfo = cityInfo
      } else {
        console.log('无城市信息')
      }
    },
    // 获取store里数据并赋值
    getStoreInfo () {
      const rawCityInfo = this.$store.state.rawCityInfo
      console.log(rawCityInfo)
      if (rawCityInfo.cityList && this.hotCityList) {
        console.log('有数据')
        this.hotCityList = rawCityInfo.hotCityList
        this.cityList = rawCityInfo.cityList
      } else {
        console.log('无数据')
        this.doQueryCityList()
      }
    },
    // 点击切换城市
    confirmCity (data, moduleId) {
      this.cityInfo = data
      this.$router.back()
      this.sendPoint(data.cityCode, moduleId)
    },
    // 发送埋点数据
    sendPoint (clickId, moduleId) {
      const pageId = 'city'
      clickId = clickId || 'default'
      moduleId = moduleId || 'default'
      sendPointFn(pageId, moduleId, clickId)
    },
    goAnchorAlpha (alpha) {
      const u = window.navigator.userAgent
      const isMobile = u.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      console.log('ismobile:', isMobile)
      console.log('alpha:', alpha)
      const anchor = this.$refs[alpha]
      console.log(anchor)
      const target = anchor[0].offsetTop
      let doc = document.body || document.documentElement
      if (!isMobile) {
        doc = document.documentElement
      }
      console.log('doc.scrollTop:', doc.scrollTop)
      clearInterval(window.anchorTimer)
      window.anchorTimer = setInterval(function () {
        let iSpeed = (target - doc.scrollTop) / 8
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
        if (doc.scrollTop + window.innerHeight - doc.offsetHeight === 0) {
          clearInterval(window.anchorTimer)
        }
        if (Math.abs(iSpeed) <= 1) {
          clearInterval(window.anchorTimer)
        }
        if (doc.scrollTop === target) {
          // 到达终点
          clearInterval(window.anchorTimer)
        } else {
          // 到达之前
          doc.scrollTop += iSpeed
        }
      }, 20)
    }
  }
}
</script>

<style lang='scss' scoped>
$r:100;
.container-out{
  width: 100vw;
  min-height: 100vh;
  background: white;
  padding-bottom: 50rem/$r;
}
.address-city{
  font-size: 28rem/$r;
  color: #333;
  .fullLoading{
    width: 100vw;
    height: 100vh;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    z-index: 10;
    ::v-deep .van-loading{
      display: inline-block;
      transform: translate(-50%, -50%);
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }
  .icon-location{
    display: inline-block;
    width: 23rem/$r;
    height: 28rem/$r;
    background-image: url('//storage.jd.com/fe-traffic/images/icon_location_black.png');
    background-size: 100% 100%;
    margin-right: 6rem/$r;
    position: relative;
    top: 3rem/$r;
  }
  // 当前城市行
  .city-current{
    padding-left: 30rem/$r;
    padding-right: 20rem/$r;
    height: 90rem/$r;
    line-height: 90rem/$r;
    border-bottom: 1px solid #f7f7f7;
    .desc{
      margin-right: 20rem/$r;
    }
    .city{
      text-decoration: underline;
    }
  }
  // 热门城市
  .city-hot{
    padding: 0 30rem/$r;
    .title{
      height: 60rem/$r;
      line-height: 60rem/$r;
      font-size: 24rem/$r;
      color: #999;
    }
    .hot-list{
      font-size: 0;
      .hot-item{
        display: inline-block;
        position: relative;
        min-width: 140rem/$r;
        height: 56rem/$r;
        border-radius: 4rem/$r;
        margin-right: 20rem/$r;
        margin-bottom: 20rem/$r;
        background-color: #f5f5f5;
        font-size: 28rem/$r;
        color: #333;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        span{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  // 城市列表样式
  .city-block{
    padding: 0 30rem/$r;
    .alpha-block{
      margin-top: 20rem/$r;
      .alpha{
        font-size: 24rem/$r;
        color: #999;
        height: 60rem/$r;
        line-height: 60rem/$r;
      }
      .city-list{
        .city-item{
          font-size: 28rem/$r;
          color: #333;
          height: 60rem/$r;
          line-height: 60rem/$r;
        }
      }
    }
  }
  // 右侧字母列表
  .alphabet-block{
    height: 100vh;
    position: fixed;
    right: 20rem/$r;
    top: 0;
    display: flex;
    align-items: center;
    .alpha-list{
      width: 16rem/$r;
      .alpha-item{
        font-size: 18rem/$r;
        color: #333;
        padding: 3rem/$r;
      }
    }
  }
}
</style>
