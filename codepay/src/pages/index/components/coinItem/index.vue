<template>
  <li class="coin-item">
    <div class="item-top">
      <img
        :src="info.imageUrl"
        class="coupon"
      >
      <img
        v-if="info.ext2"
        :src="info.ext2"
        class="icon"
      >
    </div>
    <div class="item-bottom">
      <span class="amount">{{info.amount}}</span>
      <button
        v-if="excgStatusMap[info.exchangeStatus]"
        @click="excgCoupon(info.exchangeStatus)"
        :class="[{'red': info.exchangeStatus === 1}]"
      >{{excgStatusMap[info.exchangeStatus]}}</button>
      <button v-else>已抢光</button>
    </div>
  </li>
</template>

<script>
export default {
  name: '',
  props: {
    info: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  components: {},
  data () {
    return {
      excgStatusMap: {
        0: '已兑换', // 自定义的
        1: '立即兑换',
        3: '已抢光',
        4: '等级不足'
      }
    }
  },
  watch: {},
  filters: {},
  created () { },
  mounted () { },
  methods: {
    excgCoupon (status) {
      if (status !== 1) return false
      this.$emit('excgCoupon', this.info)
    }
  }
}
</script>

<style lang='scss' scoped>
$r:100;
.coin-item{
  display: inline-block;
  margin: 0 15rem/$r;
  width: 256rem/$r;
  .item-top{
    width: 100%;
    position: relative;
    .coupon{
      width: 100%;
    }
    .icon{
      position: absolute;
      left: -24rem/$r;
      top: -26rem/$r;
      width: 59rem/$r;
    }
  }
  .item-bottom{
    display: flex;
    justify-content: center;
    margin-top: 16rem/$r;
    .amount{
      color: #ef5252;
      margin-right: 20rem/$r;
      font-size: 24rem/$r;
      line-height: 36rem/$r;
      &::before{
        content: '';
        display: inline-block;
        width: 24rem/$r;
        height: 24rem/$r;
        background-image: url('../../assets/images1/icon_coin.png');
        background-size: 100% 100%;
        margin-right: 4rem/$r;
        vertical-align: text-top;
      }
    }
    button{
      border: none;
      outline: none;
      width: 110rem/$r;
      height: 36rem/$r;
      color: white;
      background-color: #d2d2d2;
      font-size: 20rem/$r;
      &.red{
        background-color: #ef5252;
      }
      border-radius: 18rem/$r;
    }
  }
}
</style>
