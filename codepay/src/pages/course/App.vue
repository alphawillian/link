<template>
  <div class="container">
    <div class="block offline">
      <div class="block-title">
        <div class="title-bg">OFFLINE</div>
        <span class="title-txt">线下·用户被扫</span>
      </div>
      <ul class="block-desc desc-list">
        <li class="desc-item" v-for="(item, index) in offline1List" :key="index">{{item.text}}</li>
      </ul>
      <div class="gif">
        <img src="./assets/images/offline1.gif" />
      </div>

      <div class="block-title">
        <div class="title-bg">OFFLINE</div>
        <span class="title-txt">线下·用户扫码</span>
      </div>
      <ul class="block-desc desc-list">
        <li class="desc-item" v-for="(item, index) in offline2List" :key="index">{{item.text}}</li>
      </ul>
      <div class="gif">
        <img src="./assets/images/offline2.gif" />
      </div>
      <div class="center">
        可用场景：所有带银联标记带收银机或者二维码
        <img src="./assets/images/union.png" class="union" />
      </div>
      <div class="shop-list">
        <figure class="shop-item" v-for="(item, index) in shopsList" :key="index">
          <img :src="item.image" />
          <figcaption>{{item.text}}</figcaption>
        </figure>
      </div>
      <div class="center">
        <span class="fakeA" @click="fakeA(urlInfo.moreShop, 'moreShop')">查看更多商户</span>
      </div>
    </div>

    <div class="block">
      <div class="block-title">
        <div class="title-bg">TRAFFIC</div>
        <span class="title-txt">交通出行·贴近闸机</span>
      </div>
      <ul class="block-desc desc-list">
        <li class="desc-item" v-for="(item, index) in trafficList" :key="index">{{item.text}}</li>
      </ul>
      <div class="gif">
        <img src="./assets/images/transport.gif" />
      </div>
      <div class="center">
        <span class="fakeA" @click="fakeA(urlInfo.supportCity, 'supportCity')">查看支持城市</span>
      </div>
    </div>

    <div class="block">
      <div class="block-title">
        <div class="title-bg">TIPS</div>
        <span class="title-txt">使用提示</span>
      </div>
      <ul class="block-desc desc-list">
        <li class="desc-item" v-for="(item, index) in tipsList" :key="index">{{item.text}}</li>
      </ul>
    </div>
    <div class="bottom-line">
      <span class="fakeA customService" @click="fakeA(urlInfo.customService, 'customService')">智能客服</span>
      <span class="fakeA" @click="fakeA(urlInfo.feedBack, 'feedBack')">意见反馈</span>
    </div>
    <div class="center">- 由网银在线（北京）科技有限公司提供技术支持 -</div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  data () {
    return {
      offline1List: [], // 线下·用户被扫 文案
      offline2List: [], // 线下·用户扫码 文案
      trafficList: [], // 交通出行·贴近闸机 文案
      tipsList: [], // 注意事项 文案
      shopsList: [], // 支持门店列表
      urlInfo: {}, // 页面的一些跳转链接信息
      shareInfo: {} // 分享文案信息 
    }
  },
  watch: {

  },
  filters: {
  },
  created () {
  },
  mounted () {
    this.sendPoint()
    this.dataHandle()
  },
  methods: {
    fakeA (url, key) {
      this.sendPoint(key)
      setTimeout(() => {
        location.href = url
      }, 300)
    },
    dataHandle () {
      // eslint-disable-next-line
      let data = data_source_100001332
      console.log('data', data)
      this.offline1List = data.offline1
      this.offline2List = data.offline2
      this.trafficList = data.traffic
      this.tipsList = data.tips
      this.shopsList = data.shops
      this.urlInfo = data.url
      this.shareInfo = data.share
      this.setShare()
    },
    // 分享设置
    setShare () {
      let title = this.shareInfo.title
      let desc = this.shareInfo.desc
      let logo = this.shareInfo.logo
      let optObj = {
        moreItem: true, // 非必传，Boolean类型，是否隐藏APP内的右上角分享,默认为true
        share_img: logo, // 必传，分享出去的logo图链接，必须是https协议链接
        share_url: location.href, // 必传，分享出去的页面链接
        share_title: title, // 必传，分享出去的页面标题
        share_subtitle: desc, // 必传，分享出去的页面副标题(描述)
        channels: ['1', '2', '3', '4', '5'] // 必传，0-微信朋友圈，1-微信好友，2-新浪微博，3-短信，4-QQ好友，5-QQ空间 金融环境微博短信不可用,商城环境短信不可用
      }
      // eslint-disable-next-line
      window.JPFESDK.setShare(optObj)
    },
    // 发送埋点数据
    sendPoint: function (track) {
      let pageBiz = 'JR,FE,CODEPAY'
      let pageId = 'codepayCourse'
      if (!track) {
        track = 'default'
      }
      // eslint-disable-next-line
      JPTrack.emit(pageBiz, [pageId, track])
    }
  }
}
</script>

<style lang='scss' scoped>
$r:100;
.container{
  font-size: 24rem/$r;
  color: #808080;
  // background: cyan;
  padding-top: 26rem/$r;
  padding-bottom: 40rem/$r;
  min-height: 100vh;
  .center{
    text-align: center;
  }
  .block{
    width: 707rem/$r;
    margin: 0 auto;
    background-color: white;
    padding: 0 40rem/$r 40rem/$r 40rem/$r;
    border-radius: 20rem/$r;
    margin-bottom: 26rem/$r;
    .block-title{
      width: 100%;
      height: 210rem/$r;
      line-height: 210rem/$r;
      position: relative;
      .title-bg{
        color: #f9f4e8;
        font-size: 74rem/$r;
      }
      .title-txt{
        position: absolute;
        left: 0;
        bottom: 56rem/$r;
        height: 46rem/$r;
        line-height: 46rem/$r;
        padding: 0 10rem/$r;
        color: white;
        background: linear-gradient(to right,  #f4d05d,#dab866);
        border-left: 1px solid #dab866;
      }
    }
    .block-desc{
      color: #808080;
    }
    .desc-list{
      .desc-item{
        margin-bottom: 40rem/$r;
      }
    }
    .gif{
      width: 100%;
      margin-bottom: 50rem/$r;
      
      img{
        width: 100%;
      }
    }
  }
  .fakeA{
    color: #27359f;
    text-decoration: underline;
  }
  .union{
    width: 50rem/$r;
    vertical-align: middle;
  }
  .shop-list{
    display: flex;
    flex-wrap: wrap;
    margin: 20rem/$r 0;
    .shop-item{
      width: 25%;
      flex-shrink: 0;
      flex-grow: 0;
      text-align: center;
      border-bottom: 1px solid #e9d8af;
      border-right: 1px solid #e9d8af;
      img{
        margin-top: 20rem/$r;
        width: 68rem/$r;
      }
      figcaption{
        padding: 18rem/$r 0 18rem/$r 0;
        font-size: 14rem/$r;
        color: #5e5e5e;
      }
      &:nth-child(4n){
        border-right: none;
      }
      &:nth-last-child(-n+4) {
        border-bottom: none;
      }
    }
  }
  .bottom-line{
    padding-top: 50rem/$r;
    padding-bottom: 26rem/$r;
    display: flex;
    justify-content: center;
    .customService{
      margin-right: 80rem/$r;
    }
  }
}
</style>
