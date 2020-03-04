<template>
  <li class="item packet">
    <span class="left">
      <!-- <span class="coupon-sign">￥</span>
      <span class="coupon-amount">56</span> -->
    </span>
    <span class="middle">
      <div class="coupon-name">京东支付券</div>
      <div class="coupon-limit">满6元可用</div>
    </span>
    <span class="right">
      <button v-if="!hasGet">领取</button>
      <button
        v-else
        class="hasGet"
      >已领取</button>
      <div class="coupon-percent">剩余30%</div>
    </span>
  </li>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      hasGet: false
    }
  },
  created () { },
  mounted () { },
  methods: {}
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
    width: 120rem/$r;
    height: 76rem/$r;
    color: #fb4920;
    flex-shrink: 0;
    flex-grow: 0;
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
      &.hasGet{
        background-color: #b2b2b2;
      }
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
      letter-spacing: -1px;
      padding-top: 8rem/$r;
      .coupon-sign{
        font-size: 36rem/$r;
      }
      .coupon-amount{
        font-size: 60rem/$r;
      }
    }
  }
  &.packet{
    .left{
      background: url('./icon_redPacket.png') left center no-repeat;
      background-size: 68rem/$r 66rem/$r;
    }
  }
}
</style>
