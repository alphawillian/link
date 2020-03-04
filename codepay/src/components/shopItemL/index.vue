<template>
  <li class="shop_item" @click="href(info.storeCode)">
    <span class="img">
      <img :src="info.logoAddress" v-if="info.logoAddress">
      <img :src="defaultLogo" v-else>
    </span>
    <span class="txt">
      <div class="line1">
        <span class="name">
            <span class="name_txt">{{info.realName}}</span>
            <span class="crown" v-if="info.top"></span>
        </span>
          <span class="nearby" v-if="( info.distanceUnit === 'm' && Number(info.distance) < 100 )"><span>离你最近</span></span>
          <span class="distance" v-else><span class="distance_num">{{info.distance}}</span><span class="distance_unit">{{info.distanceUnit}}</span></span>
      </div>
      <div class="line2">
        <span class="support_desc">支持</span>
        <span class="support_list">
          <template v-for="(item, index) in info.payWays">
            <span class="item"  v-if="item === '0'" :key="index">京东支付</span>
            <span class="item" v-else-if="item === '1'" :key="index">京东付款码</span>
            <span class="item" v-else-if="item === '2'" :key="index">京东闪付</span>
            <span class="item" v-else :key="index">京东支付</span>
          </template>
        </span>
      </div>
      <div class="line3 benefit_list">
        <span class="item" v-for="(item, index) in info.preferenceActivities" :key="index">{{item.copyWriter}}</span>
      </div>
    </span>
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
      defaultLogo: '//img30.360buyimg.com/jr_image/jfs/t27895/33/1223981629/2100/7981a91/5bc42b87N8d998606.jpg'
    }
  },
  filters: {},
  created () {},
  mounted () {},
  methods: {
    href (storecode) {
      this.$emit('sendPoint', 'liehuDetail')
      setTimeout(function() {
        location.href = '//pb.jd.com/lbs/html/index.html?storecode=' + storecode
      }, 300)
    }
  }
}
</script>

<style lang='scss' scoped>
$r:100;
.shop_item{
  width: 100%;
  height: 190rem/$r;
  background: white;
  display: -webkit-box;     
  display: -webkit-flex;     
  display: -ms-flexbox;     
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: 1px solid #e4e5e4;
  padding: 0 30rem/$r;
  .img{
    width: 130rem/$r;
    height: 130rem/$r;
    flex-grow: 0;
    flex-shrink: 0;
    background-color: white;
    display: -webkit-box;     
    display: -webkit-flex;     
    display: -ms-flexbox;     
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: center;
    margin-right: 10rem/$r;
    img{
      width: 110rem/$r;
    }
  }
  .txt {
    font-size: 20rem/$r;
    .line1{
      display: inline-block;
      width: 550rem/$r;
      color: #333333;
      display: -webkit-box;     
      display: -webkit-flex;     
      display: -ms-flexbox;     
      display: flex;
      justify-content: space-between;
      .name{
        font-weight: bold;
        font-size: 28rem/$r;    
        display: flex;
        max-width: 450rem/$r;
        align-items: baseline;
        .name_txt{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 32rem/$r;
          line-height: 32rem/$r;
        }
      }
      .crown{
        display: inline-block;
        width: 40rem/$r;
        height: 32rem/$r;
        flex-grow: 0;
        flex-shrink: 0;
        background-image: url('../../assets/images/icon_crown.png');
        background-size: 100% 100%;
        margin: 0 20rem/$r 0 6rem/$r;
        position: relative;
        top: 6rem/$r;
      }
      .distance{
        display: inline-block;
        width: 100rem/$r;
        flex-grow: 0;
        flex-shrink: 0;
        font-size: 24rem/$r;
        text-align: right;
        .distance_num{
          vertical-align: sub;
          margin-right: 10rem/$r;
        }
        .distance_unit{
          vertical-align: sub;
        }
      }
      .nearby {    
        display: flex;
        width: 100rem/$r;
        height: 32rem/$r;
        padding-top: 1px;
        border: 1px solid #5ea4db;
        border-radius: 4rem/$r;
        flex-grow: 0;
        flex-shrink: 0;
        font-size: 20rem/$r;
        text-align: center;
        color: #5ea4db;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
      }
    }
    .line2{
      margin-top: 20rem/$r;
      margin-bottom: 20rem/$r;
      color: #999999;
      .support_desc{
        font-size: 24rem/$r;
      }
      .support_list{
        .item{
          font-size: 20rem/$r;
          border: 1px solid #999999;
          line-height: 24rem/$r;
          padding: 3px 2px 2px 2px;
          vertical-align: middle;
          border-radius: 2px;
          margin-left: 8rem/$r;
        }
      }
    }
    .line3{
      color: #fcb825;
      font-size: 24rem/$r;
      width: 560rem/$r;     
      display: flex;
      .item{
        background-color: #FDFFEF;
        display: inline-block;
        height: 36rem/$r;
        line-height: 36rem/$r;
        padding: 0 16rem/$r;
        margin-right: 20rem/$r;
        border: 1px solid #fcb825;
        border-radius: 18rem/$r;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
