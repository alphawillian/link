<template>
  <!-- <router-view/> -->
  <div class="container">
    <div class="block_main" v-show="pageStatus === 1">
      <div class="topLine searchLine">
        <span class="topLine_left" @click="goSearch(2)" >
          <span class="city_current">{{locatedCity.cityName | nameHandle}}</span><span class="icon_down_triangle"></span>
        </span>
        <span class="topLine_main" @click="goSearch(3)" >
          <span class="icon_search"></span>
          <span class="search_ph_main">搜索商家、服务或商品</span>
        </span>
        <span class="topLine_right icon_map" @click="href('//pb.jd.com/lbs/html/index.html')"></span>
      </div>
      <div class="searchLine_occupation"></div>
      <swipe :autoplay="3000">
        <swipe-item v-for="(item, index) in bannerList" :key="index">
          <img class="swipe_img" :src="item.imageUrl" @click="href(item.jumpUrl)"  >
        </swipe-item>
      </swipe>
      <div class="shop_list">
        <shop-item v-for="(item, index) in shopList" :key="index" :info="item"></shop-item>
        <div class="noMoreData" v-if="noMoreData">没有更多商户了</div>
      </div>
    </div>
    <div class="block_search_city" v-show="pageStatus === 2">
      <div class="searchLine" ref="searchLine_city" id="searchLine_city">
        <span class="searchLine_main">
          <span class="icon_search" @click="searchCity(searchTxtCity)"></span>
          <input v-model="searchTxtCity" type="search" ref="search_city" id="search_city" placeholder="搜索城市">
        </span>
        <span class="searchLine_right" @click="searchCancel">取消</span>
      </div>
      <div class="searchLine_occupation"></div>
      <div v-show="!isSearchingCity">
        <div class="current_city_line">
          当前定位 <span class="item_city city_located">{{locatedCity.cityName}}</span>
        </div>
        <div class="city_hot">
          <div class="line_title">热门城市</div>
          <div class="city_hot_list">
            <span class="item_city" v-for="(item, index) in hotCityList" :key="index" @click="selectCity(item)" >{{item.cityName}}</span>
          </div>
        </div>
        <div class="city_all_list">
          <div class="city_alpha_item" v-for="(item, index) in cityList" :key="index" v-if="item.cityList.length > 0" :ref="item.inital" :id="item.inital">
            <div class="line_title" v-if="item.cityList.length > 0">{{item.inital}}</div>
            <div class="item_city_line" v-for="(itemIn, indexIn) in item.cityList" :key="indexIn" @click="selectCity(itemIn)">{{itemIn.cityName}}</div>
          </div>
        </div>
        <div class="alpha_list">
          <span class="item_alpha" v-for="(item, index) in cityList" :key="index" v-if="item.cityList.length > 0" @click="goAnchor(item.inital)">{{item.inital}}</span>
        </div>
      </div>
      <div class="search_block" v-show="isSearchingCity">
        <div class="search_list" v-if="(searchResCity.length > 0)" >
          <div class="search_item" v-for="(item, index) in searchResCity" :key="index" @click="selectCity(item)" >{{item.cityName}}</div>
        </div>
        <div class="search_empty" v-else >
          <img src="./assets/images/bg_joy.png" alt="" srcset="">
          <p>很抱歉，未找到您想要的信息~</p>
        </div>
      </div>
      
    </div>
    <div class="block_search_shop" v-show="pageStatus === 3">
      <div class="searchLine" ref="searchLine_city" id="searchLine_city">
        <span class="searchLine_main">
          <span class="icon_search" @click="searchShop(searchTxtShop)"></span>
          <input v-model="searchTxtShop" type="search" ref="search_shop" id="search_shop" placeholder="搜索商家、服务或商品">
        </span>
        <span class="searchLine_right" @click="searchCancel">取消</span>
      </div>
      <div class="searchLine_occupation"></div>
      <div v-show="!isSearchingShop">
        <div class="shop_hot" v-if="hotShopList.length > 0">
          <div class="line_title">热门搜索</div>
          <div class="shop_hot_list">
            <span class="item_shop" v-for="(item, index) in hotShopList" :key="index" @click="searchTxt(item.title)" >{{item.title}}</span>
          </div>
        </div>
        <div class="shop_search_histroy" v-if="historySearch.length > 0">
          <div class="line_title history">历史搜索 <i class="icon_trash" @click="deleteStorage"></i> </div>
          <div class="shop_histroy_list">
            <span class="item_shop" v-for="(item, index) in historySearch" :key="index" @click="selectShop(item)" >{{item.storeName}}</span>
          </div>
        </div>
      </div>
      <div class="search_block" v-show="isSearchingShop">
        <div class="search_list" v-if="(searchResShop.length > 0)" >
          <div class="search_item" v-for="(item, index) in searchResShop" :key="index" @click="selectShop(item)" >{{item.storeName}}</div>
        </div>
        <div class="search_empty" v-else >
          <img src="./assets/images/bg_joy.png" alt="" srcset="">
          <p>很抱歉，未找到您想要的信息~</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShopItem from '../components/shopItem'
