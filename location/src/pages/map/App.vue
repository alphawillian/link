<template>
  <div class="container">
    <div class="fullLoading" v-if="isFullLoading">
      <Loading type="spinner" />
    </div>
    <div id="map"></div>
    <div id="shop-content">
      <div class="slide-bar" v-show="infoStatus === 0" @click="changeInfoStatus">
        <i></i>
      </div>
      <div id="content-body" v-show="showStoreInfo">
        <div class="shop-main">
          <span class="shop-logo">
            <span class="shop-logo-inner">
              <img :src="storeInfo.logoAddress" alt />
            </span>
          </span>
          <span class="shop-info">
            <div class="shop-line1">
              <div class="shop-name">{{storeInfo.realName}}</div>
              <!-- <span class="shop-distance nearby" v-if="true">离你最近</span> -->
              <span class="shop-distance range">{{storeInfo.distance}}{{storeInfo.distanceUnit}}</span>
            </div>

            <div class="shop-line2">
              <span class="shop-pay">
                <span class="spt-key">支持</span>
                <span
                  class="spt-item"
                  v-for="(item, index) in storeInfo.payWays"
                  :key="index"
                >{{payWayMaps[item]}}</span>
              </span>
            </div>

            <div class="shop-line3">
              <span class="shop-address">{{storeInfo.address}}</span>
              <span class="shop-nav" @click="goNav">
                <img
                  src="//img30.360buyimg.com/jr_image/jfs/t1/11804/37/13949/552/5c9c55b3Ea6310eb1/8f85469dc102ea9d.png"
                />到这去
              </span>
            </div>
          </span>
        </div>
        <transition name="fade">
          <div v-if="infoStatus === 1">
            <div class="shop-fn">
              <div class="coupon-block">
                <ul
                  class="coupon-packet"
                  v-if="storeInfo.preferenceActivities && storeInfo.preferenceActivities.length"
                >
                  <coupon-item
                    v-for="(item, index) in storeInfo.preferenceActivities"
                    :key="index"
                    :info="item"
                    :storeCode="storeInfo.storeCode"
                    :latLng="userInfo"
                    @sendPoint="sendPoint"
                    type="coupon"
                  />
                </ul>
                <div class="coupon-none" v-else>
                  <img
                    src="//img30.360buyimg.com/jr_image/jfs/t1/29851/2/12914/7602/5c9c55b2E9d8e908c/d2adddccca7adcde.png"
                  />
                  <div class="coupon-none-desc">该门店暂时没有优惠活动哦~</div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { getParams, getLngLat } from '../../utils/utils.js'
