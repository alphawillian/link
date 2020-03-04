<template>
  <li
    class="storeItem"
    data-storecode="${item.storeCode}"
    :clstag="'jr|keycount|mf_shop|' + info.storeCode"
    @click="goMap(info.storeCode)"
  >
    <span class="storeLogo">
      <img :src="info.logoAddress" />
    </span>
    <span class="storeTxt">
      <div class="storeName">{{info.realName}}</div>
      <div
        class="storeBenefit"
      >{{info.preferenceActivities && info.preferenceActivities[0] && info.preferenceActivities[0].prizeDesc || ''}}</div>
    </span>
    <span class="storeDistance">
      <span class="icon_distance"></span>
      <span class="distanceTxt">{{info.distance}}{{info.distanceUnit}}</span>
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
    return {}
  },
  filters: {},
  created () { },
  mounted () { },
  methods: {
    goMap (storeCode) {
      this.$emit('sendPoint', 'liehuDetail')
      setTimeout(() => {
        location.href = 'https://pb.jd.com/activity/2018/location/html/map.html?storeCode=' + storeCode
      }, 300)
    },
    href (url) {
      this.$emit('sendPoint', 'daojiaDetail')
      setTimeout(function () {
        location.href = url
      }, 300)
    }
  }
}
</script>

<style lang='scss' scoped>
$r:100;
.storeItem{
  width: 95%;
  margin: 0 auto;
  border-bottom: 1px solid #eeeeee;
  overflow: hidden;
  height: 150rem/$r;
  display: flex;
  align-items: center;
  :nth-last-of-type(1){
    border: none;
  }
  ::nth-last-child(1){
    border: none;
  }
  .storeLogo{
    width: 180rem/$r;
    flex-shrink: 0;
    text-align: center;
    img{
      max-height: 70rem/$r;
      // width: 70%;
      margin: 0 auto;
    }
  }
  .storeTxt{
    flex-grow: 1;
    .storeName{
      font-size: 28rem/$r;
    }
    .storeBenefit{
      font-size: 24rem/$r;
      color: #e2231a;
      margin-top: 2rem/$r;
    }
  }
  .storeDistance{
    display: inline-block;
    width: 120rem/$r;
    margin-right: 10rem/$r;
    text-align: right;
    flex-shrink: 0;
    .icon_distance{
      display: inline-block;
      width: 16rem/$r;
      height: 20rem/$r;
      background-image: url("//img30.360buyimg.com/jr_image/jfs/t20437/62/718910371/325/1b2c37df/5b164bbaN0102fb7b.png");
      background-size: 100% 100%;
      margin-right: 1px;
    }
    .distanceTxt{
      font-size: 24rem/$r;
      color: #bbbbbb;
    }
  }
}
</style>
