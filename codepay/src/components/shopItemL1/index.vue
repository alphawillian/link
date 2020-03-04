<template>
  <li class="shop-item">
    <div class="shop-main">
      <i class="shop-top"></i>
      <span class="shop-logo">
        <span class="shop-logo-inner">
          <img
            src="./tihuan_shopLogo1.png"
            alt=""
          >
        </span>
      </span>
      <span class="shop-info">
        <div class="shop-name">永辉超市永辉超市永辉超市永辉超市(京东大厦店)</div>
        <div class="shop-line2">
          <span class="shop-pay">
            <span class="spt-key">支持</span>
            <span class="spt-item">京东付款码</span>
            <span class="spt-item">京东闪付</span>
          </span>
          <span
            class="shop-distance nearby"
            v-if="false"
          >离你最近</span>
          <span
            class="shop-distance range"
            v-else
          >5km</span>
        </div>
      </span>
    </div>
    <ul class="coupon-packet">
      <coupon-item />
      <coupon-item />
      <coupon-item />
    </ul>
  </li>
</template>

<script>
import CouponItem from '../couponItem'
export default {
  name: '',
  components: {
    CouponItem
  },
  data () {
    return {}
  },
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style lang='scss' scoped>
$r:100;
.shop-item{
  background: white;
  font-size: 14rem/$r;
  margin-bottom: 20rem/$r;
  box-shadow: 0 0 6px 2px #efefef;
  // 商户主要信息
  .shop-main{
    padding: 30rem/$r;
    display: flex;
    position: relative;
    .shop-top{
      display: inline-block;
      width: 86rem/$r;
      height: 86rem/$r;
      background-image: url('./icon_tuijian.png');
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
      border: 1px solid #f7f7f7;
      padding: 8rem/$r;
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
      max-width: 540rem/$r;
      .shop-name{
        font-size: 30rem/$r;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      // 商户的支付方式及距离
      .shop-line2{
        display: flex;
        justify-content: space-between;
        margin-top: 14rem/$r;
        .shop-pay{
          display: flex;
          .spt-key{
            color: #999;
          }
          .spt-item{
            background-color: #fffeee;
            color: #fcb825;
            border: 1px solid #fcb825;
            border-radius: 3px;
            padding: 0 2px;
            margin-left: 10rem/$r;
          }
        }
        // 商户距离
        .shop-distance{
          &.nearby{
            color: #2c68ff;
            border: 1px solid #2c68ff;
            border-radius: 3px;
            padding: 0 2px;
          }
          &.range{
            color: #999;
          }
        }
      }
    }
  }
  // 券-红包的样式
  .coupon-packet{}
}
</style>
