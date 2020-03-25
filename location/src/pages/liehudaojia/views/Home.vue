<template>
  <div class="container" ref="container">
    <div class="fullLoading" v-if="isGetGeo || isFullLoading">
      <Loading type="spinner" />
    </div>
    <div class="tab-list">
      <div :class="['tab-item', pageStatus === 1 ? 'selected' : '' ]" @click="changeTab(1)">身边优惠</div>
      <div :class="['tab-item', pageStatus === 2 ? 'selected' : '' ]" @click="changeTab(2)">京东到家</div>
    </div>
    <div class="main-container">
      <div class="block-public">
        <div class="address-line" @click="goChageAddress">
          <i class="icon-location"></i>
          <span class="address-txt">{{confirmedAddressInfo.addressInfo.addressTxt || '暂未获取位置信息'}}</span>
          <i class="icon-right"></i>
        </div>
        <div class="fake-search">
          <i class="icon-search"></i>
          <input
            ref="searchL"
            type="search"
            v-show="pageStatus === 1"
            v-model="searchLTxt"
            @focus="searchLFocus"
            :disabled="!searchLAble"
            placeholder="搜索更多附近商户"
          />
          <input
            ref="searchD"
            type="search"
            v-show="pageStatus === 2"
            v-model="searchDTxt"
            :disabled="!searchDAble"
            @focus="searchDFocus"
            placeholder="搜索更多附近商户"
          />
        </div>
        <div class="public-in-liehu" v-show="pageStatus === 1 && enterList.length">
          <a
            href="javascript:;"
            v-for="(item, index) in enterList"
            :key="index"
            @click="sendPoint(item.key || 'enterItem', item.url)"
          >{{item.txt}}</a>
        </div>
      </div>
      <div class="block-liehu" v-show="pageStatus === 1">
        <div class="list-liehu" v-show="shopListL.length">
          <shop-item-l
            v-for="(item, index) in shopListL"
            :info="item"
            :key="index"
            :addressInfo="confirmedAddressInfo.addressInfo"
            @sendPoint="sendPoint"
          ></shop-item-l>
          <div class="noMoreData" v-if="noMoreDataL">没有更多商户了</div>
        </div>
        <div class="loading loadingL" v-if="isQueryingListL">
          <Loading type="spinner" />
        </div>
        <div class="data-empty" v-show="noDataL && !isQueryingListL">
          <img
            src="//img30.360buyimg.com/jr_image/jfs/t1/29851/2/12914/7602/5c9c55b2E9d8e908c/d2adddccca7adcde.png"
            alt
          />
          <div class="desc">未找到您周边的商户~</div>
        </div>
      </div>

      <div class="block-daojia" v-show="pageStatus === 2">
        <div class="list-daojia" v-show="shopListD.length">
          <div class="list-daojia-in">
            <shop-item-d
              v-for="(item, index) in shopListD"
              :info="item"
              :key="index"
              @sendPoint="sendPoint"
            ></shop-item-d>
            <div class="noMoreData" v-if="noMoreDataD">没有更多商户了</div>
          </div>
        </div>
        <div class="loading" v-if="isQueryingListD">
          <Loading type="spinner" />
        </div>
        <div class="data-empty" v-show="noDataD || (noMoreDataD && !shopListD.length)">
          <img
            src="//img30.360buyimg.com/jr_image/jfs/t1/29851/2/12914/7602/5c9c55b2E9d8e908c/d2adddccca7adcde.png"
            alt
          />
          <div class="desc">未找到您周边的商户~</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import debounce from 'lodash/debounce'
