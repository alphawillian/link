<template>
  <div class="address-city">
    <div class="fullLoading" v-if="isFullLoading">
      <Loading type="spinner" />
    </div>
    <div class="city-current">
      <span class="desc">
        <i class="icon-location"></i>
        <span>当前城市</span>
      </span>
      <span class="city">{{confirmedAddressInfo.cityInfo.cityName}}</span>
    </div>
    <div class="city-hot">
      <div class="title">热门城市</div>
      <ul class="hot-list">
        <li
          class="hot-item"
          v-for="(item, index) in hotCityList"
          :key="index"
          @click="confirmCity(item);sendPoint('hotCity')"
        >{{item.cityName}}</li>
      </ul>
    </div>
    <div class="city-block">
      <div class="alpha-block" v-for="(item, index) in cityList" :key="index">
        <div class="alpha" :ref="item.groupName">{{item.groupName}}</div>
        <ul class="city-list" v-for="(cityItem, index) in item.data" :key="index">
          <li
            class="city-item"
            @click="confirmCity(cityItem);sendPoint('normalCity')"
          >{{cityItem.cityName}}</li>
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
</template>

<script>
// import store from '../store'
import { Toast, Loading } from 'vant'
import { queryCityList } from '../../../api/service'
export default {
  name: '',
  components: {
    Loading
  },
  data () {
    return {
      isFullLoading: false, // 是否全局loading
      confirmedAddressInfo: {
        cityInfo: {
          cityName: '',
          defaultLat: '',
          defaultLng: '',
          isByLocation: null
        },
        addressInfo: {
          addressTxt: '',
          street: '',
          lat: '',
          lng: ''
        }
      },
      hotCityList: [],
      cityList: []
    }
  },
  created () { },
  watch: {
  },
  mounted () {
    this.pageInit()
  },
  methods: {
    // 查询城市列表
    async DoQueryCityList () {
      let res = {}
      try {
        this.isFullLoading = true
        res = await queryCityList()
        this.isFullLoading = false
      } catch (err) {
        this.isFullLoading = false
        Toast('网络繁忙，请稍后重试！')
      }
      if (res.resultCode === '0') {
        this.$store.commit('SET_RAW_CITYINFO', res.resultData)
        console.log('store.state.rawCityInfo:', this.$store.state.rawCityInfo)
        let rawCityInfo = this.$store.state.rawCityInfo
        this.hotCityList = rawCityInfo.hotCities
        this.cityList = rawCityInfo.cities
      } else {
        Toast(res.resultMsg || '网络繁忙，请稍后重试！')
      }
    },
    pageInit () {
      this.handleSessionStorage()
      this.getStoreInfo()
      this.sendPoint('page')
    },
    handleSessionStorage () {
      this.confirmedAddressInfo = JSON.parse(sessionStorage.getItem('confirmedAddressInfo'))
    },
    // 获取store里数据并赋值
    getStoreInfo () {
      let rawCityInfo = this.$store.state.rawCityInfo
      console.log(rawCityInfo)
      if (!rawCityInfo.cities) {
        console.log('无数据')
        this.DoQueryCityList()
      } else {
        console.log('有数据')
        this.hotCityList = rawCityInfo.hotCities
        this.cityList = rawCityInfo.cities
      }
    },
    // 点击切换城市
    confirmCity (data) {
      let addressInfo = {
        addressTxt: '',
        street: '',
        lat: data.defaultLat,
        lng: data.defaultLng
      }
      this.confirmedAddressInfo.addressInfo = addressInfo
      this.confirmedAddressInfo.cityInfo = data
      let infoStr = JSON.stringify(this.confirmedAddressInfo)
      sessionStorage.setItem('confirmedAddressInfo', infoStr)
      this.$router.back()
    },
    goAnchorAlpha (alpha) {
      console.log('alpha:', alpha)
      let anchor = this.$refs[alpha]
      console.log(anchor)
      let ua = navigator.userAgent
      const isPhone = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/.test(ua)
      console.log('isPhone:', isPhone)
      let target = anchor[0].offsetTop
      // let doc = document.body || document.documentElement
      let doc = document.documentElement
      if (isPhone) {
        doc = document.body
      }
      console.log('doc.scrollTop:', doc.scrollTop)
      clearInterval(window.anchorTimer)
      window.anchorTimer = setInterval(function () {
        var iSpeed = (target - doc.scrollTop) / 8
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
    },
    sendPoint (id, url) {
      window.JPTrack.emit(['addressCity', id], url)
    }
  }
}
</script>

<style lang='scss' scoped>
$r:100;
.address-city{
  font-size: 28rem/$r;
  color: #333;
  background: white;
  .fullLoading{
    width: 100vw;
    height: 100vh;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    z-index: 10;
    /deep/ .van-loading{
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
    background-image: url('//img30.360buyimg.com/jr_image/jfs/t1/23119/20/13045/688/5c9c55b3Ed6af55cd/07eae83dd4898587.png');
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
      .hot-item{
        display: inline-block;
        min-width: 136rem/$r;
        height: 56rem/$r;
        border-radius: 4rem/$r;
        line-height: 62rem/$r;
        margin-right: 20rem/$r;
        margin-bottom: 20rem/$r;
        background-color: #e9e0ff;
        font-size: 28rem/$r;
        color: #2c68ff;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
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
