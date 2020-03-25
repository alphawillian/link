<template>
  <div class="container" ref="container">
    <div class="fullLoading" v-if="isGetGeo || isFullLoading">
      <Loading type="spinner" />
    </div>
    <div class="tab-list">
      <div :class="['tab-item', 'selected']">附近商户</div>
    </div>
    <div class="main-container">
      <div class="block-public">
        <div class="address-line" @click="goChageAddress">
          <i class="icon-location"></i>
          <span class="address-txt">{{confirmedAddressInfo.addressInfo.addressTxt || '暂未获取位置信息'}}</span>
          <i class="icon-right"></i>
        </div>

        <div class="public-in-liehu">
          <a
            href="javascript:;"
            @click="sendPoint('myCoupon', '//m.jr.jd.com/mjractivity/rn/coupon-rn/index.html?RN=coupon-rn')"
          >我的优惠券</a>
        </div>
      </div>
      <div class="block-liehu">
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
          <div class="desc">您附近暂无优惠商户~</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { Toast, Loading } from 'vant'
import { Base64 } from 'js-base64';
import ShopItemL from '../../../components/shopItemL2'
import { queryAddressName, queryLiehuShopList } from '../../../api/service'
import { defaultCity } from '../../../data/cityInfo.js'
import { getParams, getLngLat } from '../../../utils/utils.js'
export default {
  name: '',
  components: {
    Loading,
    ShopItemL
  },
  data () {
    return {
      simpleCodes: getParams('simplecodes'), // 商户简码
      routerStatus: 0, // 路由状态：0:首次进入页面或刷新;1:从地址选择页返回
      radius: 30000, // 猎户商户请求半径30km
      lPage: {
        size: 10,
        index: 1
      }, // 附近优惠列表分页参数
      isFullLoading: false, // 是否展示全局loading
      isMiniLoadingL: false, // 展示小loading
      shopListL: [], // 猎户商户列表
      isGetGeo: false, // 是否正在定位
      isQueryingListL: false, // 是否正在请求猎户列表数据
      queryLid: 0, // 请求猎户列表数据id
      noMoreDataL: false, // 猎户商户是否还有数据
      noDataL: false, // 猎户商户是否有数据
      latLng: {
        latitude: defaultCity.default_lat,
        longitude: defaultCity.default_lng
      }, // 默认坐标
      searchTxt: '', // 搜索的商户名字
      searchLTxt: '', // 身边优惠的搜索文案
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
      } // 确认的位置信息
    }
  },
  activated () {
  },
  mounted () {
    this.scroll()
    this.sendPoint('page')
    this.setShareOption()
    this.pageInit()
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
      } else {
        console.log('首次进来')
        vm.getLatLng()
      }
    })
  },
  watch: {

  },
  computed: {
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
      if (this.isQueryingListL || this.noMoreDataL) {
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
      if (this.simpleCodes) {
        let condition = {
          simpleCodes: this.simpleCodes
        }
        let conditionStr = Base64.encode(JSON.stringify(condition))
        reqParams = Object.assign(reqParams, { queryCondition: conditionStr })
      }
      let res = {}
      this.queryLid++
      const id = this.queryLid
      try {
        if (this.queryLid === 1) {
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
    pageInit () {
      this.pageBackInit()
    },
    // 查询商户列表
    queryMerListInit () {
      console.log('queryMerListInit')
      this.queryListLInit()
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
    pageBackInit () {
      let isAddressChange = this.$store.state.addressChange
      console.log('isAddressChange:', isAddressChange)
      if (!isAddressChange) return
      this.$store.commit('SET_ADDRESSCHANGE', false)
      this.confirmedCityInfo = JSON.parse(sessionStorage.getItem('confirmedCityInfo'))
    },
    goChageAddress () {
      this.$router.push({ name: 'AddressHome', query: {} })
      this.sendPoint('changeAddress')
    },
    scroll () {
      window.onscroll = () => {
        // 距离底部100px时加载一次
        let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 10
        let bottomOfWindow1 = document.body.offsetHeight - document.body.scrollTop - window.innerHeight <= 10
        if (bottomOfWindow || bottomOfWindow1) {
          if (!this.noMoreDataL) {
            this.queryListL()
          }
        }
      }
    },
    sendPoint (id, url) {
      window.JPTrack.emit(['liehu', id], url)
    },
    setShareOption () {
      let optObj = {
        moreItem: true, // 非必传，Boolean类型，是否隐藏APP内的右上角分享,默认为true
        share_title: '身边优惠', // 分享标题
        share_subtitle: '立刻戳我，发现更多身边优惠！', // 分享描述
        share_url: 'https://pb.jd.com/activity/2018/location/html/liehudaojia.html#/liehu', // 分享链接
        share_img: 'https://img30.360buyimg.com/jr_image/jfs/t16885/160/96786978/4628/8a691c3/5a5c760aN03e549ec.jpg', // 分享图标
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
  // 猎户板块数据样式
  .list-liehu{
    padding: 0 30rem/$r;
  }
}

</style>