import { Toast, Loading } from 'vant'
import { Base64 } from 'js-base64';
import ShopItemD from '../../../components/shopItemD'
import ShopItemL from '../../../components/shopItemL1'
import { queryAddressName, queryLiehuShopList, queryDaojiaShopList } from '../../../api/service'
import { defaultCity } from '../../../data/cityInfo.js'
import { getParams, getLngLat } from '../../../utils/utils.js'
export default {
  name: '',
  components: {
    Loading,
    ShopItemD,
    ShopItemL
  },
  data () {
    this.searchListLInit = debounce(this.searchListLInit, 500)
    return {
      sourceData: window.data_source_100002365, // 配置数据
      enterList: [], // 身边优惠搜索框下的跳转链接入口列表
      routerStatus: 0, // 路由状态：0:首次进入页面或刷新;1:从地址选择页返回
      radius: 30000, // 猎户商户请求半径30km
      lPage: {
        size: 10,
        index: 1
      }, // 附近优惠列表分页参数
      dPage: {
        size: 10,
        index: 1
      }, // 到家列表分页参数
      isFullLoading: false, // 是否展示全局loading
      isMiniLoadingL: false, // 展示小loading
      isMiniLoadingD: false, // 展示小loading
      pageStatus: 1, // 页面状态1：列表tab；2：到家tab页面；
      shopListL: [], // 猎户商户列表
      shopListD: [], // 到家商户列表
      shopListDRaw: [], // 到家商户列表原始数据
      isGetGeo: false, // 是否正在定位
      isQueryingListL: false, // 是否正在请求猎户列表数据
      isQueryingListD: false, // 是否正在请求到家列表数据
      queryLid: 0, // 请求猎户列表数据id
      queryDid: 0, // 请求京东到家列表数据id
      noMoreDataL: false, // 猎户商户是否还有数据
      noMoreDataD: false, // 到家商户是否还有数据
      noDataL: false, // 猎户商户是否有数据
      noDataD: false, // 到家商户是否有数据
      searchLAble: false, // 是否可以搜索身边优惠商户
      searchDAble: false, // 是否可以搜索京东到家商户
      latLng: {
        latitude: defaultCity.default_lat,
        longitude: defaultCity.default_lng
      }, // 默认坐标
      scrollTopL: 0, // 猎户商户列表滑动距离
      scrollTopD: 0, // 到家商户列表滑动距离
      searchTxt: '', // 搜索的商户名字
      searchLTxt: '', // 身边优惠的搜索文案
      searchDTxt: '', // 京东到家的搜索文案
      confirmedAddressInfo: {
        cityInfo: {
          cityName: '北京',
          defaultLat: '39.908823',
          defaultLng: '116.39747',
          isByLocation: null
        },
        addressInfo: {
          addressTxt: '',
          street: '',
          lat: '39.908823',
          lng: '116.39747'
        }
      }, // 确认的位置信息
      backupDataL: {}, // 身边优惠备份数据
      backupDataD: {} // 京东到家备份数据
    }
  },
  activated () {
  },
  mounted () {
    this.handleSourceData()
    this.scroll()
    this.sendPoint('page')

    this.pageInit()
    this.keyboardFix()
    // this.DoQueryCityList()
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (from.name === 'AddressHome') {
        vm.routerStatus = 1
        if (sessionStorage.getItem('confirmedAddressInfo')) {
          let info = JSON.parse(sessionStorage.getItem('confirmedAddressInfo'))
          vm.confirmedAddressInfo = info
          console.log('从地址页返回')
          vm.queryMerListInit()
          console.log('info.addressTxt:', info.addressInfo.addressTxt)
          if (info && info.addressInfo && !info.addressInfo.addressTxt) {
            vm.doQueryAddressName()
          }
        } else {
          vm.getLatLng()
        }
        if (sessionStorage.getItem('pageStatus')) {
          vm.pageStatus = Number(sessionStorage.getItem('pageStatus'))
        }
      } else {
        console.log('首次进来')
        vm.getLatLng()
      }
    })
  },
  watch: {
    searchLTxtRes: function (nVal, oVal) {
      console.log('oVal:', oVal)
      if (!oVal && nVal.length) {
        console.log('数据备份')
        // liehu备份
        this.shopListBackup('l')
      }
      if (nVal.length) {
        console.log('开始搜索商户:', nVal)
        // this.queryListLInit()
        this.searchListLInit()
      } else {
        console.log('恢复商户')
        this.queryLid++
        this.shopListRecover('l')
      }
    },
    searchDTxtRes: function (val) {
      let searchTxt = val
      if (searchTxt.length) {
        this.searchShop()
      } else {
        this.shopListD = this.shopListDRaw
      }
    },
    shopListD: function (val, old) {
      let length = val.length
      console.log('length:', length)
      if (length < 10 && !this.noMoreDataD) {
        this.queryListD()
      }
    },
    noDataL: function (val) {
      if (this.routerStatus) return
      let lFlag = true
      let dFlag = true
      // 身边优惠没有商户
      if (val && this.queryLid === 1) {
        lFlag = false
      }
      // 京东到家没有商户
      if (this.noDataD === true && this.queryDid === 1) {
        dFlag = false
      }
      // 身边优惠没有商户且京东到家有商户切换到京东到家tab
      if (!lFlag && dFlag) {
        this.pageStatus = 2
      }
    },
    noDataD: function (val) {
      if (this.routerStatus) return
      let lFlag = true
      let dFlag = true
      // 京东到家没有商户
      if (val && this.queryDid === 1) {
        dFlag = false
      }
      // 附近优惠没有商户
      if (this.noDataL && this.queryLid === 1) {
        lFlag = false
      }
      // 身边优惠没有商户且京东到家有商户切换到京东到家tab
      if (!lFlag && dFlag) {
        this.pageStatus = 2
      }
    }
  },
  computed: {
    searchLTxtRes: function () {
      return this.searchLTxt.trim()
    },
    searchDTxtRes: function () {
      return this.searchDTxt.replace(/\s*/g, '')
    }
  },
  methods: {
    // 获取用户经纬度
    async getLatLng () {
      if (getParams('lat') && getParams('lng')) {
        this.confirmedAddressInfo.cityInfo.defaultLat = getParams('lat')
        this.confirmedAddressInfo.cityInfo.defaultLng = getParams('lng')
        this.confirmedAddressInfo.addressInfo.lat = getParams('lat')
        this.confirmedAddressInfo.addressInfo.lng = getParams('lng')
        this.queryMerListInit()
      } else {
        try {
          this.isGetGeo = true
          // let res = await getGeoH5()
          let res = await getLngLat()
          this.isGetGeo = false
          if (res && res.lat && res.lng) {
            this.latLng.latitude = res.lat
            this.latLng.longitude = res.lng
            this.confirmedAddressInfo.cityInfo.defaultLat = res.lat
            this.confirmedAddressInfo.cityInfo.defaultLng = res.lng
            this.confirmedAddressInfo.addressInfo.lat = res.lat
            this.confirmedAddressInfo.addressInfo.lng = res.lng
          } else {
            Toast('未获取到您的位置，请在‘设置’中开启定位功能')
          }
          this.queryMerListInit()
        } catch (err) {
          console.log('err:', err)
          Toast('未获取到您的位置，请在‘设置’中开启定位功能')
          this.isGetGeo = false
          this.queryMerListInit()
        }
      }
      // this.$store.commit('SET_CURRENT_LATLNG', this.latLng)
      this.doQueryAddressName()
    },
    // 经纬度逆解析地理位置
    async doQueryAddressName () {
      let info = this.confirmedAddressInfo.addressInfo
      if (info.address) return
      let reqParams = {
        latitude: info.lat,
        longitude: info.lng
      }
      let res = {}
      try {
        this.isFullLoading = true
        res = await queryAddressName(reqParams)
        this.isFullLoading = false
      } catch (err) {
        this.isFullLoading = false
        Toast(res.resultMsg)
      }
      if (res.resultCode === '0') {
        let data = res.resultData
        let cityInfo = {
          cityName: data.addressComponent.city,
          defaultLat: info.lat,
          defaultLng: info.lng,
          isByLocation: true
        }
        this.confirmedAddressInfo = {
          cityInfo: cityInfo,
          addressInfo: {
            addressTxt: data.address,
            street: data.street_number || data.street || data.district,
            lat: info.lat,
            lng: info.lng
          }
        }
        let tempStr = JSON.stringify(this.confirmedAddressInfo)
        sessionStorage.setItem('confirmedAddressInfo', tempStr)
      }
    },
    // 请求猎户商户列表数据
    async queryListL (status) {
      if ((this.isQueryingListL && !this.searchLTxtRes) || this.noMoreDataL) {
        return false
      }
      console.log('queryListL' + status)
      let lat = this.confirmedAddressInfo.addressInfo.lat
      let lng = this.confirmedAddressInfo.addressInfo.lng
      let reqParams = {
        userLatitude: lat,
        userLongitude: lng,
        latitude: lat,
        longitude: lng,
        radius: this.radius,
        pageIndex: this.lPage.index,
        pageSize: this.lPage.size
      }
      // 查询的文案转码组合
      if (this.searchLTxtRes) {
        let condition = {
          keywords: [this.searchLTxtRes]
        }
        let conditionStr = Base64.encode(JSON.stringify(condition))
        reqParams = Object.assign(reqParams, { queryCondition: conditionStr })
      }
      let res = {}
      this.queryLid++
      const id = this.queryLid
      try {
        if (this.queryLid === 1 && this.pageStatus === 1) {
          this.isFullLoading = true
        }
        this.isQueryingListL = true
        res = await queryLiehuShopList(reqParams)
        this.isQueryingListL = false
        this.isFullLoading = false
      } catch (err) {
        this.isFullLoading = false
        this.isQueryingListL = false
        Toast('稍后再试！')
      }
      if (res.resultCode === '0') {
        this.searchLAble = true
        if (id !== this.queryLid) return
        // 数据请求第一页
        if (this.lPage.index === 1) {
          this.shopListL = res.resultData || []
          if (!res.resultData.length) {
            this.noDataL = true
          }
        } else {
          // this.shopListL.push(res.resultData)
          this.shopListL = [...(this.shopListL), ...(res.resultData)]
        }
        // 根据返回数据 处理状态
        if (res.resultData.length < this.lPage.size) {
          this.noMoreDataL = true
        } else {
          this.lPage.index++
        }
      } else {
        Toast(res.resultMsg)
      }
    },
    // 请求到家商户列表数据
    async queryListD () {
      if (this.isQueryingListD || this.noMoreDataD) {
        return false
      }
      this.isQueryingListD = true
      let lat = this.confirmedAddressInfo.addressInfo.lat
      let lng = this.confirmedAddressInfo.addressInfo.lng
      let reqParams = {
        latitude: lat,
        longitude: lng,
        userLatitude: lat,
        userLongitude: lng,
        pageSize: this.dPage.size,
        pageIndex: this.dPage.index
      }
      let res = {}
      this.queryDid++
      try {
        if (this.queryDid === 1 && this.pageStatus === 2) {
          this.isFullLoading = true
        }
        res = await queryDaojiaShopList(reqParams)
        this.searchDAble = true
        this.isQueryingListD = false
        this.isFullLoading = false
      } catch (err) {
        Toast('服务异常,请稍后再试！')
        this.isQueryingListD = false
        this.isFullLoading = false
      }
      if (this.dPage.index === 1 && (res.resultCode === '0' && !res.resultData.length)) {
        this.noDataD = true
      }
      if (res.resultData && res.resultData.length > 0) {
        let tempList = this.shopListD
        let tempListRaw = this.shopListDRaw
        tempList.push(...res.resultData)
        tempListRaw.push(...res.resultData)
        this.shopListD = tempList
        this.shopListDRaw = tempListRaw
        this.dPage.index++
        // 在搜索中
        if (this.searchDTxtRes) {
          this.searchShop()
        }
      } else {
        Toast('服务异常,请稍后再试！')
      }
      if (res.resultData.length < this.dPage.size) {
        this.noMoreDataD = true
      }
    },
    // 处理配置平台的数据
    handleSourceData () {
      this.judgeTime()
      const data = this.sourceData
      this.enterList = data.enterList
      this.setShareOption()
    },
    pageInit () {
      this.pageBackInit()
    },
    // 查询商户列表
    queryMerListInit () {
      console.log('queryMerListInit')
      this.queryListLInit()
      this.queryListDInit()
    },
    // 查询附近优惠列表初始化
    queryListLInit () {
      console.log('queryListLInit')
      this.noMoreDataL = false
      this.noDataL = false
      this.lPage = {
        index: 1,
        size: 10
      }
      this.shopListL = []
      this.queryListL()
    },
    // 查询京东到家列表初始化
    queryListDInit () {
      this.noMoreDataD = false
      this.noDataD = false
      this.dPage = {
        index: 1,
        size: 10
      }
      this.shopListD = []
    },
    searchListLInit () {
      if (!this.searchLTxtRes) return
      this.queryListLInit()
    },
    // 搜索时将原有数据存储
    shopListBackup (type) {
      // 备份身边优惠数据
      if (type === 'l') {
        this.backupDataL = {
          page: this.lPage,
          list: this.shopListL,
          noMoreData: this.noMoreDataL,
          noData: this.noDataL
        }
      }
    },
    // 取消搜索后数据恢复
    shopListRecover (type) {
      if (type === 'l') {
        this.lPage = this.backupDataL.page
        this.shopListL = this.backupDataL.list
        this.noMoreDataL = this.backupDataL.noMoreData
        this.noDataL = this.backupDataL.noData
        if (!this.backupDataL.list.length) {
          this.queryListLInit()
        }
      }
    },
    pageBackInit () {
      let isAddressChange = this.$store.state.addressChange
      console.log('isAddressChange:', isAddressChange)
      if (!isAddressChange) return
      this.$store.commit('SET_ADDRESSCHANGE', false)
      this.confirmedCityInfo = JSON.parse(sessionStorage.getItem('confirmedCityInfo'))
    },
    searchLFocus () {
      this.sendPoint('searchLFocus')
    },
    searchDFocus () {
      this.sendPoint('searchDFocus')
    },
    // 更换页面tab
    changeTab (status) {
      if (this.pageStatus === status) {
        return false
      }
      if (this.pageStatus === 1) {
        this.scrollTopL = document.body.scrollTop || document.documentElement.scrollTop || 0
      } else if (this.pageStatus === 2) {
        this.scrollTopD = document.body.scrollTop || document.documentElement.scrollTop || 0
      }
      this.pageStatus = status
      if (status === 1) {
        document.body.scrollTop = this.scrollTopL
        document.documentElement.scrollTop = this.scrollTopL
      } else if (status === 2) {
        document.body.scrollTop = this.scrollTopD
        document.documentElement.scrollTop = this.scrollTopD
      }
      this.sendPoint('changTab' + status)
    },
    goChageAddress () {
      sessionStorage.setItem('pageStatus', this.pageStatus)
      this.$router.push({ name: 'AddressHome', query: {} })
      this.sendPoint('changeAddress')
    },
    // 跳转到家地图
    goDaojiaMap () {
      let lat = this.confirmedAddressInfo.addressInfo.lat
      let lng = this.confirmedAddressInfo.addressInfo.lng
      setTimeout(() => {
        location.href = origin + '/activity/2018/location/html/daojiamap.html?lat=' + lat + '&lng=' + lng + '&userLat=' + lat + '&userLng=' + lng
      }, 300)
    },
    // 商户搜索
    searchShop () {
      let str = this.searchDTxtRes
      if (!str.length) {
        return false
      }
      let tempArr = []
      this.shopListD.forEach((item, index) => {
        if (item.storeName.indexOf(str) !== -1) {
          tempArr.push(item)
        }
      })
      this.shopListD = tempArr
      // document.documentElement.scrollTop = 0
      // document.body.scrollTop = 0
    },
    // 取消搜索
    searchCancel () {
      this.shopListD = this.shopListDRaw
      this.searchTxt = ''
      // this.$refs.search_shop.blur()
    },
    // input输入框聚焦
    inputFocus () { },
    inputBlur () {
      // this.searchTxt = ''
    },
    inputTouch () { },
    keyboardFix () {
      let _this = this
      document.addEventListener('touchstart', function (e) {
        _this.$refs.searchL.blur()
        _this.$refs.searchD.blur()
      }, false)
    },
    scroll () {
      window.onscroll = () => {
        // 距离底部100px时加载一次
        let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 10
        let bottomOfWindow1 = document.body.offsetHeight - document.body.scrollTop - window.innerHeight <= 10
        if (bottomOfWindow || bottomOfWindow1) {
          if (this.pageStatus === 1 && !this.noMoreDataL) {
            this.queryListL()
          } else if (this.pageStatus === 2 && !this.noMoreDataD) {
            this.queryListD()
          }
        }
      }
    },
    sendPoint (id, url) {
      window.JPTrack.emit(['liehudaojia', id], url)
    },
    // 页面是否上线下
    judgeTime () {
      const timeNow = new Date().getTime()
      const timeInfo = this.sourceData.pageTime || {}
      const onlineDate = timeInfo.onlineDate
      const onlineLink = timeInfo.onlineLink
      const offlineDate = timeInfo.offlineDate
      const offlineLink = timeInfo.offlineLink
      if (onlineDate && onlineLink) {
        const timeStart = new Date(onlineDate).getTime()
        if (timeStart > timeNow) {
          console.log('未上线')
          location.href = onlineLink + '&timeLine=' + onlineDate
          return false
        }
      }
      if (offlineDate && offlineLink) {
        const timeEnd = new Date(offlineDate).getTime()
        if (timeEnd < timeNow) {
          console.log('已下线')
          location.href = offlineLink
          return false
        }
      }
    },
    setShareOption () {
      const shareData = this.sourceData.share
      let optObj = {
        moreItem: true, // 非必传，Boolean类型，是否隐藏APP内的右上角分享,默认为true
        share_img: shareData.logo, // 分享图标
        share_url: 'https://pb.jd.com/activity/2018/location/html/liehudaojia.html#/home', // 分享链接
        share_title: shareData.title, // 分享标题
        share_subtitle: shareData.desc, // 必传，分享出去的页面副标题(描述)
        channels: ['1', '2', '3', '4', '5'] // 必传，0-微信朋友圈，1-微信好友，2-新浪微博，3-短信，4-QQ好友，5-QQ空间 金融环境微博短信不可用,商城环境短信不可用
      }
      // eslint-disable-next-line
      window.JPFESDK.setShare(optObj)
    }
  }
}
</script>

