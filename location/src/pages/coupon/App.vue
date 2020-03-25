<template>
  <div class="coupon-detail">
    <div class="main">
      <div class="coupon-bg">
        <div class="coupon-main">
          <div class="coupon-amount">
            <span class="amount-num">5</span>
            <span class="amount-sign">元</span>
          </div>
          <span class="coupon-limit">满6元使用</span>
        </div>
      </div>
    </div>
    <div class="btn-line">
      <button class="btn">立即领取</button>
    </div>
    <ul class="info-list">
      <li class="info-item">
        <div class="item-title">使用有效日期</div>
        <div class="item-content">2018/11/30-2019/1/31</div>
      </li>
      <li class="info-item">
        <div class="item-title">详细说明</div>
        <div class="item-content">是用京东闪付、京东码支付在北京地区好邻居北京地 区好，邻居北京地区好邻是用京东闪付、京东码支付</div>
      </li>
      <li class="info-item">
        <div class="item-title">使用有效日期</div>
        <div class="item-content">2018/11/30-2019/1/31</div>
      </li>
      <li class="info-item">
        <div class="item-title">详细说明</div>
        <div class="item-content">是用京东闪付、京东码支付在北京地区好邻居北京地 区好，邻居北京地区好邻是用京东闪付、京东码支付</div>
      </li>
      <li class="info-item">
        <div class="item-title">使用有效日期</div>
        <div class="item-content">2018/11/30-2019/1/31</div>
      </li>
      <li class="info-item">
        <div class="item-title">详细说明</div>
        <div class="item-content">是用京东闪付、京东码支付在北京地区好邻居北京地 区好，邻居北京地区好邻是用京东闪付、京东码支付</div>
      </li>
      <li class="info-item">
        <div class="item-title">使用有效日期</div>
        <div class="item-content">2018/11/30-2019/1/31</div>
      </li>
      <li class="info-item">
        <div class="item-title">详细说明</div>
        <div class="item-content">是用京东闪付、京东码支付在北京地区好邻居北京地 区好，邻居北京地区好邻是用京东闪付、京东码支付</div>
      </li>
      <li class="info-item">
        <div class="item-title">使用有效日期</div>
        <div class="item-content">2018/11/30-2019/1/31</div>
      </li>
      <li class="info-item">
        <div class="item-title">详细说明</div>
        <div class="item-content">是用京东闪付、京东码支付在北京地区好邻居北京地 区好，邻居北京地区好邻是用京东闪付、京东码支付</div>
      </li>
    </ul>
    <div class="rule-line">
      <span class="rule-btn" @click="showRule">活动规则</span>
    </div>

    <div class="dialog" v-if="isShowRuleDialog">
      <div class="mask"></div>
      <transition name="scale1">
        <!-- <div :class="['dialog-content', {show : isShowRule}]"> -->
        <div class="dialog-content" v-if="isShowRule">
          <img
            src="//storage.360buyimg.com/commons/close-btn.png"
            class="rule-close"
            @click="closeRule"
          >
          <div class="rule-title">活动规则</div>
          <div :class="['rule-content']">
            <div class="wrapper">
              <ul class="rule-list">
                <li class="rule-item" v-for="(item, index) in couponRule" :key="index">{{item}}</li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { couponRule } from '../../data/couponRule.js'
import { apiTest } from '../../api/service.js'
export default {
  name: '',
  components: {},
  data () {
    return {
      couponRule,
      isShowRuleDialog: false, // 是否展示活动规则
      isShowRule: false // 是否展示活动规则
    }
  },
  created () { },
  mounted () {
    this.pageInit()
    this.doApiTest()
  },
  methods: {
    async doApiTest () {
      let reqParams = {
        latitude: '39.7837551883',
        longitude: '116.5623525768',
        storeCode: 'Y201804137440130217'
      }
      let res = null
      try {
        res = await apiTest(reqParams)
        console.log(res)
      } catch (err) {
        console.log('err:', err)
      }
    },
    // 弹窗的显示和关闭  
    showRule () {
      this.isShowRuleDialog = true
      setTimeout(() => {
        this.isShowRule = true
        this.$nextTick(() => {
          this.ruleScrollInit()
        })
      }, 10)
    },
    closeRule () {
      this.isShowRule = false
      setTimeout(() => {
        this.isShowRuleDialog = false
      }, 400)
    },
    // 初始化页面 初始化活动规则弹窗scroll
    pageInit () {

    },
    ruleScrollInit () {
      const wrapper = document.querySelector('.wrapper')
      const scroll = new BScroll(wrapper)
      console.log(scroll)
    }
  }
}
</script>