import { Toast, Loading } from 'vant'
import CouponItem from '../../components/couponItem'
import { queryStoreDetail, queryAddressName } from '../../api/service'
export default {
  name: '',
  components: {
    CouponItem,
    Loading
  },
  data () {
    return {
      isFullLoading: false,
      map: null,
      storeCode: '',
      userInfo: {
        lat: '39.7294520',
        lng: '116.3418830'
      },
      storeInfo: {
        lat: '39.9040600',
        lng: '116.3833400'
      },
      showStoreInfo: false,
      infoStatus: 1, // 商户信息状态
      payWayMaps: {
        '0': '京东支付',
        '1': '京东码支付',
        '2': '京东闪付'
      }, // 支持支付方式对照表
      cityName: '北京', // 城市名称 导航用
      typeMap: {
        '1001': { w: 37, h: 52, img: '//img30.360buyimg.com/jr_image/jfs/t18571/188/2602886191/2783/ece3d467/5b03caf0N5d78d5ba.png' }, // 商超
        '1002': { w: 37, h: 52, img: '//img30.360buyimg.com/jr_image/jfs/t19840/322/610641234/2778/78210e8b/5b03caf1N4131e16f.png' }, // 百货
        '1003': { w: 37, h: 52, img: '//img30.360buyimg.com/jr_image/jfs/t17764/110/2688585904/2811/d88b153c/5b03caf0N8dc6dd61.png' }, // 便利店
        '1004': { w: 37, h: 52, img: '//img30.360buyimg.com/jr_image/jfs/t17647/216/2662133761/3128/a2b151bf/5b03caf0N4bcd55e6.png' }, // 餐饮
        '1005': { w: 37, h: 52, img: '//img30.360buyimg.com/jr_image/jfs/t19447/222/2704889261/2914/ec98cb87/5b04fcb3N2f9c81a6.png' }, // 生活服务暂时和其他一样
        '1006': { w: 37, h: 52, img: '//img30.360buyimg.com/jr_image/jfs/t17647/214/2672585472/3043/a8947b8a/5b03caf0N24e0f723.png' }, // 娱乐
        '1007': { w: 37, h: 52, img: '//img30.360buyimg.com/jr_image/jfs/t20128/111/223465037/2799/feab938e/5b03caf0N0a1d4815.png' }, // 其他
        '1008': { w: 58, h: 58, img: '//img30.360buyimg.com/jr_image/jfs/t22354/152/214417068/3996/9b41e2e7/5b041adcNc758c755.png' } // 红包背景
      }
    }
  },
  watch: {
    storeInfo: function (nVal, oVal) {
      console.log('nVal', nVal)
    }
  },
  created () {

  },
  mounted () {
    // eslint-disable-next-line
    // this.qq = qq
    // this.mapInit()
    this.pageInit()

    this.sendPoint('page')
  },

  methods: {
    async pageInit () {
      if (getParams('storeCode')) {
        this.storeCode = getParams('storeCode')
      }
      if (getParams('lat') && getParams('lng')) {
        this.userInfo.lat = getParams('lat')
        this.userInfo.lng = getParams('lng')
        this.mapInit()
        this.doQueryStoreDetail()
      } else {
        let res = null
        try {
          this.isFullLoading = true
          res = await getLngLat()
        } catch (err) {
        }
        if (res && res.lat && res.lng) {
          this.userInfo.lat = res.lat
          this.userInfo.lng = res.lng
        } else {
          Toast('未获取到您的位置，请在‘设置’中开启定位功能')
        }
        console.log('res:', res)
        this.mapInit()
        this.doQueryStoreDetail()
      }
      this.setShareOption()
    },
    async doQueryStoreDetail () {
      let reqParams = {
        storeCode: this.storeCode,
        latitude: this.userInfo.lat,
        longitude: this.userInfo.lng
      }
      let res = null
      try {
        this.isFullLoading = true
        res = await queryStoreDetail(reqParams)
        this.isFullLoading = false
      } catch (err) {
        this.isFullLoading = false
        console.log('err', err)
        Toast(err)
      }
      if (res.resultCode === '0') {
        this.storeInfo = res.resultData
        this.showStoreInfo = true
        this.initStoreIcon()
      } else {
        Toast(res.resultMsg || '服务异常 请稍后再试！')
        // this.storeInfo = {
        //   address: '北京市西城区前门西大街正阳市场1号楼1层102铺位和二层',
        //   distance: '1.05',
        //   distanceUnit: 'km',
        //   latitude: '39.8995801',
        //   logoAddress: '//img30.360buyimg.com/jr_image/jfs/t23173/95/1136461278/4997/e1b219d3/5b515c67Nc0b0dea4.jpg',
        //   longitude: '116.3952219',
        //   marketingActivities: [],
        //   name: '必胜客',
        //   payWays: ['1', '2'],
        //   preferenceActivities: [],
        //   realName: '必胜客(前门)',
        //   simpleCode: 'bishengke',
        //   storeCode: 'Y201807201103047995'
        // }
        // this.showStoreInfo = true
        // this.initStoreIcon()
      }
      console.log('storeDetail:', res)
    },
    // 经纬度逆解析地理位置 需要城市名称做导航用
    async doQueryAddressName () {
      const info = this.storeInfo
      let reqParams = {
        latitude: info.latitude,
        longitude: info.longitude
      }
      let res = {}
      try {
        res = await queryAddressName(reqParams)
      } catch (err) {
        setTimeout(() => {
          this.doQueryAddressName()
        }, 3000)
      }
      if (res.resultCode === '0') {
        let data = res.resultData
        this.cityName = data.addressComponent.city
      } else {
        setTimeout(() => {
          this.doQueryAddressName()
        }, 3000)
      }
    },
    // 初始化地图
    mapInit () {
      this.map = new window.BMap.Map('map', { minZoom: 11, maxZoom: 18 }) // 创建地图实例  
      let center = new window.BMap.Point(this.userInfo.lng, this.userInfo.lat) // 创建点坐标  
      this.map.centerAndZoom(center, 12)
      this.map.enableScrollWheelZoom(true)
      this.mapEventInit()
    },
    // 地图的事件初始化
    mapEventInit () {
      let _this = this
      this.map.addEventListener('dragstart', function () {
        console.log('dragstart')
        _this.infoStatus = 0
      })
    },
    initStoreIcon () {
      let screenH = window.innerHeight
      let point = new window.BMap.Point(this.storeInfo.longitude, this.storeInfo.latitude)
      this.map.setCenter(point)
      this.map.panBy(0, -(screenH / 4))
      let markerIconData = this.typeMap[this.storeInfo.industryCategory || '1001']
      let markerImg = markerIconData.img
      let opts = {
        position: point, // 指定文本标注所在的地理位置
        offset: new window.BMap.Size('50%', (markerIconData.h) / 1) // 设置文本偏移量
      }
      let myIcon = new window.BMap.Icon(markerImg, new window.BMap.Size(markerIconData.w, markerIconData.h), { imageSize: new window.BMap.Size(markerIconData.w, markerIconData.h) })
      let marker = new window.BMap.Marker(point, { icon: myIcon }) // 创建标注
      this.map.addOverlay(marker)
      let label = new window.BMap.Label(this.storeInfo.realName, opts) // 创建文本标注对象
      label.setStyle({
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: 'white',
        fontSize: '0.24rem',
        height: '0.4rem',
        lineHeight: '0.44rem',
        borderRadius: '0.2rem',
        border: 'none',
        transform: 'translateX(-50%)',
        left: (markerIconData.w) / 2 + 'px',
        padding: '0 0.2rem'
      })
      marker.setLabel(label)
      marker.addEventListener('click', () => {
        this.infoStatus = 1
      })
      label.addEventListener('click', () => {
        this.infoStatus = 1
      })
    },
    goNav () {
      let arr = []
      // arr.push('eword=' + this.storeInfo.realName)
      // arr.push('epointx=' + this.storeInfo.longitude) // 终点经度
      // arr.push('epointy=' + this.storeInfo.latitude) // 终点纬度
      // arr.push('spointx=' + this.userInfo.lng) // 起点经度
      // arr.push('spointy=' + this.userInfo.lat) // 起点纬度
      // let str = arr.join('&')
      // // var param = jm.tools.format("?key={0}&referer={1}", mapKey, "京东支付优惠商户列表")
      // let param = '?key=42DBZ-MDEK3-IKS3Q-3MI6O-YN2EE-NJFSL&referer=京东优惠商家'
      // var url = '//apis.map.qq.com/tools/routeplan/' + str + param
      // // location.href = url
      // this.sendPoint('goNav', url)

      // 百度地图 文档链接：http://lbsyun.baidu.com/index.php?title=uri/api/web
      arr.push('origin=' + this.userInfo.lat + ',' + this.userInfo.lng)
      arr.push('destination=latlng:' + this.storeInfo.latitude + ',' + this.storeInfo.longitude + '|name:' + this.storeInfo.realName)
      arr.push('region=' + this.cityName)
      arr.push('mode=walking&output=html&coord_type=bd09ll&src=webapp.baidu.openAPIdemo')
      let str = arr.join('&')
      let url = 'https://api.map.baidu.com/direction?' + str
      console.log('url:', url)
      console.log(str)
      // location.href = url 
      this.sendPoint('goNav', url)
    },
    changeInfoStatus () {
      this.infoStatus = 1
    },
    setShareOption () {
      let optObj = {
        moreItem: true, // 非必传，Boolean类型，是否隐藏APP内的右上角分享,默认为true
        share_title: '身边优惠', // 分享标题
        share_subtitle: '立刻戳我，发现更多身边优惠！', // 分享描述
        share_url: 'https://pb.jd.com/activity/2018/location/html/map.html?storeCode=' + this.storeCode, // 分享链接
        share_img: 'https://img30.360buyimg.com/jr_image/jfs/t16885/160/96786978/4628/8a691c3/5a5c760aN03e549ec.jpg', // 分享图标
        channels: ['1', '2', '3', '4', '5'] // 必传，0-微信朋友圈，1-微信好友，2-新浪微博，3-短信，4-QQ好友，5-QQ空间 金融环境微博短信不可用,商城环境短信不可用
      }
      window.JPFESDK.setShare(optObj)
    },
    sendPoint (id, url) {
      window.JPTrack.emit(['map', id], url)
    }
  }
}
</script>

