<template>
  <li :class="['item', 'coupon' ]">
    <span class="left" v-if="info.mktActType === '1' || info.mktActType === '2'">
      <span class="coupon-sign">￥</span>
      <span class="coupon-amount">{{info.prizeAmount}}</span>
    </span>
    <div class="left lottery" v-else></div>
    <span class="middle">
      <div
        class="coupon-name"
        v-if="info.mktActType === '1' || info.mktActType === '2'"
      >{{info.prizeName}}</div>
      <div class="coupon-name" v-else>红包</div>
      <div class="coupon-limit">{{info.prizeDesc}}</div>
    </span>
    <span class="right">
      <button v-if="info.operation === 1" @click="dogetCouponLottery(info.entranceId)">领取</button>
      <button v-else @click="lookCoupon(info.useUrl)">查看</button>
      <div class="coupon-percent">剩余{{percent}}%</div>
    </span>
  </li>
</template>

<script>
import { Toast } from 'vant'
import { getCouponLottery } from '../../api/service.js'
export default {
  name: '',
  props: {
    info: {
      type: Object,
      default: function () {
        return {}
      }
    },
    type: {
      type: String,
      default: ''
    },
    storeCode: {
      type: String,
      default: ''
    },
    latLng: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  components: {},
  data () {
    return {
      // latLng: {}
    }
  },
  computed: {
    percent () {
      let total = this.info.payCountLimit + this.info.payCount
      let rest = this.info.payCountLimit
      let per = (rest * 100) / total
      if (per > 100) {
        per = 100
      } else if (per > 99 && per < 100) {
        per = 99
      } else if (per > 0 && per < 1) {
        per = 1
      }
      return per.toFixed(0)
    }
  },
  created () { },
  mounted () {
    // this.getLatLng()
  },
  methods: {
    async dogetCouponLottery (id) {
      let addressInfo = this.latLng
      let reqParams = {
        storeCode: this.storeCode,
        latitude: addressInfo.lat,
        longitude: addressInfo.lng,
        entranceId: id,
        site: '1',
        fromS: ''
      }
      console.log('getCoupon reqParams', reqParams)
      let res = {}
      try {
        // eslint-disable-next-line
        const toast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner'
        })
        res = await getCouponLottery(reqParams)
        console.log(res)
        Toast.clear()
      } catch (err) {
        Toast.clear()
        Toast(res.data || '领奖异常请稍后再试！')
      }
      if (res.resultCode === '0') {
        this.info.operation = 2
        this.info.payCount++
        if (this.info.mktActType === '3') {
          this.info.mktActType = '2'
          this.info.prizeAmount = res.resultData.prizeAmount
          this.info.prizeName = res.resultData.prizeName
          this.info.prizeDesc = res.resultData.prizeDesc
        }
        this.$emit('sendPoint', 'getLotterySucc')
      } else {
        this.$emit('sendPoint', 'getLotteryError')
        Toast(res.resultMsg)
      }
      this.$emit('sendPoint', 'getLottery')
    },
    getLatLng () {
      let addressInfoStr = sessionStorage.getItem('confirmedAddressInfo')
      let addressInfo = JSON.parse(addressInfoStr)
      this.latLng.lat = addressInfo.addressInfo.lat
      this.latLng.lng = addressInfo.addressInfo.lng
    },
    lookCoupon (url) {
      location.href = url
    }
  }
}
</script>

<style lang='scss' scoped>
$r:100;
.item{
  display: flex;
  justify-content: space-between;
  padding: 30rem/$r;
  border-top: 1px solid #f7f7f7;
  background-color: white;
  .left{
    width: 148rem/$r;
    height: 76rem/$r;
    color: #fb4920;
    flex-shrink: 0;
    flex-grow: 0;
    text-align: center;
  }
  .middle{
    flex-grow: 1;
    .coupon-name{
      font-size: 30rem/$r;
      color: #333;
    }
    .coupon-limit{
      font-size: 24rem/$r;
      color: #999;
    }
  }
  .right{
    flex-shrink: 0;
    flex-grow: 0;
    width: 110rem/$r;
    button{
      background-color: #3366ff;
      width: 110rem/$r;
      height: 46rem/$r;
      border-radius: 23rem/$r;
      border: none;
      outline: none;
      color: white;
    }
    .coupon-percent{
      text-align: center;
      color: #999;
      font-size: 20rem/$r;
    }
  }
  // 券的样式
  &.coupon{
    .left{
      letter-spacing: -3px;
      padding-top: 8rem/$r;
      position: relative;
      left: -10rem/$r;
      .coupon-sign{
        font-size: 36rem/$r;
      }
      .coupon-amount{
        font-size: 60rem/$r;
      }
    }
  }
  .left{
    &.lottery{
      background: url('//img30.360buyimg.com/jr_image/jfs/t1/25586/7/12873/3664/5c9c55b3Efb8efecb/c93b7a8061b92160.png') center center no-repeat;
      background-size: 68rem/$r 66rem/$r;
    }
  }
}
</style>
