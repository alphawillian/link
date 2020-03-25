<template>
  <div :class="['address-home', {'search-status' : isShowSearchBlock}]">
    <div :class="['block-top']">
      <!-- 顶部第一行 -->
      <div class="top-line line1">
        <span class="line-left" @click="goAddressCity" v-show="!isShowSearchBlock">
          <i class="icon-location"></i>
          <span class="select-city">{{confirmedAddressInfo.cityInfo.cityName}}</span>
          <i class="icon-down"></i>
        </span>
        <div class="input-block line-right">
          <i class="icon-search"></i>
          <input
            type="search"
            ref="addressInput"
            v-model="searchTxt"
            @focus="addressInputFocus"
            placeholder="搜索城市范围内的地理位置"
          />
        </div>
        <div class="search-btn" v-show="isShowSearchBlock" @click="doSearchAddress">搜索</div>
      </div>
    </div>
    <!-- 地址主页主要板块 -->
    <div class="main-block" v-show="!isShowSearchBlock">
      <!-- 顶部第二行 -->
      <div class="top-line line2">
        <span class="line-left" @click="confirmLocation">{{gpsStreetTxt}}</span>
        <span class="line-right" @click="getLatLng(1)">
          <i class="icon-resetLocation"></i>
          <span>重新定位</span>
        </span>
      </div>
      <!-- 历史搜索板块 -->
      <div class="block-history" v-if="localStorageArr.length">
        <div class="title">
          <span class="title-left">历史搜索</span>
          <span class="title-right" @click="delLocalStorageInfo">清除全部</span>
        </div>
        <ul class="history-list">
          <template v-for="(item, index) in localStorageArr">
            <li
              class="item"
              v-if="item && item.cityInfo && item.addressInfo && item.addressInfo.addressTxt "
              :key="index"
              @click="confirmLocalAddress(item)"
            >{{item.addressInfo.addressTxt}}</li>
          </template>
        </ul>
      </div>
    </div>
    <div class="search-address-list" v-show="isShowSearchBlock">
      <div
        class="item"
        v-for="(item, index) in searchResList"
        :key="index"
        @click="confirmSearchAddress(item)"
      >
        <div class="address">
          <div class="title">{{item.title}}</div>
          <div class="detail">{{item.address}}</div>
        </div>
        <div class="distance">{{item.distance}}{{item.distanceUnit}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { queryAddressName, queryPlaceSearch, queryCityList } from '../../../api/service'
import { getParams, getLngLat } from '../../../utils/utils.js'
export default {
  name: '',
  components: {},
  data () {
    return {
      isGetGeo: false,
      gpsLatLng: {
        latitude: '',
        longitude: ''
      },
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
      selectedCityInfo: {},
      tempCityInfo: {},
      gpsStreetTxt: '',
      isShowSearchBlock: false, // 展示搜索板块
      searchTxt: '', // 搜索的文字
      isEntering: false, // 是否正在输入
      searchResList: [], // 搜索到的地址列表
      localStorageArr: [] // 本地存储的搜索地址信息
    }
  },
  created () { },
  mounted () {
    this.initCityInfo()
    this.doQueryPlaceSearch()
    this.getLocalStorageInfo()
    this.keyboardFix()
    this.DoQueryCityList()
    // this.getLatLng()
    this.sendPoint('page')
  },
  watch: {
    searchTxt (nVal, oVal) {
      if (nVal) {
        this.doQueryPlaceSearch()
      } else {
        this.searchResList = []
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('Home_to:', to)
    console.log('Home_from:', from)
    next((vm) => {
      if (sessionStorage.getItem('confirmedAddressInfo')) {
        vm.confirmedAddressInfo = JSON.parse(sessionStorage.getItem('confirmedAddressInfo'))
      }
      if (from.name === 'Home' && sessionStorage.getItem('confirmedAddressInfo')) {
        vm.gpsStreetTxt = vm.confirmedAddressInfo.addressInfo.addressTxt
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    console.log('to:', to)
    console.log('from:', from)
    if (this.isShowSearchBlock) {
      this.isShowSearchBlock = false
      this.searchTxt = ''
      this.$refs.addressInput.blur()
      next(false)
      // return false
    } else {
      next()
    }
  },
  methods: {
    // 获取用户经纬度
    async getLatLng () {
      this.tempCityInfo = {}
      this.gpsStreetTxt = ''
      if (getParams('lat') && getParams('lng')) {
        this.gpsLatLng.latitude = getParams('lat')
        this.gpsLatLng.longitude = getParams('lng')
      } else {
        try {
          Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'spinner'
          })
          let res = await getLngLat()
          Toast.clear()
          if (res && res.lat && res.lng) {
            this.gpsLatLng.latitude = res.lat
            this.gpsLatLng.longitude = res.lng
          } else {
            // console.log('err:', err)
            Toast('未获取到您的位置请，请手动切换城市和搜索')
          }
        } catch (err) {
          console.log('err:', err)
          Toast('未获取到您的位置请，请手动切换城市和搜索')
        }
      }
      // this.$store.commit('SET_CURRENT_LATLNG', this.gpsLatLng)
      if (this.gpsLatLng.latitude && this.gpsLatLng.longitude) {
        this.doQueryAddressName()
      }
      this.sendPoint('resetLocation')
    },
    // 经纬度逆解析地理位置
    async doQueryAddressName () {
      let reqParams = {
        latitude: this.gpsLatLng.latitude,
        longitude: this.gpsLatLng.longitude
      }
      let res = {}
      try {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner'
        })
        res = await queryAddressName(reqParams)
        Toast.clear()
      } catch (err) {
        Toast('服务异常，请稍后再试！')
      }
      if (res.resultCode === '0') {
        let data = res.resultData
        this.tempCityInfo = {
          cityName: data.addressComponent.city,
          defaultLat: this.gpsLatLng.latitude,
          defaultLng: this.gpsLatLng.longitude,
          isByLocation: true
        }
        this.gpsStreetTxt = data.addressComponent.street_number || data.addressComponent.street || data.addressComponent.district
        let confirmedAddressInfo = {
          cityInfo: this.tempCityInfo,
          addressInfo: {
            addressTxt: data.address,
            street: this.gpsStreetTxt,
            lat: this.gpsLatLng.latitude,
            lng: this.gpsLatLng.longitude
          }
        }
        sessionStorage.setItem('confirmedAddressInfo', JSON.stringify(confirmedAddressInfo))
        setTimeout(() => {
          this.$router.go(-1)
        }, 300)
      }
    },
    // 地址搜索
    async doQueryPlaceSearch () {
      if (!this.searchTxt) return false
      let cityInfo = this.confirmedAddressInfo.cityInfo
      let reqParams = {
        cityName: cityInfo.cityName,
        keyWord: this.searchTxt,
        latitude: cityInfo.defaultLat,
        longitude: cityInfo.defaultLng
      }
      let res = {}
      try {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner'
        })
        res = await queryPlaceSearch(reqParams)
        Toast.clear()
      } catch (err) {
        Toast('服务异常，请稍后再试！')
      }
      if (!this.searchTxt) {
        this.searchResList = []
        return false
      }
      if (res.resultCode === '0') {
        this.searchResList = res.resultData
      }
    },
    // 查询城市列表
    async DoQueryCityList () {
      let res = {}
      try {
        res = await queryCityList()
      } catch (err) {

      }
      if (res && res.resultCode === '0') {
        this.$store.commit('SET_RAW_CITYINFO', res.resultData)
        console.log('store.state.rawCityInfo:', this.$store.state.rawCityInfo)
      }
    },
    initCityInfo () {
      if (sessionStorage.getItem('confirmedCityInfo')) {
        this.tempCityInfo = JSON.parse(sessionStorage.getItem('confirmedCityInfo'))
      }
    },
    // 确认搜索出来的城市
    confirmSearchAddress (data) {
      let addressInfo = {
        addressTxt: data.title,
        street: '',
        lat: data.location.lat,
        lng: data.location.lng,
        id: data.id
      }
      this.confirmedAddressInfo.addressInfo = addressInfo
      let tempStr = JSON.stringify(this.confirmedAddressInfo)
      sessionStorage.setItem('confirmedAddressInfo', tempStr)
      this.setLocalStorageInfo(this.confirmedAddressInfo)
      this.isShowSearchBlock = false
      this.$router.back()
      this.sendPoint('chooseSearchAdd')
    },
    // 确认历史搜索位置
    confirmLocalAddress (data) {
      this.confirmedAddressInfo = data
      let tempStr = JSON.stringify(this.confirmedAddressInfo)
      sessionStorage.setItem('confirmedAddressInfo', tempStr)
      this.setLocalStorageInfo(this.confirmedAddressInfo)
      this.$router.back()
      this.sendPoint('chooseLocalAdd')
    },
    // 确认重新定位到城市
    confirmLocation () {
      this.confirmedCityInfo = this.tempCityInfo
      sessionStorage.setItem('confirmedCityInfo', JSON.stringify(this.confirmedCityInfo))
      this.$store.commit('SET_ADDRESSCHANGE', true)
      this.$router.go(-1)
    },
    // 获取本地存储信息
    getLocalStorageInfo () {
      let str = localStorage.getItem('fe_location_liehudaojia')
      console.log('str:', JSON.parse(str))
      if (str) {
        let arr = JSON.parse(str)
        this.localStorageArr = arr
      }
    },
    // 设置本地存储信息
    setLocalStorageInfo (data) {
      console.log('setLocalStorageInfo', data)
      let rawArr = this.localStorageArr
      try {
        if (rawArr.length) {
          rawArr.forEach((item, index) => {
            if (item && item.addressInfo && (item.addressInfo.id === data.addressInfo.id)) {
              this.localStorageArr.splice(index, 1)
            }
          })
          if (rawArr.length >= 4) {
            this.localStorageArr.splice(3, 1)
          }
        }
        this.localStorageArr.unshift(data)
        let str = JSON.stringify(this.localStorageArr)
        localStorage.setItem('fe_location_liehudaojia', str)
      } catch (err) {
        console.log('err:', err)
        this.localStorageArr = []
        this.delLocalStorageInfo()
      }
    },
    // 删除本地存储信息
    delLocalStorageInfo () {
      this.localStorageArr = []
      localStorage.removeItem('fe_location_liehudaojia');
      this.sendPoint('delLocalAdd')
    },
    // 搜索地址输入框聚焦
    addressInputFocus () {
      this.isShowSearchBlock = true
      this.sendPoint('searchAddress')
    },
    addressInputBlur () {
      // this.isShowSearchBlock = false
    },
    // 搜索地理位置
    doSearchAddress () {
      this.isShowSearchBlock = true
    },
    // 去城市切换页
    goAddressCity () {
      this.$router.push({ name: 'AddressCity', query: {} })
      this.sendPoint('goCityChoose')
    },
    // 键盘收起
    keyboardFix () {
      let _this = this
      document.addEventListener('touchstart', function (e) {
        _this.$refs.addressInput.blur()
      }, false)
    },
    sendPoint (id, url) {
      window.JPTrack.emit(['addressHome', id], url)
    }
  }
}
</script>

