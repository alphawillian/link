<template>
  <div class="container-out">
    <div class="container" v-if="pageStatus === 1">
      <div class="block banner">
        <div
          class="location"
          @click="goCityList"
          :clstag="'jr|keycount|cx_city|' + cityInfo.cityCode"
        >
          <i></i>
          <span class="city-name">{{cityInfo.cityName}}</span>
        </div>
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in bannerList" :key="index">
            <img
              :src="item.imageUrl"
              class="banner-img"
              :clstag="'jr|keycount|cx_banner|' + item.id"
              @click="jump(item.jumpUrl, item.id, 'banner')"
            />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="block top-resource">
        <figure
          v-for="(item, index) in topResourcesList"
          :key="index"
          :clstag="'jr|keycount|cx_topResource|' + item.id"
          @click="jump(item.jumpUrl, item.id, 'top')"
        >
          <img :src="item.imageUrl" />
          <figcaption>{{item.title}}</figcaption>
        </figure>
      </div>
      <div class="block message" ref="message" v-if="messageList.length">
        <span class="message_desc">最新消息：</span>
        <div class="message_txt">
          <div class="message_list" ref="messageList">
            <p class="message_item" v-for="(item, index) in messageList" :key="index">{{item.ext}}</p>
            <p class="message_item">{{messageList[0].ext}}</p>
          </div>
        </div>
      </div>
      <div class="block middle-resource" v-if="middleResourcesList.length > 1">
        <van-tabs title-active-color="#ff3f44" title-inactive-color="#333333" :line-width="30">
          <van-tab
            v-for="(item, index) in middleResourcesList"
            :key="index"
            :title="item.categoryName"
          >
            <div class="middle-content" v-if="item.contents.length">
              <div class="top">
                <img
                  :src="item.contents[0].imageUrl"
                  :clstag="'jr|keycount|cx_midResource|' + item.contents[0].id"
                  @click="jump(item.contents[0].jumpUrl, item.contents[0].id, item.categoryKey)"
                />
              </div>
              <div class="list" v-if="item.contents.length > 1">
                <template v-for="(itemIn, indexIn) in item.contents">
                  <img
                    :src="itemIn.imageUrl"
                    :key="indexIn"
                    v-if="indexIn > 0"
                    :clstag="'jr|keycount|cx_midResource|' + itemIn.id"
                    @click="jump(itemIn.jumpUrl, itemIn.id, item.categoryKey)"
                  />
                </template>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div class="block middle-resource" v-else-if="middleResourcesList.length === 1">
        <div class="title">
          <span class="title-in">{{middleResourcesList[0].categoryName}}</span>
        </div>
        <div class="middle-content" v-if="middleResourcesList[0].contents.length">
          <div class="top">
            <img
              :src="middleResourcesList[0].contents[0].imageUrl"
              :clstag="'jr|keycount|cx_midResource|' + middleResourcesList[0].contents[0].id"
              @click="jump(middleResourcesList[0].contents[0].jumpUrl, middleResourcesList[0].contents[0].id, middleResourcesList[0].categoryKey)"
            />
          </div>
          <div class="list" v-if="middleResourcesList[0].contents.length > 1">
            <template v-for="(itemIn, indexIn) in middleResourcesList[0].contents">
              <img
                :src="itemIn.imageUrl"
                :key="indexIn"
                v-if="indexIn > 0"
                :clstag="'jr|keycount|cx_midResource|' + itemIn.id"
                @click="jump(itemIn.jumpUrl, itemIn.id, middleResourcesList[0].categoryKey)"
              />
            </template>
          </div>
        </div>
      </div>
      <div class="block bottom-resource" v-if="bottomResourcesList.length">
        <ul>
          <li v-for="(item, index) in bottomResourcesList" :key="index">
            <div class="title">
              <span class="title-in">{{item.title}}</span>
            </div>
            <div class="content">
              <img
                :src="item.imageUrl"
                :clstag="'jr|keycount|cx_btmResource|' + item.id"
                @click="jump(item.jumpUrl, item.id, 'bottom')"
              />
              <div class="info-content">
                <div class="price">
                  <span class="current">
                    <span class="sign">￥</span>
                    <span class="num">{{item.ext | priceSplit(0)}}</span>
                  </span>
                  <span class="original">￥{{item.ext | priceSplit(1)}}</span>
                </div>
                <div class="desc desc1">{{item.ext2}}</div>
                <div class="desc desc2">{{item.ext3}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="block question-line">
        <i></i>
        <router-link
          class="question"
          :to="'/question'"
          :clstag="'jr|keycount|cx_btmQuestion|changjianwenti'"
        >常见问题</router-link>
      </div>
    </div>
    <div class="container" v-else-if="pageStatus === 0">
      <div class="block location-out">
        <div
          class="location"
          @click="goCityList"
          :clstag="'jr|keycount|cx_city_no|'+ cityInfo.cityCode"
        >
          <i></i>
          <span class="city-name">{{cityInfo.cityName}}</span>
        </div>
      </div>
      <div class="block no-data">
        <img src="//storage.jd.com/fe-traffic/images/bg_noAddress.png" alt />
        <p>当前城市暂无支持的出行方式，</p>
        <p>可在上方切换其他城市查看~</p>
      </div>
    </div>
    <fe-drag
      v-if="serviceImgUrl && serviceJumpUrl"
      :initRight="0"
      :initBottom="80"
      bgcolor="transparent"
      radius="0%"
      :z="100"
    >
      <div class="service-block">
        <img :src="serviceImgUrl" @click="jump(serviceJumpUrl, 'service', 'service' )" />
      </div>
    </fe-drag>
    <div id="JPREC_CONTAINER"></div>
  </div>
</template>

<script>
import { queryHome, queryCityInfo } from '../api/service'
import loading from '../components/fullLoading/index.js'
import Fetoast from '../components/toast'
import FeDrag from '../components/FeDrag'
// import FeDrag from '@jdpay/jdpay_vcps/lib/FeDrag'
import { getLngLat, getParams, sendPointFn } from '../utils/utils'
export default {
  name: '',
  components: {
    FeDrag
  },
  data () {
    return {
      online: true,
      biz: 'trafficHome',
      isLocated: false,
      latLng: {},
      cityInfo: {},
      beforeCityInfo: {},
      defaultCityInfo: {
        cityCode: '110000',
        cityName: '北京'
      },
      bannerList: [],
      pageStatus: -1, // 该城市是否有数据
      pageData: {}, // 主页面数据
      topResourcesList: [],
      messageList: [],
      middleResourcesList: [],
      bottomResourcesList: [],
      serviceImgUrl: '', // 客服精灵图片链接
      serviceJumpUrl: '' // 客服精灵跳转链接
    }
  },

  created () { },
  mounted () {
    // this.doQueryTimes()
  },
  beforeRouteLeave (to, from, next) {
    console.log('to:', to)
    if (to.name === 'city') { // 去城市选择页面
      const cityInfoStr = JSON.stringify(this.cityInfo)
      const pageDataStr = JSON.stringify(this.pageData)
      sessionStorage.setItem('beforeCityInfo', cityInfoStr)
      sessionStorage.setItem('pageData', pageDataStr)
      sessionStorage.setItem('pageStatus', this.pageStatus)
    }
    next()
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      let hasData = false
      const cityInfoStr = sessionStorage.getItem('cityInfo')
      const beforeCityInfoStr = sessionStorage.getItem('beforeCityInfo')
      const pageDataStr = sessionStorage.getItem('pageData')
      const pageStatusStr = sessionStorage.getItem('pageStatus')
      if (cityInfoStr && beforeCityInfoStr && pageDataStr && pageStatusStr !== null) {
        hasData = true
        vm.cityInfo = JSON.parse(cityInfoStr)
        vm.beforeCityInfo = JSON.parse(beforeCityInfoStr)
        vm.pageData = JSON.parse(pageDataStr)
      }
      if (hasData && from.name === 'city') {
        vm.backInit()
      } else {
        vm.init()
      }
    })
  },

  watch: {
    cityInfo (nVal, oVal) {
    },
    latLng () {
      this.doQueryCityInfo()
    }
  },
  filters: {
    priceSplit (str, type) {
      return str.split('_')[type]
    }
  },
  methods: {
    // 首次进入页面时的初始化
    init () {
      // eslint-disable-next-line
      if (!(data_source_100001819.online)) {
        location.href = 'https://pb.jd.com/common/notline/html/index.html?goto=https://m.jd.com/'
      }
      // 客服精灵图
      this.setService()
      this.setShare()
      loading()
      this.getUserLatLng()
    },
    // 从城市列表页进入时的初始化
    backInit () {
      if (this.cityInfo.cityCode === this.beforeCityInfo.cityCode) {
        const pageStatusStr = sessionStorage.getItem('pageStatus')
        this.pageStatus = Number(pageStatusStr)
        this.handleHomeData()
      } else {
        loading()
        this.doQueryHome()
      }
    },
    getUserLatLng () {
      if (getParams('lat') && getParams('lng')) {
        this.latLng = {
          lat: getParams('lat'),
          lng: getParams('lng')
        }
      } else if (getParams('latitude') && getParams('longitude')) {
        this.latLng = {
          lat: getParams('latitude'),
          lng: getParams('longitude')
        }
      } else {
        this.doGetLngLat()
      }
    },
    // 获取经纬度
    async doGetLngLat () {
      let res = {}
      try {
        res = await getLngLat()
      } catch (err) {
        this.cityInfo = this.defaultCityInfo
        this.doQueryHome()
        console.log('未获得到您的位置信息!')
        return false
      }
      if (res && res.lat && res.lng) {
        this.isLocated = true
        this.latLng = res
      } else {
        this.cityInfo = this.defaultCityInfo
        this.doQueryHome()
        Fetoast('未获得到您的位置信息！')
      }
    },
    // 根据经纬度逆解析
    async doQueryCityInfo () {
      const reqParams = {
        biz: this.biz,
        lat: this.latLng.lat,
        lng: this.latLng.lng
      }
      let res = {}
      try {
        res = await queryCityInfo(reqParams)
      } catch (err) {
        this.cityInfo = this.defaultCityInfo
        this.doQueryHome()
        console.log('经纬度逆解析错误')
        return false
      }
      console.log('res:', res)
      if (res.success && res.data) {
        this.cityInfo = res.data
        this.doQueryHome()
      } else {
        this.cityInfo = this.defaultCityInfo
        this.doQueryHome()
        Fetoast(res.msg || '经纬度逆解析错误')
      }
    },
    // 查询主页数据
    async doQueryHome () {
      const reqParams = {
        biz: this.biz,
        cityCode: this.cityInfo.cityCode
      }
      let res = {}
      try {
        res = await queryHome(reqParams)
      } catch (err) {
        loading.close()
        Fetoast('活动火爆，请稍后再试！')
        console.log('查询主页数据失败')
        this.pageStatus = 0
        return false
      }
      console.log('res:', res)
      if (res.success && res.data) {
        this.pageStatus = 1
        this.pageData = res.data
        this.handleHomeData()
      } else {
        this.pageStatus = 0
        Fetoast(res.msg || '活动火爆，请稍后再试！')
      }
    },
    // 处理接口里的泰山页面数据
    handleHomeData () {
      const data = this.pageData
      if (data.banner && data.banner.display === '1') {
        this.bannerList = data.banner.list || []
      }
      if (data.topResources && data.topResources.display === '1') {
        this.topResourcesList = data.topResources.list || []
      }
      if (data.messages && data.messages.display === '1') {
        this.messageList = data.messages.list || []
        if (this.messageList.length) {
          this.$nextTick(() => {
            this.messageMove()
          })
        }
      }
      if (data.middleResources && data.middleResources.display === '1') {
        const middleList = data.middleResources.list || []
        let tempList = []
        middleList.forEach((item, index) => {
          if (item.contents && item.contents.length > 0) {
            tempList.push(item)
          }
        })
        this.middleResourcesList = tempList
      }
      if (data.bottomResources && data.bottomResources.display === '1') {
        this.bottomResourcesList = data.bottomResources.list || []
      }
      loading.close()
      this.initCps()
    },
    // 去城市列表页切换城市
    goCityList () {
      this.$router.push({ name: 'city' })
      this.sendPoint('changeCity')
    },
    jump (url, clickId, moduleId) {
      if (!url) return false
      setTimeout(() => {
        location.href = url
      }, 300)
      this.sendPoint(clickId, moduleId)
    },
    // 顶部消息轮播
    messageMove () {
      let $list = this.$refs.messageList
      let lineH = this.$refs.message.clientHeight
      let listH = this.$refs.messageList.clientHeight
      let length = Math.round(listH / lineH)
      console.log('length:', length)
      let index = 0
      function move () {
        if (index === length) {
          index = 0
          $list.setAttribute('style', 'transition: initial; top: ' + -lineH * index + 'px')
          index++
          setTimeout(move, 1400)
        } else {
          $list.setAttribute('style', 'transition: all 1s ease; top: ' + -lineH * index + 'px')
          index++
          setTimeout(move, 1400)
        }
      }
      move()
    },
    // 设置客服精灵图
    setService () {
      let linksObj = window.data_source_100001819.linksObj
      let serviceImgUrl = linksObj.serviceImgUrl
      let serviceJumpUrl = linksObj.serviceJumpUrl
      this.serviceImgUrl = serviceImgUrl
      this.serviceJumpUrl = serviceJumpUrl
    },
    // 设置分享
    setShare (status) {
      // eslint-disable-next-line
      const shareData = data_source_100001819.shareObj
      let optObj = {
        moreItem: true, // 非必传，Boolean类型，是否隐藏APP内的右上角分享,默认为true
        share_img: shareData.share_img, // 分享图标
        share_url: shareData.share_url || location.href, // 分享链接
        share_title: shareData.share_title, // 分享标题
        share_subtitle: shareData.share_subtitle, // 分享描述
        channels: ['1', '2', '3', '4', '5'] // 必传，0-微信朋友圈，1-微信好友，2-新浪微博，3-短信，4-QQ好友，5-QQ空间 金融环境微博短信不可用,商城环境短信不可用
      }
      window.JPFESDK.setShare(optObj)
    },
    // 发送埋点数据
    sendPoint (clickId, moduleId) {
      const pageId = 'index'
      clickId = clickId || 'default'
      moduleId = moduleId || 'default'
      sendPointFn(pageId, moduleId, clickId)
    },
    // 加载cps组件
    initCps () {
      window._JPREC.updateInit({
        pageId: 'CX01',
        positionId: '1966686601',
        bgc: '#c62a30',
        title: '猜您喜欢',
        titleColor: '#fff',
        container: '#JPREC_CONTAINER',
        topPadding: 50,
        scrollMore: true,
        pageSize: 12,
        showReTop: false,
        layoutType: 2
      })
    }
  }
}
</script>