<style lang='scss' scoped>
$r:100;
.coupon-detail{
  background-color: white;
  min-height: 100vh;
  width: 100vw;
  padding-top: 140rem/$r;
  padding-bottom: 40rem/$r;
  font-size: 20rem/$r;
  // 券的主要信息
  .main{
    margin: 0 auto;
    .coupon-bg{
      width: 740rem/$r;
      height: 430rem/$r;
      background-image: url('./bg_coupon.png');
      background-size: 100% 100%;
      position: relative;
      .coupon-main{
        width: 510rem/$r;
        height: 300rem/$r;
        position: absolute;
        top: 0;
        right: 73rem/$r;
        color: white;
        text-align: center;
        padding-top: 40rem/$r;
        .coupon-amount{
          font-weight: bold;
          text-shadow: 0 3px 2px #5e5ee6;
          display: flex;
          justify-content: center;
          align-items: center;
          .amount-num{
            font-size: 140rem/$r;
          }
          .amount-sign{
            font-size: 115rem/$r;
          }
        }
        .coupon-limit{
          font-size: 34rem/$r;
          &::after{
            content: "";
            display: inline-block;
            width: 60rem/$r;
            height: 2rem/$r;
            background-color: white;
            margin-left: 20rem/$r;
            position: relative;
            top: -12rem/$r;
          }
          &::before{
            content: "";
            display: inline-block;
            width: 60rem/$r;
            height: 2rem/$r;
            background-color: white;
            margin-right: 20rem/$r;
            position: relative;
            top: -12rem/$r;
          }
        }
      }
    }
  }
  // 领奖使用按钮
  .btn-line{
    text-align: center;
    .btn{
      width: 280rem/$r;
      height: 80rem/$r;
      outline: none;
      border: none;
      background-color: #2c68ff;
      border-radius: 40rem/$r;
      color: white;
      font-size: 30rem/$r;
      box-shadow: 0 2px 0 0 #235be6;
    }
  }
  // 券的信息列表
  .info-list{
    width: 100%;
    padding: 0 70rem/$r 0 50rem/$r;
    margin-top: 80rem/$r;
    .info-item{
      margin-top: 40rem/$r;
      .item-title{
        font-size: 30rem/$r;
        color: #333;
         &::before{
          content: "";
          display: inline-block;
          width: 16rem/$r;
          height: 16rem/$r;
          background-image: url('./icon_item.png');
          background-size: 100% 100%;
          margin-right: 15rem/$r;
        }
      }
      .item-content{
        font-size: 24rem/$r;
        color: #666;
        padding-left: 30rem/$r;
        margin-top: 10rem/$r;
      }
     
    }
  }
  .rule-line{
    margin-top: 120rem/$r;
    text-align: center;
    .rule-btn{
      font-size: 24rem/$r;
      color: #2c68ff;
      text-decoration: underline;
    }
  }
  // 活动规则弹窗
  .dialog{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .mask{
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
    }
    .dialog-content{
      width: 80%;
      height: 80%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 5px;
      padding: 20rem/$r;
      color: #333;
      overflow: hidden;
      padding-bottom: 60rem/$r;
      .rule-close{
        display: inline-block;
        width: 44rem/$r;
        height: 44rem/$r;
        position: absolute;
        right: 20rem/$r;
        top: 20rem/$r;
      }
      .rule-title{
        width: 100%;
        text-align: center;
        font-size: 32rem/$r;
        z-index: 10;
      }
      .rule-content{
        height: 100%;
        width: 100%;
        padding-top: 10rem/$r;
      }
      .wrapper{
        height: 100%;
        // padding-top: 44rem/$r;
        overflow: hidden;
      }
      .rule-list{
        .rule-item{
          font-size: 24rem/$r;
        }
      }
    }
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .scale1-enter-active {
    animation: bounce-in .4s;
  }
  .scale1-leave-active {
    animation: bounce-in .4s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform:  translate(-50%, -50%) scale(0);
    }
    100% {
      transform:  translate(-50%, -50%) scale(1);
    }
  }
}
</style>