<style lang='scss' scoped>
$r:100;
.container{
  width: 750rem/$r;
  height: 100vh;
  font-size: 24rem/$r;
  margin: 0 auto;
  .fullLoading{
    width: 100vw;
    height: 100vh;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    z-index: 10;
    /deep/ .van-loading{
      display: inline-block;
      transform: translate(-50%, -50%);
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }
  /deep/ #map{
    width: 750rem/$r;
    height: 100%;
  }
  // 地图上的样式
  /deep/ .storeInfo{
    position: relative;
    overflow: visible !important;
    div{
      position: absolute;
      background: rgba(0,0,0,.6);
      color: #fff;
      font-size: 24rem/$r;
      height: 38rem/$r;
      line-height: 40rem/$r;
      padding: 0 20rem/$r;
      border-radius: 20rem/$r;
      bottom: -36rem/$r;
      word-break: keep-all;
      white-space: nowrap;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  #shop-content{
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    width: 750rem/$r;
    margin: auto;
    .slide-bar{
      height: 70rem/$r;
      background: white;
      position: relative;
      border-bottom: 1px solid #f0f0f0;
      i{
        display: inline-block;
        width: 28rem/$r;
        height: 16rem/$r;
        background-image: url('./icon_topArrow.png');
        background-size: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    
  }
  #content-body{
    width: 100%;
    background-color: #f7f7f7;
    .shop-main{
      width: 100%;
      padding: 30rem/$r;
      display: flex;
      background-color: white;
      // logo图样式
      .shop-logo{
        flex-shrink: 0;
        flex-grow: 0;
        display: inline-block;
        width: 150rem/$r;
        height: 112rem/$r;
        border: 1px solid #f7f7f7;
        padding: 8rem/$r;
        margin-right: 10rem/$r;
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
      .shop-info{
        flex-shrink: 0;
        flex-grow: 1;
        max-width: 540rem/$r;
        // 商户名及距离
        .shop-line1{
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          .shop-name{
            font-size: 30rem/$r;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            // margin-right: 6rem/$r;
          }
          // 商户距离
          .shop-distance{
            flex-shrink: 0;
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
        // 商户的支付方式
        .shop-line2{
          display: flex;
          justify-content: space-between;
          margin-top: 10rem/$r;
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
        }
        .shop-line3{
          display: flex;
          justify-content: space-between;
          margin-top: 10rem/$r;
          .shop-address{
            font-size: 20rem/$r;
            color: #999;
            &::before{
              content: '';
              display: inline-block;
              width: 18rem/$r;
              height: 22rem/$r;
              background-image: url('//img30.360buyimg.com/jr_image/jfs/t1/29369/35/12757/479/5c9c55b2E81155da3/a2e59b79ae91fc3b.png');
              background-size: 100% 100%;
              margin-right: 10rem/$r;
              vertical-align: middle;
            }
          }
          .shop-nav{
            flex-shrink: 0;
            text-align: center;
            font-size: 20rem/$r;
            color: #2c68ff;
            background-color: #eaefff;
            border: 1px solid #2c68ff;
            border-radius: 2px;
            height: 34rem/$r;
            padding: 0 4rem/$r;
            margin-left: 10rem/$r;
            img{
              width: 24rem/$r;
              vertical-align: middle;
              margin-right: 4rem/$r;
            }
          }
        }
      }
    }
    // 功能区
    .shop-fn{
      padding: 20rem/$r 30rem/$r;
      .coupon-block{
        width: 100%;
        height: 100%;
        overflow: scroll;
        overflow-scrolling: touch;
        max-height: 50vh;
      }
      .coupon-none{
        text-align: center;
        width: 100%;
        height: 408rem/$r;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img{
          width: 169rem/$r;
        }
        .coupon-none-desc{
          font-size: 26rem/$r;
          line-height: 20rem/$r;
          color: #666;
          margin-top: 40rem/$r;
        }
      }
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.6s;
  max-height: 60vh;
}
.fade-enter, .fade-leave-to {
  max-height: 0;
}
</style>