<style lang='scss' scoped>
$r:100;
.address-home{
  min-height: 100vh;
  background: white;
  font-size: 28rem/$r;
  color: #333;
  // icon样式
  .icon-location{
    display: inline-block;
    width: 23rem/$r;
    height: 28rem/$r;
    background-image: url('//img30.360buyimg.com/jr_image/jfs/t1/23119/20/13045/688/5c9c55b3Ed6af55cd/07eae83dd4898587.png');
    background-size: 100% 100%;
  }
  .icon-down{
    display: inline-block;
    width: 14rem/$r;
    height: 8rem/$r;
    background-image: url('../../../assets/images/icon_downArrow.png');
    background-size: 100% 100%;
  }
  .icon-search{
    display: inline-block;
    width: 30rem/$r;
    height: 30rem/$r;
    background-image: url('../../../assets/images/bg_search.png');
    background-size: 100% 100%;
  }
  .icon-resetLocation{
    display: inline-block;
    width: 31rem/$r;
    height: 31rem/$r;
    background-image: url('//img30.360buyimg.com/jr_image/jfs/t1/14413/27/12931/442/5c9c55b3Ec50b0a4d/97acca4c83fd3ddb.png');
    background-size: 100% 100%;
  }
  input[type=search]::-webkit-search-cancel-button{
    -webkit-appearance: none;
    position: relative;
    height: 30rem/$r;
    width: 30rem/$r;
    background-image: url('//img30.360buyimg.com/jr_image/jfs/t1/33721/19/93/368/5c9c55b2Eac7efd94/09b5c6beaf1e9931.png');
    background-size: 100% 100%;
  }
  input{
    &::placeholder{
      color: #999;
    }
  }

  // 顶部定位样式
  // 顶部第一行第二行
  .top-line{
    padding-left: 20rem/$r;
    padding-right: 30rem/$r;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f7f7f7;
    .line-left{
      display: flex;
      align-items: center;
    }
    // 顶部第一行
    &.line1{
      height: 90rem/$r;
      .line-left{
        .select-city{
          margin: 0 8rem/$r;
        }
        margin-right: 24rem/$r;
      }
      .line-right{
        height: 48rem/$r;
        flex-grow: 1;
        background-color: #f7f7f7;
        color: #bbbbbb;
        font-size: 24rem/$r;
        display: flex;
        align-items: center;
        padding-left: 20rem/$r;
        position: relative;
        .icon-search{
          margin-right: 10rem/$r;
          position: absolute;
        }
        input{
          width: 100%;
          height: 100%;
          background: transparent;
          outline: none;
          border: none;
          padding-left: 40rem/$r;
        }
      }
      .search-btn{
        font-size: 24rem/$r;
        color: #366fff;
        margin-left: 20rem/$r;
      }
    }
    // 顶部第二行
    &.line2{
      padding-left: 30rem/$r;
      min-height: 90rem/$r;
      .line-right{
        i{
          margin: 8rem/$r;
        }
        color: #2c68ff;
        margin-left: 20rem/$r;
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }
    }
  }
  
  .block-history{
    padding: 40rem/$r 30rem/$r 0 30rem/$r;
    .title{
      height: 50rem/$r;
      display: flex;
      justify-content: space-between;
      color: #999999;
      .title-left{
        font-size: 24rem/$r;
      }
      .title-right{
        font-size: 22rem/$r;
      }
    }
    .history-list{
      font-size: 28rem/$r;
    }
  }
  // 搜索地址结果列表
  .search-address-list{
    .item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 100rem/$r;
      padding: 10rem/$r 30rem/$r;
      border-bottom: 1px solid #f5f5f5;
      &:nth-last-child(1){
        border: none;
      }
      .address{
        flex-grow: 1;
        .title{
          font-size: 28rem/$r;
          color: #333;
        }
        .detail{
          font-size: 24rem/$r;
          color: #999;
        }
      }
      .distance{
        flex-shrink: 0;
        font-size: 24rem/$r;
        color: #999;
        margin-left: 20rem/$r;
      }
    }
  }
}
</style>