import SwipeItem from '../components/swipe/swipe-item.vue'
import Swipe from '../components/swipe/swipe.vue'
import { cityList, defaultCity } from '../data/cityInfo.js'
import * as api from '../api/service'
export default {
  name: '',
  components: {
    ShopItem,
    SwipeItem,
    Swipe
  },
  data () {
    return {
      pageSize: 10,
      pageIndex: 1,
      pageStatus: 1, // 页面状态1：主页面；2：城市列表页；3：商户搜索页
      bannerList: [],
      hotMerchant: [],
      cityList: cityList,
      defaultCity: defaultCity,
      searchTxtCity: '',
      searchTxtShop: '',
      isSearchingCity: false,
      isSearchingShop: false,
      isQueryingList: false,
      shopList: [],
      locatedCity: {},
      hotShopList: [],
      hotCityList: [],
      searchResCity: [],
      historySearch: [],
      searchResShop: [],
      noMoreData: false,
    }
  },
  watch: {
    searchTxtCity: function(val, oldVal) {
      if (val.length > 0) {
        this.isSearchingCity = true
      } else {
        this.isSearchingCity = false
      }
      this.searchCity(val)
    },
    searchTxtShop: function(val, oldVal) {
      console.log(val)
      if (val.length > 0) {
        this.isSearchingShop = true
      } else {
        this.isSearchingShop = false
      }
      this.searchShop(val)
    },
    locatedCity: function(val, oldVal) {
      console.log('城市切换：', val)
      this.pageIndex = 1
      this.queryShopList()
      this.changeHotMerchant()
    }
  },
  filters: {
    nameHandle: function (val) {
      if (!val) return ''
      if (val.length < 4) return val
      let length = val.length
      let res = ''
      // if ((val.lastIndexOf('市')) === length - 1 || (val.lastIndexOf('县')) === length - 1 || (val.lastIndexOf('州')) === length - 1) {
      //   res = val.substr(0, length - 1)
      // }
      // if ((val.lastIndexOf('自治区')) === length - 3 || (val.lastIndexOf('自治县')) === length - 3 || (val.lastIndexOf('自治州')) === length - 3) {
      //   res = val.substr(0, length - 3)
      // }
      return res
    }
  },
  created () {
    this.getLatLng()
    // this.queryShopList()
    this.queryTai()
    this.getStorage()
    this.scroll()
    // this.test()
  },
  mounted () {
  },
  methods: {
    filiter () {
      // 市 县 区 自治州 自治县 自治区
    },
    /**
     * 获取用户地理位置
     */
    getLatLng () {
      let _this = this
      let latLng = {}
      window.navigator.geolocation.getCurrentPosition( // 该函数有如下三个参数
        function(pos) { // 如果成果则执行该回调函数
          latLng.latitude = pos.coords.latitude
          latLng.longitude = pos.coords.longitude
          _this.getAreaInfo(latLng)
        // eslint-disable-next-line
        }, function(err) { // 如果失败则执行该回调函数
          console.log('未获取地理位置信息的处理逻辑')
          _this.locatedCity = _this.defaultCity
          // _this.queryShopList()
          // _this.changeHotMerchant()
        }, { // 附带参数
          enableHighAccuracy: true, // 提高精度(耗费资源)
          timeout: 10000, // 超过timeout则调用失败的回调函数
          maximumAge: 1000 // 获取到的地理信息的有效期，超过有效期则重新获取一次位置信息
        }
      )
    },
    /**
     * 通过经纬度获取位置信息
     */
    async getAreaInfo (latLng) {
      let isMatch = false
      latLng = {
        latitude: latLng.latitude,
        longitude: latLng.longitude
      }
      let location = latLng.latitude + ',' + latLng.longitude
      let params = {
        output: 'jsonp',
        get_poi: '0',
        key: '42DBZ-MDEK3-IKS3Q-3MI6O-YN2EE-NJFSL',
        location: location
      }
      let res = await api.queryCityInfo(params)
      for (let i = 0; i < this.cityList.length; i++) {
        let item = this.cityList[i]
        for (let j = 0; j < item.cityList.length; j++) {
          let itemIn = item.cityList[j]
          if (itemIn.cityCode.substr(0, 4) === res.result.ad_info.adcode.substr(0, 4)) {
            itemIn.default_lat = latLng.latitude
            itemIn.default_lng = latLng.longitude
            this.locatedCity = itemIn
            isMatch = true
            return false
          }
        }
      }
      if (!isMatch) {
        this.locatedCity = this.defaultCity
      }
    },
    goSearch (status) {
      let _this = this
      this.pageStatus = status
      if (status === 2) {
        setTimeout(function() {
          _this.$refs.search_city.focus()
        }, 200)
      }
      if (status === 3) {
        setTimeout(function() {
          _this.$refs.search_shop.focus()
        }, 200)
      }
    },
    // 城市搜索
    searchCity (str) {
      let tempArr = []
      console.log(this.cityList)
      this.cityList.forEach((item, index) => {
        item.cityList.forEach((itemIn, indexIn) => {
          if (itemIn.search_word.indexOf(str) !== -1) {
            tempArr.push(itemIn)
          }
        })
      })
      this.searchResCity = tempArr
    },
    // 商户搜索
    searchShop (str) {
      let tempArr = []
      this.shopList.forEach((item, index) => {
        if (item.storeName.indexOf(str) !== -1) {
          tempArr.push(item)
        }
      })
      this.searchResShop = tempArr
    },
    /**
     * 城市字母列表切换
     */
    goAnchor (selector) {
      let anchor = this.$refs[selector]
      let target = anchor[0].offsetTop - 45
      let doc = document.documentElement
      let bod = document.body
      doc.scrollTop = target
      bod.scrollTop = target
    },
    /**
     * 城市选择切换
     */
    selectCity (city) {
      this.locatedCity = city
      this.searchCancel()
      this.changeHotMerchant()
    },
    /**
     * 选择商户
     */
    selectShop (shop) {
      console.log(shop)
      this.setStorage(shop)
    },
    /**
     * 热门搜索文字
     */
    searchTxt (txt) {
      this.searchTxtShop = txt
    },
    /**
     * 取消搜索 返回主页
     */
    searchCancel () {
      this.searchTxtCity = ''
      this.searchTxtShop = ''
      this.pageStatus = 1
      let doc = document.documentElement
      let bod = document.body
      doc.scrollTop = 0
      bod.scrollTop = 0
    },
    /**
     * 获取历史记录
     */
    getStorage () {
      let historyRaw = localStorage.getItem('daojia_searchHistory')
      if (historyRaw) {
        this.historySearch = JSON.parse(historyRaw)
      } else {
        this.historySearch = []
      }
    },
    /**
     * 存储历史记录
     */
    setStorage (data) {
      let isEqual = false
      if (this.historySearch.length) {
        this.historySearch.forEach((item, index) => {
          if (isEqual) return
          if (item.storeId === data.storeId) {
            isEqual = true
          }
        })
      }
      if (!isEqual) {
        this.historySearch.push(data)
      }
      localStorage.setItem('daojia_searchHistory', JSON.stringify(this.historySearch))
      location.href = data.storeUrl
    },
    /**
     * 删除历史记录
     */
    deleteStorage () {
      console.log('delete')
      this.historySearch = []
      localStorage.setItem('daojia_searchHistory', JSON.stringify([]))
    },
    async queryShopList () {
      console.log('请求列表')
      let params = {
        latitude: this.locatedCity.default_lat,
        longitude: this.locatedCity.default_lng,
        // latitude: '39.7837551883',
        // longitude: '116.5623525768',
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      }
      this.isQueryingList = true
      try {
        let res = await api.queryShopList(params)
        console.log('shopList:', res.data)
        if (res.data.length > 0) {
          let tempList = this.pageIndex === 1 ? [] : this.shopList
          tempList.push(...res.data)
          console.log('tempList:', tempList)
          this.shopList = tempList
        }
        if (res.data.length < this.pageSize) {
          this.noMoreData = true
        }
        this.isQueryingList = false
      } catch (err) {
        this.isQueryingList = false
      }
    },
    async queryTai () {
      let tempParams = {
        businessType: 'JD_DAOJIA_SH'
      }
      console.log(encodeURIComponent(JSON.stringify(tempParams)))
      let params = {
        dataParam: encodeURIComponent(JSON.stringify(tempParams))
      }
      let res = await api.queryTai(params)
      console.log(res)
      let taiData = JSON.parse(res.matchedInfoJson)
      taiData.forEach((item, index) => {
        console.log(item)
        if (item.moduleKey === 'banner') {
          this.bannerList = item.subModuleVoList
        }
        if (item.moduleKey === 'hotCity') {
          let tempArr = []
          for (let i = 0; i < item.subModuleVoList.length; i++) {
            let hotCityInfo = item.subModuleVoList[i]
            for (let j = 0; j < this.cityList.length; j++) {
              let alphaItem = this.cityList[j]
              if (alphaItem.cityList.length > 0) {
                for (let m = 0; m < alphaItem.cityList.length; m++) {
                  let cityInfo = alphaItem.cityList[m]
                  if (cityInfo.cityCode === hotCityInfo.subTitle) {
                    tempArr.push(cityInfo)
                  }
                }
              }
            }
          }
          this.hotCityList = tempArr
          console.log(tempArr)
        }
        if (item.moduleKey === 'hotMerchant') {
          this.hotMerchant = item.subModuleVoList
          this.changeHotMerchant()
        }
      })
    },
    changeHotMerchant () {
      let isMatch = false
      for (let i = 0; i < this.hotMerchant.length; i++) {
        let item = this.hotMerchant[i]
        if (item.subTitle === this.locatedCity.cityCode) {
          isMatch = true
          this.hotShopList = item.threeModuleVoList
        }
      }
      if (!isMatch) {
        this.hotShopList = []
      }
    },
    href (href) {
      console.log(href)
      location.href = href
    },
    scroll() {
      window.onscroll = () => {
        // 距离底部100px时加载一次
        let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 100
        if (bottomOfWindow && this.isQueryingList === false && this.noMoreData === false) {
          this.pageIndex++
          this.queryShopList()
          console.log('start query')
        }
      }
    },
    test () {
      setTimeout(function() {
        let input1 = document.getElementById('search_city')
        console.log(input1)
        input1.focus()
      }, 2000)
    }
  }
}
</script>

