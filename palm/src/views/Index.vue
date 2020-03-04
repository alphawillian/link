<template>
  <main class="CONTAINER">
    <div class="img_block">
      <img v-for="(item, index) in showImageList" :key="index" :src="item" class="img1" />
    </div>
    <div class="btn_line">
      <button @click="goHome" :clstag="qdTrack('ceping')">我要测评</button>
    </div>
  </main>
</template>

<script>
import {
  // getParams,
  qdTrack
} from '@jdpay/jdpay_utils'
import {
  // apiShopIndex
} from 'api/request'

export default {
  name: 'view1',

  data () {
    return {
      sourceData: window.data_source_100002795,
      showImageList: []
    }
  },

  created () {
    this.init()
  },

  mounted () { },

  methods: {
    qdTrack,
    init () {
      this.showImageList = this.sourceData.showImageList
    },
    goHome () {
      this.$router.push({ name: 'home', query: {} })
    }
  }
}
</script>

<style lang="scss" scoped>
  $r:100;
  .CONTAINER {
    position: relative;
    margin: 0 auto;
    padding: 0;
    width: 7.5rem;
    min-height: 100vh;
    background-color: #3aceb2;
    padding-bottom: 30rem/$r;
    .img_block{
      width: 100%;
      padding-bottom: 60rem/$r;
      font-size: 0;
      img{
        width: 100%;
      }
    }
    .btn_line{
      position: fixed;
      left: 0;
      bottom: 10rem/$r;
      width: 100%;
      text-align: center;
      font-size: 0;
      button{
        width: 338rem/$r;
        height: 80rem/$r;
        background-image: url('https://storage.jd.com/2020plam/images/bg_btn1.png');
        background-size: 100% 100%;
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 28rem/$r;
        color: white;
        line-height: 54rem/$r;
      }
    }
  }
</style>