<style lang='scss' scoped>
$r:100;
.container-out{
  width: 100vw;
  min-height: 100vh;
  background: white;
  padding-bottom: 50rem/$r;
  .container{
    width: 750rem/$r;
    min-height: 100vh;
    background: white;
    margin: 0 auto;
    color: #333;
    font-size: 24rem/$r;
    .block{
      width: 750rem/$r;
      // banner区
      &.banner{
        position: relative;
        .location{
          position: absolute;
          left: 30rem/$r;
          top: 20rem/$r;
          z-index: 10;
          i{
            display: inline-block;
            width: 23rem/$r;
            height: 28rem/$r;
            background-image: url('//storage.jd.com/fe-traffic/images/icon_location_white.png');
            background-size: 100% 100%;
            margin-right: 10rem/$r;
            position: relative;
            top: 2rem/$r;
          }
          .city-name{
            font-size: 28rem/$r;
            color: white;
            text-decoration: underline;
          }
        }
        .banner-img{
          width: 100%;
        }
      }
      // 顶部资源位(icon及跳转)
      &.top-resource{
        padding: 40rem/$r 30rem/$r 30rem/$r 30rem/$r;
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
        -webkit-justify-content: space-around;
        figure{
          text-align: center;
        }
        img{
          width: 66rem/$r;
        }
        figcaption{
          font-size: 26rem/$r;
        }
      }
      // 最新消息
      &.message {
        width: 100%;
        height: 48rem/$r;
        margin: 0 auto;
        margin-bottom: 10rem/$r;
        background: #fef5f5;
        padding: 0 30rem/$r;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        font-size: 0;
        color: #999;
        .message_desc{
          display: inline-block;
          height: 48rem/$r;
          line-height: 48rem/$r;
          font-size: 22rem/$r;
        }
        .message_txt{
          flex-grow: 1;
          height: 48rem/$r;
          overflow: hidden;
          position: relative;
          .message_list{
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            font-size: 0;
            .message_item{
              line-height: 48rem/$r;
              font-size: 24rem/$r;
            }
          }
        }
        
      }
      // 中部资源位
      &.middle-resource{
        ::v-deep .van-hairline--top-bottom{
          border-width: 0 0 1px 0;
        }
        ::v-deep .van-hairline--top-bottom::after{
          border-width: 0 0 1px 0;
        }
        .title{
          padding: 0 30rem/$r;
          &::before{
            content: '';
            display: inline-block;
            width: 6rem/$r;
            height: 32rem/$r;
            background: #f65651;
            vertical-align: sub;
          }
          .title-in{
            margin-left: 8rem/$r;
            font-size: 32rem/$r;
            color: #333;
          }
        }
        .middle-content{
          font-size: 0;
          width: 100%;
          padding: 0 30rem/$r;
          .top{
            padding-top: 30rem/$r;
            padding-bottom: 10rem/$r;
            img{
              width: 100%;
            }
          }
          .list{
            img{
              width: 335rem/$r;
              border-radius: 4rem/$r;
              box-shadow: 0 0 4px 2px #f5f5f5;
              margin-bottom: 20rem/$r;
            }
            :nth-child(odd) {
              // border-radius: 40rem/$r;
              margin-right: 18rem/$r;
            }
          }
        }
      }
      // 底部资源
      &.bottom-resource{
        ul{
          padding: 0 30rem/$r;
          li{
            margin-top: 40rem/$r;
            .title{
              margin-bottom: 20rem/$r;
              &::before{
                content: '';
                display: inline-block;
                width: 6rem/$r;
                height: 32rem/$r;
                background: #f65651;
                vertical-align: sub;
              }
              .title-in{
                margin-left: 8rem/$r;
                font-size: 32rem/$r;
                color: #333;
              }
            }
            .content{
              width: 100%;
              position: relative;
              img{
                width: 100%;
                border-radius: 4rem/$r;
                box-shadow: 0 0 4px 2px #f5f5f5;
              }
              .info-content{
                position: absolute;
                width: 510rem/$r;
                height: 180rem/$r;
                top: 210rem/$r;
                left: 0;
                padding-left: 25rem/$r;
                display: flex;
                display: -webkit-flex;
                flex-direction: column;
                /* autoprefixer: ignore next */
                -webkit-flex-direction: column;
                justify-content: center;
                -webkit-justify-content: center;
                // 价格行
                .price{
                  vertical-align: bottom;
                  .current{
                    font-size: 32rem/$r;
                    color: #f33f44;
                    .sign{
                      font-size: 28rem/$r;
                    }
                    .num{
                      margin-left: -4rem/$r;
                    }
                  }
                  .original{
                    font-size: 24rem/$r;
                    color: #999;
                    text-decoration: line-through;
                    margin-left: 10rem/$r;
                  }
                }
                // 描述行1
                .desc1{
                  font-size: 32rem/$r;
                  color: #333;
                }
                // 描述行2
                .desc2{
                  font-size: 24rem/$r;
                  color: #999;
                }

              }
            }
          }
        }
      }
      &.question-line{
        margin-top: 50rem/$r;
        text-align: center;
        i{
          display: inline-block;
          width: 50rem/$r;
          height: 50rem/$r;
          background-image: url('//storage.jd.com/fe-traffic/images/icon_question.png');
          background-size: 100% 100%;
          vertical-align: middle;
        }
        .question{
          font-size: 28rem/$r;
          color: #333;
          text-decoration: underline;
          margin-left: 10rem/$r;
        }
      }
      // 无数据时的地址栏
      &.location-out{
        position: relative;
        .location{
          position: absolute;
          left: 30rem/$r;
          top: 20rem/$r;
          z-index: 10;
          i{
            display: inline-block;
            width: 23rem/$r;
            height: 28rem/$r;
            background-image: url('//storage.jd.com/fe-traffic/images/icon_location_black.png');
            background-size: 100% 100%;
            margin-right: 10rem/$r;
            position: relative;
            top: 2rem/$r;
          }
          .city-name{
            font-size: 28rem/$r;
            color: #333;
            text-decoration: underline;
          }
        }
      }
      // 无数据时的背景图样式
      &.no-data{
        text-align: center;
        img{
          width: 471rem/$r;
          margin-top: 150rem/$r;
          margin-bottom: 10rem/$r;
        }
        p{
          font-size: 30rem/$r;
          color: #999;
          line-height: 34rem/$r;
        }
      }
    }
  }
  // 客服小精灵
  .service-block{
    width: 124rem/$r;
    height: 124rem/$r;
    background-color: white;
    border-radius: 50%;
    img{
      width: 100%;
    }
  }
}

</style>