<style lang='scss' scoped>
$r:100;
.container{
  width: 750rem/$r;
  .noMoreData{
    text-align: center;
    height: 60rem/$r;
    line-height: 60rem/$r;
    font-size: 16rem/$r;
  }
  .swipe_img{
    width: 100%;
    display: block;
  }
  .searchLine{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 80rem/$r;
    font-size: 24rem/$r;
    background: #eeeeee;
    padding: 0 20rem/$r;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: #eeeeee 0 3px 3px;
    .searchLine_main{
      flex-grow: 1;
      height: 50rem/$r;
      line-height: 50rem/$r;
      background-color: white;
      border-radius: 25rem/$r;
      color: #bbbbbb;
      display: flex;
      overflow: hidden;
      input{
        // width: 100%;
        height: 100%;
        line-height: 100%;
        flex-grow: 1;
        border: none;
        outline: none;
        padding-top: 2rem/$r;
      }
      ::-webkit-input-placeholder { 
        color:#dddddd;
        font-size:24rem/$r;
      }
      :-moz-placeholder {
        color:#dddddd;
        font-size:24rem/$r;
      }
      ::-moz-placeholder {
        color:#dddddd;
        font-size:24rem/$r;
      }
      input[type=search]::-webkit-search-cancel-button{
        -webkit-appearance: none;//此处只是去掉默认的小×
      }
      .icon_search{
        margin: 10rem/$r;
        margin-left: 18rem/$r;
        vertical-align: middle;
        flex-grow: 0;
        flex-shrink: 0;
        margin-right: 10rem/$r;
      }
      .search_ph_city{
        position: relative;
        top: 2rem/$r;
      }
    }
    .searchLine_right{
      display: inline-block;
      flex-grow: 0;
      flex-shrink: 0;
      margin-left: 10rem/$r;
      color: #3ea1e6;
    }
  }
  .searchLine_occupation{
    height: 80rem/$r;
  }
  .block_main{
  }
  .topLine{
    width: 100%;
    height: 80rem/$r;
    font-size: 24rem/$r;
    background: #eeeeee;
    padding: 0 20rem/$r;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .topLine_left{
      width: 120rem/$r;
      height: 50rem/$r;
      background: white;
      border-radius: 25rem/$r;
      margin-right: 10rem/$r;
      color: #333333;
      display: flex;
      align-items: center;
      justify-content: center;
      .city_current{
        display: inline-block;
        max-width: 74rem/$r;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .icon_down_triangle{
        display: inline-block;
        width: 16rem/$r;
        height: 10rem/$r;
        background-image: url('./assets/images/bg_down_triangle.png');
        background-size: 100% 100%;
        margin-left: 10rem/$r;
      }
    }
    .topLine_right{
      display: inline-block;
      flex-grow: 0;
      flex-shrink: 0;
      margin-left: 10rem/$r;
    }
    .icon_map{
      width: 38rem/$r;
      height: 35rem/$r;
      background-image: url('./assets/images/bg_map.png');
      background-size: 100% 100%;
    }
    .topLine_main{
      flex-grow: 1;
      height: 50rem/$r;
      line-height: 50rem/$r;
      background-color: white;
      border-radius: 25rem/$r;
      color: #bbbbbb;
      .icon_search{
        margin: 10rem/$r;
        margin-left: 18rem/$r;
        vertical-align: middle;
      }
      .search_ph_main{
        // line-height: 50rem/$r;
        position: relative;
        top: 2rem/$r;
      }
    }
  }
  .icon_search{
    display: inline-block;
    width: 30rem/$r;
    height: 30rem/$r;
    background-image: url('./assets/images/bg_search.png');
    background-size: 100% 100%;
  }
  // 搜索城市块
  .block_search_city{
    background: #f7f7f7;
    min-height: 100vh;
    .current_city_line{
      background-color: white;
      width: 100%;
      height: 100rem/$r;
      line-height: 100rem/$r;
      font-size: 24rem/$r;
      color: #999999;
      padding-left: 20rem/$r;
      display: flex;
      align-items: center;
    }
    .item_city{
      display: inline-block;
      min-width: 168rem/$r;
      height: 60rem/$r;
      line-height: 60rem/$r;
      text-align: center;
      border: 1px solid #bbb;
      border-radius: 30rem/$r;
      color: #666;
      font-size: 24rem/$r;
      padding: 0 2px;
      &.city_located{
        margin-left: 20rem/$r;
        &::before{
          content: "";
          display: inline-block;
          width: 22rem/$r;
          height: 26rem/$r;
          background-image: url('./assets/images/icon_located.png');
          background-size: 100% 100%;
          margin-right: 10rem/$r;
          vertical-align: text-top;
        }
      }
      
    }
    .line_title{
      background: #f7f7f7;
      width: 100%;
      height: 70rem/$r;
      line-height: 80rem/$r;
      font-size: 24rem/$r;
      color: #999999;
      padding-left: 20rem/$r;
    }
    // 热门城市
    .city_hot{
      font-size: 0;
      .city_hot_list{
        background-color: white;
        padding: 30rem/$r 0 14rem/$r 20rem/$r;
        .item_city{
          margin-right: 12rem/$r;
          margin-bottom: 16rem/$r;
        }
      }
    }
    // 全国城市列表
    .city_all_list{
      // background-color: white;
      .city_alpha_item{
        .item_city_line:nth-last-child(1){
          border: none;
        }
      }
      .item_city_line{
        background: white;
        height: 80rem/$r;
        line-height: 80rem/$r;
        padding-left: 40rem/$r;
        font-size: 24rem/$r;
        color: #333;
        border-bottom: 1px solid #eeeeee;
      }
    }
    // 字母bar
    .alpha_list{
      position: fixed;
      right: 10rem/$r;
      top: 600rem/$r;
      width: 36rem/$r;
      background-color: #eeeeee;
      padding-top: 10rem/$r;
      padding-bottom: 4rem/$r; 
      .item_alpha{
        display: block;
        width: 100%;
        text-align: center;
        color: #666666;
        font-size: 18rem/$r;
      }
    }
    
    
  }
  // 搜索结果
  .search_block{
    .search_empty{
      text-align: center;
      img{
        width: 150rem/$r;
        margin-top: 210rem/$r;
      }
      p{
        font-size: 28rem/$r;
        color: #999999;
        margin-top: 30rem/$r;
      }
    }
    .search_list{
      .search_item{
        background: white;
        height: 80rem/$r;
        line-height: 80rem/$r;
        font-size: 28rem/$r;
        color: #333333;
        padding-left: 40rem/$r;
        border-bottom: 1px solid #eeeeee;
        &::before{
          content: "";
          display: inline-block;
          width: 8rem/$r;
          height: 8rem/$r;
          border-radius: 50%;
          background-color: #bbbbbb;
          margin-right: 20rem/$r;
          vertical-align: middle;
          position: relative;
          top: -2rem/$r;
        }
      }
    }
  }

  // 搜索商户块
  .block_search_shop{
    width: 100%;
    min-height: 100vh;
    background-color: #f7f7f7;
    .line_title{
      background: #f7f7f7;
      width: 100%;
      height: 70rem/$r;
      line-height: 80rem/$r;
      font-size: 24rem/$r;
      color: #999999;
      padding-left: 20rem/$r;
      &.history{
        .icon_trash{
          display: inline-block;
          float: right;
          width: 26rem/$r;
          height: 24rem/$r;
          background-image: url('./assets/images/icon_trash.png');
          background-size: 100% 100%;
          margin-right: 20rem/$r;
          margin-top: 23rem/$r;
        }
      }
    }
    .item_shop{
      display: inline-block;
      background-color: #eeeeee;
      height: 48rem/$r;
      line-height: 48rem/$r;
      padding: 0 26rem/$r;
      font-size: 24rem/$r;
      color: #333333;
      border-radius: 24rem/$r;
    }
    .shop_hot_list{
      background-color: white;
      padding: 30rem/$r 10rem/$r 14rem/$r 20rem/$r;
      font-size: 0;
      .item_shop{
        margin-right: 20rem/$r;
        margin-bottom: 16rem/$r;
      }
    }
    .shop_search_histroy{
      .shop_histroy_list{
        background-color: white;
        padding: 30rem/$r 10rem/$r 14rem/$r 20rem/$r;
        font-size: 0;
        .item_shop{
          margin-right: 20rem/$r;
          margin-bottom: 16rem/$r;
        }
      }
    }
  }
}
</style>