<style lang="scss" scoped>
$r:100;
.container{
  width: 100%;
  max-width: 750rem/$r;
  margin: 0 auto;
  background: #f7f7f7;
  min-height: 100vh;
  font-size: 12rem/$r;
  color: #333333;
  position: relative;
  .tab-list{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    max-width: 750rem/$r;
    height: 90rem/$r;
    line-height: 90rem/$r;
    display: flex;
    font-size: 32rem/$r;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
    background-color: white;
    z-index: 1;
    .tab-item{
      flex-grow: 1;
      &.selected{
        background: #3366ff;
        color: white;
      }
    }
  }
  // 
  .data-empty{
    height: 400rem/$r;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 169rem/$r;
    }
    .desc{
      color: #666;
      margin-top: 20rem/$r;
    }
    
    
  }
  .main-container{
    padding-top: 90rem/$r;
    .block-public{
      padding-left: 30rem/$r;
      padding-right: 30rem/$r;
    }
    .list-daojia-in{
      // margin-top: 170rem/$r;
    }
    // 主页地址行样式
    .address-line{
      text-align: center;
      font-size: 28rem/$r;
      padding: 16rem/$r 30rem/$r;
      .icon-location{
        display: inline-block;
        width: 23rem/$r;
        height: 28rem/$r;
        background-image: url('//img30.360buyimg.com/jr_image/jfs/t1/23119/20/13045/688/5c9c55b3Ed6af55cd/07eae83dd4898587.png');
        background-size: 100% 100%;
        margin-right: 6rem/$r;
        position: relative;
        top: 2rem/$r;
      }
      .icon-right{
        display: inline-block;
        width: 9rem/$r;
        height: 16rem/$r;
        background-image: url('//img30.360buyimg.com/jr_image/jfs/t1/18917/8/12977/108/5c9c55b3E92e6f1c3/278bd9005bcf633a.png');
        background-size: 100% 100%;
        margin-left: 4rem/$r;
        position: relative;
        top: -1rem/$r;
      }

    }
    // 搜索行样式
    .fake-search{
      width: 100%;
      height: 50rem/$r;
      background: white;
      margin-bottom: 30rem/$r;
      position: relative;
      .icon-search{
        display: inline-block;
        width: 30rem/$r;
        height: 30rem/$r;
        background-image: url('../../../assets/images/bg_search.png');
        background-size: 100% 100%;
        position: absolute;
        top: 10rem/$r;
        left: 15rem/$r;
        margin-right: 10rem/$r;
      }
      input{
        width: 100%;
        height: 100%;
        padding-left: 55rem/$r;
        border: none;
        outline: none;
        font-size: 24rem/$r;
      }
      .search-placeholder{
        font-size: 24rem/$r;
        color: #bbb;
        position: relative;
        top: 3rem/$r;
      }
    }
    // 头部身边优惠特殊样式
    .public-in-liehu{
      text-align: center;
      padding-bottom: 32rem/$r;
      a{
        display: inline-block;
        padding: 0 12rem/$r;
        color: #2C68FF;
        height: 46rem/$r;
        line-height: 46rem/$r;
        border: 1px solid #2C68FF;
        border-radius: 23rem/$r;
        margin-right: 40rem/$r;
        font-size: 24rem/$r;
        &:nth-last-of-type(1){
          margin-right: 0;
        }
      }
    }
  }
  .noMoreData{
    text-align: center;
    height: 60rem/$r;
    line-height: 60rem/$r;
    font-size: 22rem/$r;
    color: #666;
    // background-color: white;
  }
  .loading{
    width: 100%;
    height: 120rem/$r;
    display: flex;
    align-items: center;
    justify-content: center;
    /deep/ .van-loading{
      display: inline-block;
    }
  }
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
  .searchLine{
    position: fixed;
    top: 90rem/$r;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 80rem/$r;
    font-size: 24rem/$r;
    background: #eeeeee;
    padding: 0 20rem/$r;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .searchLine_main{
      flex-grow: 1;
      height: 50rem/$r;
      line-height: 50rem/$r;
      background-color: white;
      border-radius: 25rem/$r;
      color: #bbbbbb;
      display: flex;
      overflow: hidden;
      align-items: center;
      padding-right: 50rem/$r;
      input{
        // width: 100%;
        height: 100%;
        line-height: 100%;
        flex-grow: 1;
        border: none;
        outline: none;
        padding-top: 2rem/$r;
        color: #333333;
      }
      ::-webkit-input-placeholder { 
        color:#dddddd;
        font-size:24rem/$r;
      }
      :-moz-placeholder {
        color:#dddddd;
        font-size:24rem/$r;
      }
      ::-moz-placeholder {
        color:#dddddd;
        font-size:24rem/$r;
      }
      input[type=search]::-webkit-search-cancel-button{
        -webkit-appearance: none;//此处只是去掉默认的小×
      }
      .icon_search{
        margin: 10rem/$r;
        margin-left: 18rem/$r;
        vertical-align: middle;
        flex-grow: 0;
        flex-shrink: 0;
        margin-right: 10rem/$r;
      }
      .search_ph_city{
        position: relative;
        top: 2rem/$r;
      }
    }
    .searchLine_right{
      display: inline-block;
      flex-grow: 0;
      flex-shrink: 0;
      margin-left: 15rem/$r;
      color: #3ea1e6;
      margin-right: 10rem/$r;
    }
    .icon_map{
      width: 38rem/$r;
      height: 35rem/$r;
      background-image: url('../../../assets/images/bg_map.png');
      background-size: 100% 100%;
      margin-left: 10rem/$r;
    }
    .icon_search{
      display: inline-block;
      width: 30rem/$r;
      height: 30rem/$r;
      background-image: url('../../../assets/images/bg_search.png');
      background-size: 100% 100%;
    }
    .icon_cancel{
      display: inline-block;
      width: 30rem/$r;
      height: 30rem/$r;
      background-image: url('//img30.360buyimg.com/jr_image/jfs/t1/33721/19/93/368/5c9c55b2Eac7efd94/09b5c6beaf1e9931.png');
      background-size: 100% 100%;
      margin-right: 10rem/$r;
      position: relative;
      left: 50rem/$r;
    }
  }
  // 猎户板块数据样式
  .list-liehu{
    padding: 0 30rem/$r;
  }
  input[type=search]::-webkit-search-cancel-button{
    -webkit-appearance: none;
    position: relative;
    height: 30rem/$r;
    width: 30rem/$r;
    background-image: url('//img30.360buyimg.com/jr_image/jfs/t1/33721/19/93/368/5c9c55b2Eac7efd94/09b5c6beaf1e9931.png');
    background-size: 100% 100%;
  }
}

</style>
