<template>
  <div class="shop_item" @click="href(info.storeUrl)">
    <div class="shop_left">
      <img :src="info.storeLogo" alt srcset />
    </div>
    <div class="shop_main">
      <div class="info_line name_line">
        <span class="shop_name">{{info.storeName}}</span>
        <span class="distance_nearest" v-if="info.distance === '0m' || info.distance === '0km'">离你最近</span>
        <span class="distance" v-else>
          <span>{{info.distance}}</span>
        </span>
      </div>
      <div class="info_line carrier_line">
        <span class="shop_support">{{info.freightWords}}</span>
        <span class="shop_carrier">{{info.carrierType}}</span>
      </div>
      <template v-for="(item, index) in info.tags">
        <div class="shop_benefit" v-if="index < 2" :key="index">
          <span class="benefit_qiang" v-if="index === 0">{{item.iconText}}</span>
          <span class="benefit_cu" v-else-if="index === 1">{{item.iconText}}</span>
          {{item.words}}
        </div>
      </template>
    </div>
  </div>
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
    return {}
  },
  filters: {},
  created () { },
  mounted () { },
  methods: {
    href (url) {
      console.log(url)
      this.$emit('sendPoint', 'daojiaDetail', url)
      // setTimeout(function () {
      //   location.href = url
      // }, 300)
    }
  }
}
</script>

<style lang='scss' scoped>
$r:100;
.shop_item{
  display: flex;
  width: 100%;
  // height: 240rem/$r;
  background: white;
  border-bottom: 1px solid #f5f5f5;
  padding: 30rem/$r 40rem/$r 20rem/$r 30rem/$r;
  justify-content: space-between;
  font-size: 0;
  .shop_left{
    width: 130rem/$r;
    height: 110rem/$r;
    flex-shrink: 0;
    background: white;
    display: flex;
    // align-items: center;
    justify-content: center;
    margin-right: 20rem/$r;
    img{
      width: 110rem/$r;
      max-height: 110rem/$r;
    }
  }
  .shop_main{
    font-size: 20rem/$r;
    color: #999999;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .info_line{
      display: flex;
      justify-content: space-between;
      align-items: center;
      &.carrier_line{
        margin-top: 10rem/$r;
      }
      .distance_nearest{
        flex-grow: 0;
        flex-shrink: 0; 
        width: 100rem/$r;
        height: 30rem/$r;
        line-height: 30rem/$r;
        border: 1px solid #e2231a;
        border-radius: 3px;
        text-align: center;
        box-sizing: content-box;
        color: #e2231a;
      }
      .distance{
        flex-grow: 0;
        flex-shrink: 0;
        font-size: 24rem/$r;
        color: #333333;
      }
      .shop_support{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .shop_carrier{
        flex-grow: 0;
        flex-shrink: 0;
        color: #319fd2;
      }
    }
    .shop_name{
      font-size: 28rem/$r;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .shop_benefit{
      height: 32rem/$r;
      line-height: 32rem/$r;
      font-size: 24rem/$r;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-top: 16rem/$r;
      .benefit_qiang{
        display: inline-block;
        padding: 0 4rem/$r;
        height: 32rem/$r;
        line-height: 34rem/$r;
        text-align: center;
        color: white;
        margin-right: 10rem/$r;
        font-size: 20rem/$r;
        background-color: #319fd2;
      }
      .benefit_cu{
        display: inline-block;
         padding: 0 4rem/$r;
        height: 32rem/$r;
        line-height: 34rem/$r;
        text-align: center;
        color: white;
        margin-right: 10rem/$r;
        font-size: 20rem/$r;
        background-color: #ff8a00;
      }
    }
  }
}
</style>
