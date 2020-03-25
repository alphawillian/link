<template>
  <!-- 特定商户的商户列表item只有logo、商户名和距离 刘泽的好利来提的需求 -->
  <li class="shop-item">
    <div class="shop-main" @click="goShop">
      <i class="shop-top" v-if="info.top"></i>
      <span class="shop-logo">
        <span class="shop-logo-inner">
          <img :src="info.logoAddress" alt />
        </span>
      </span>
      <span class="shop-info">
        <div class="shop-name">{{info.realName}}</div>
        <div class="shop-distance">{{info.distance}} {{info.distanceUnit}}</div>
      </span>
    </div>
    <ul class="coupon-packet" v-if="info.preferenceActivities && info.preferenceActivities.length">
      <coupon-item
        v-for="(item, index) in info.preferenceActivities"
        :key="index"
        :info="item"
        :latLng="latLng"
        :storeCode="info.storeCode"
        @sendPoint="sendPoint"
      />
    </ul>
  </li>
</template>

<script>
import CouponItem from '../couponItem'
export default {
  name: '',
  props: {
    info: {
      type: Object,
      default: function () {
        return {}
      }
    },
    addressInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  components: {
    CouponItem
  },
  data () {
    return {
      latLng: {},
      isIos: false,
      payWayMaps: {
        '0': '京东支付',
        '1': '京东码支付',
        '2': '京东闪付'
      }
    }
  },
  filter: {},
  created () { },
  mounted () {
    this.setLatLng()
    this.device()
  },
  methods: {
    setLatLng () {
      let addressInfo = this.addressInfo
      let lat = Number(addressInfo.lat)
      let lng = Number(addressInfo.lng)
      this.latLng = {
        lat: lat,
        lng: lng
      }
    },
    device () {
      let u = window.navigator.userAgent
      let isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      this.isIos = isIos
    },
    goShop () {
      let protocol = location.protocol
      let domain = location.host
      let lat = this.latLng.lat
      let lng = this.latLng.lng
      let storeCode = this.info.storeCode
      let paramsStr = '?storeCode=' + storeCode + '&lat=' + lat + '&lng=' + lng
      let url = protocol + '//' + domain + '/activity/2018/location/html/map.html' + paramsStr
      // this.$emit('sendPoint', 'liehuMap', url)
      this.sendPoint('liehuMap', url)
    },
    isShowNearby (num, unit) {
      if (unit === 'm') {
        let distance = Number(num)
        if (distance < 100) {
          return true
        } else {
          return false
        }
      }
    },
    sendPoint (key, url) {
      this.$emit('sendPoint', key, url)
    }
  }
}
</script>

<style lang='scss' scoped>
$r:100;
.shop-item{
  background: white;
  font-size: 20rem/$r;
  margin-bottom: 20rem/$r;
  box-shadow: 0 0 6px 2px #efefef;
  &:nth-last-of-type(1) {
    margin-bottom: 0;
  }
  // 商户主要信息
  .shop-main{
    padding: 30rem/$r;
    display: flex;
    display: -webkit-flex;
    position: relative;
    .shop-top{
      display: inline-block;
      width: 86rem/$r;
      height: 86rem/$r;
      background-image: url('//img30.360buyimg.com/jr_image/jfs/t1/22165/33/12965/1769/5c9c55b3Ef90557c6/0ec92de79fdc6d22.png');
      background-size: 100%;
      position: absolute;
      right: -8rem/$r;
      top: -8rem/$r;
    }
    // logo图样式
    .shop-logo{
      flex-shrink: 0;
      flex-grow: 0;
      display: inline-block;
      width: 150rem/$r;
      height: 112rem/$r;
      padding: 4rem/$r;
      border: 1px solid #f7f7f7;
      margin-right: 16rem/$r;
      .shop-logo-inner{
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
        img{
          max-width: 100%;
          max-height: 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      
    }
    // 商户信息
    .shop-info{
      flex-shrink: 0;
      flex-grow: 1;
      max-width: 470rem/$r;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      .shop-name{
        font-size: 30rem/$r;
        color: #333;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }
      // 商户距离
      .shop-distance{
        font-size: 20rem/$r;
        color: #999;
        flex-shrink: 0;
        margin-left: 6rem/$r;
      }
    }
  }
  // 券-红包的样式
  .coupon-packet{}
}
</style>
