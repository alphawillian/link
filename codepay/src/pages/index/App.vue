<template>
  <div class="container">
    <div class="fullLoading" v-if="isLoading">
      <Loading type="spinner" />
    </div>
    <!-- 新用户的特殊展示 -->
    <div class="unOpen" v-if="isNewUser">
      <div class="mainTxt">
        <p class="line1">开通京东付款码</p>
        <p class="line2">立即领取</p>
        <img
          class="img_open"
          id="codepayOpen"
          src="./assets/images1/btn_open.png"
          @click="fakeA('//pb.jd.com/activity/2018/kaitonglingquan50/html/index.html?p_id=mfyy', 'open', 'open')"
          :clstag="'jr|keycount|mf0|open'"
        />
      </div>
      <div class="useTips">
        <div class="title">
          <div class="titleBg">TIPS</div>
          <div class="titleTxt">使用小技巧</div>
        </div>
        <div class="qr">
          <span class="img">
            <img src="./assets/images1/show_qr.png" />
          </span>
          <span class="txt">
            <p class="title">付款码</p>
            <p class="desc">出示给收银员</p>
            <p class="desc">扫描成功完成支付</p>
          </span>
        </div>
        <div class="scan">
          <span class="txt">
            <p class="title">扫一扫</p>
            <p class="desc">扫描京东支付二维码</p>
            <p class="desc">确认金额</p>
            <p class="desc">点击立即支付</p>
          </span>
          <span class="img">
            <img src="./assets/images1/show_scan.png" />
          </span>
        </div>
        <div class="notice">
          <p>*支持京东APP/京东金融APP</p>
          <p>有银联标识场景门店都可使用</p>
        </div>
      </div>
      <div class="layer"></div>
    </div>

    <div class="open">
      <template v-for="(item, index) in pageData">
        <!-- 顶部消息通知及banner -->
        <div :key="index" v-if="item.display === '1' && item.frontType === 'mf_01'">
          <div class="noticeLine" ref="notice">
            <span class="notice_icon">通知</span>
            <div class="notice_txt">
              <div class="notice_list" ref="noticeList">
                <p class="notice_item" v-for="(item, index) in noticeArr" :key="index">{{item}}</p>
                <p class="notice_item">{{noticeArr[0]}}</p>
              </div>
            </div>
          </div>

          <swipe :autoplay="3000" indicator-color="white">
            <swipe-item v-for="(item, index) in bannerArr" :key="index">
              <img
                class="swipe_img"
                style="width: 100%;"
                :src="item.imageUrl"
                :clstag="'jr|keycount|mf_banner|' + item.id"
                @click="fakeA(item.jumpUrl, 'banner', item.id);"
              />
            </swipe-item>
          </swipe>
        </div>
        <!-- icon入口 -->
        <template v-if="item.display === '1' && item.frontType === 'mf_02'">
          <div
            :key="index"
            id="resourceBlock"
            class="trackModule resourceBlock"
            data-track-module="icon"
          >
            <figure
              v-for="(item, index) in iconArr"
              :key="index"
              :clstag="'jr|keycount|mf_icon|' + item.id"
              @click="fakeA(item.jumpUrl, 'icon', item.id)"
            >
              <img :src="item.imageUrl" />
              <figcaption>{{item.title}}</figcaption>
            </figure>
          </div>
        </template>
        <!-- 单图 -->
        <template v-if="item.display === '1' && item.frontType === 'mf_03' && item.subModuleVos">
          <div
            :key="index"
            class="singleImg"
            :clstag="'jr|keycount|mf_singleImg|' + item.subModuleVos[0]"
            @click="fakeA(item.subModuleVos[0].jumpUrl, 'singleImg', item.subModuleVos[0].id)"
          >
            <img :src="item.subModuleVos[0].imageUrl" />
          </div>
        </template>
        <!-- 四个图文一个方框 -->
        <template v-if="item.display === '1' && item.frontType === 'mf_04'">
          <div class="rectangle rectangle4" :key="index">
            <div class="titleLine">
              <span class="title">{{item.moduleTitle}}</span>
              <span
                v-if="item.moduleUrl"
                class="more"
                :clstag="'jr|keycount|mf_rectangle4|more'"
                @click="fakeA(item.moduleUrl, 'rectangle4', 'moduleTitle')"
              >{{item.moduleSubTitle}}</span>
            </div>
            <ul class="content">
              <li
                v-for="(item, index) in rct4Arr"
                :key="index"
                :clstag="'jr|keycount|mf_rectangle4|' + item.id"
                @click="fakeA(item.jumpUrl, 'rectangle4', item.id)"
              >
                <span class="txt">
                  <div class="title">{{item.title}}</div>
                  <div class="desc">
                    <span
                      v-for="(itemTxt, indexTxt) in item.textArr"
                      :key="indexTxt"
                      :class="itemTxt.status === 0 ? 'normal' : 'special' "
                    >{{itemTxt.text}}</span>
                  </div>
                </span>
                <span class="img">
                  <img :src="item.imageUrl" />
                </span>
              </li>
            </ul>
          </div>
        </template>
        <!-- 三个图文一个方框 -->
        <template v-if="item.display === '1' && item.frontType === 'mf_05'">
          <div class="rectangle rectangle3" :key="index">
            <div class="titleLine">
              <span class="title">{{item.moduleTitle}}</span>
              <span
                v-if="item.moduleUrl"
                class="more"
                :clstag="'jr|keycount|mf_rectangle3|more'"
                @click="fakeA(item.moduleUrl, 'rectangle3', 'moduleTitle')"
              >{{item.moduleSubTitle}}</span>
            </div>
            <ul class="content" data-track-module="rectangle3">
              <li
                class="track"
                v-for="(item, index) in rct3Arr"
                :key="index"
                :clstag="'jr|keycount|mf_rectangle3|' + item.id"
                @click="fakeA(item.jumpUrl, 'rectangle3', item.id)"
              >
                <div class="title">{{item.title}}</div>
                <div class="img">
                  <img :src="item.imageUrl" />
                </div>
              </li>
            </ul>
          </div>
        </template>
        <!-- 金币模块 -->
        <template v-if="item.display === '1' && item.frontType === 'goldCoin'">
          <div class="block gold-coin" :key="index">
            <div class="titleLine">
              <span class="title">{{item.moduleTitle}}</span>
              <span
                v-if="item.moduleUrl"
                class="more"
                @click="fakeA(item.moduleUrl, 'goldCoin', 'moduleTitle')"
              >{{item.moduleSubTitle}}</span>
            </div>
            <div class="block-content">
              <div class="coin-content">
                <div class="coin-in">
                  <ul class="coin-list" :key="index">
                    <coin-item
                      v-for="(item, index) in coinList"
                      :key="index"
                      :info="item"
                      @excgCoupon="willExcg"
                      :clstag="'jr|keycount|mf_goldCoin|' + info.id"
                      @click="sendPoint('goldCoin', info.id)"
                    ></coin-item>
                  </ul>
                </div>
              </div>
              <div class="coin-info">
                <span
                  class="coin-my"
                  :clstag="'jr|keycount|mf_goldCoin|look'"
                  @click="goMyGoldCoin"
                >我的金币：{{myGoldCoinCount}}</span>
                <span class="coin-more">
                  <div
                    class="text"
                    :clstag="'jr|keycount|mf_goldCoin|show'"
                    @click="showCoinTask"
                  >做任务赚金币，领更多豪礼 ></div>
                  <div class="icon-getCoin" v-if="isMoreGoldCoin"></div>
                </span>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>

    <div id="dataLiehu" class="dataLiehu">
      <div class="blockTitle">优惠商家</div>
      <div class="dataLiehuIn">
        <!-- <div class="addressLine" id="focusSpan" @click="isShowSearch = true;autoFocusDelay()"> -->
        <div class="addressLine" id="focusSpan">
          <span class="icon_address"></span>
          <span class="addressTxt">{{curPosInfo}}</span>
          <!-- <span class="icon_rightArrow"></span> -->
        </div>
        <div id="storeBlock">
          <ul class="storeList">
            <shop-item v-for="(item, index) in shopList" :key="index" :info="item"></shop-item>
          </ul>
        </div>
      </div>
      <div class="loading-line" v-if="pagination.index > 1 && !isNoMoreShopData && isQueryingLiehu">
        <Loading type="spinner" />
      </div>
      <div
        class="loadMore"
        id="loadMore"
        v-if="pagination.index === 2 && !isQueryingLiehu && !isListenScroll && !isNoMoreShopData && !noShopData"
        @click="clickLoadMore"
        :clstag="'jr|keycount|mf_shop|more'"
      >
        <p>点击查看更多</p>
        <span></span>
      </div>
      <div class="noMore" v-if="isNoMoreShopData && !noShopData">没有更多商户了</div>
      <div class="noData" v-if="noShopData">
        <img
          src="//img30.360buyimg.com/jr_image/jfs/t1/25366/37/11324/7602/5c8ef993E5fc6c134/8f4e6beda537273e.png"
        />
        <div class="desc">未找到您附近的优惠商户~</div>
      </div>
      <input
        type="text"
        ref="hiddenInput"
        id="hiddenInput"
        class="hidden-input"
        v-model="searchText"
      />
    </div>
    <div id="addressBlock" class="addressBlock" v-show="isShowSearch">
      <div class="mask"></div>
      <div id="addressContent" class="addressContent">
        <div id="dialogClose" class="dialogClose" @click="searchCancel">取消</div>
        <div id="topLine" class="topLine">
          <span class="cityBlock" @click="searchStatus = 0">
            <span class="cityTxt">{{curCityInfo.subTitle}}</span>
            <span class="icon_downArrow"></span>
          </span>
          <span class="searchBlock">
            <span class="placeHolder" v-if="!searchText.length || true" @click="autoFocus">
              <span class="icon_dot"></span>
              <!-- <span class="placeHolderTxt">选择城市、小区、写字楼、学校</span> -->
            </span>
            <input
              type="search"
              ref="searchInput"
              id="searchInput"
              class="searchInput"
              placeholder="选择城市、小区、写字楼、学校"
              v-model="searchText"
            />
            <span class="icon_search"></span>
          </span>
        </div>
        <div class="addressCityBlock dialogBlock" v-if="searchStatus === 0">
          <ul class="cityList">
            <template v-for="(item, index) in cityInfoArr">
              <li
                class="cityItem"
                data-clickkey
                data-name="北京"
                v-show="item.ext !== curCityInfo.ext"
                :key="index"
                @click="willChangeCity(item)"
              >{{item.title}}</li>
            </template>
          </ul>
        </div>
        <div class="addressSearchBlock dialogBlock" v-else-if="searchStatus === 1">
          <ul class="searchList">
            <template v-for="(item, index) in searchResList">
              <li class="searchItem" :key="index" v-if="index < 5" @click="confirmAddress(item)">
                <div class="addressName">{{item.name || ''}}</div>
                <div class="addressDetail">{{item.address || ''}}</div>
              </li>
            </template>
          </ul>
        </div>
        <div
          class="historySearchBlock dialogBlock"
          v-else-if="searchStatus === 2 && searchHistoryList.length"
        >
          <div class="historyLine">
            <span class="historyTxt_left">历史记录</span>
            <span class="historyTxt_right" @click="handleLocalStorage('clear')">清除历史记录</span>
          </div>
          <ul class="searchList">
            <li
              class="searchItem"
              v-for="(item, index) in searchHistoryList"
              :key="index"
              @click="confirmAddress(item)"
            >
              <div class="addressName">{{item.name || ''}}</div>
              <div class="addressDetail">{{item.address || ''}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="full-mask" v-show="isShowDialog">
      <transition name="scale1">
        <div class="dialog" v-if="dialogStatus === 1">
          <span class="close" @click="closeDialog"></span>
          <div class="content modal">
            <div class="info-content">
              <span>确定使用{{currentCouponInfo.amount}}金币，兑换{{currentCouponInfo.name}}？</span>
            </div>
            <div class="btn-line">
              <button class="cancel" @click="closeDialog">取消</button>
              <button class="confirm" @click="doGoldCoinExcg">兑换</button>
            </div>
          </div>
        </div>
        <div class="dialog" v-if="dialogStatus === 2">
          <span class="close" @click="closeDialog"></span>
          <div class="content task">
            <div class="content-in">
              <ul class="task-list">
                <task-item
                  v-for="(item, index) in coinTaskList"
                  :key="index"
                  :info="item"
                  @getTask="getTask"
                  @getReward="getReward"
                ></task-item>
              </ul>
            </div>
          </div>
        </div>
        <div class="dialog popup" v-if="dialogStatus === 3">
          <img :src="popupData.imageUrl" @click="fakeA(popupData.jumpUrl, popupData.trackId)" />
          <span class="popup-close" @click="closeDialog"></span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { Toast, Loading, SwipeItem, Swipe } from 'vant'
import ShopItem from './components/shopItem'
import CoinItem from './components/coinItem'
import TaskItem from './components/taskItem'
import { queryUserStatus, queryModuleData, queryLiehuShopList, queryCityInfo, queryGoldList, goldCoinExcg, getTask, getReward } from '../../api/service'
import { getParams, getLngLat, docCookies } from '../../utils/utils.js'
export default {
  name: '',
  components: {
    SwipeItem,
    Swipe,
    Loading,
    ShopItem,
    CoinItem,
    TaskItem
  },
  data () {
    return {
      pagination: { // 页面数据
        index: 1,
        size: 10
      },
      lastTop: 0, // 固定页面
      isShowDialog: false, // 是否展示弹窗
      dialogStatus: 0, // 弹窗状态
      isShowSearch: false, // 是否展示搜索弹窗
      searchStatus: 2, // 搜索弹窗显示弹窗
      isLoading: true, // loading
      isNewUser: false, // 用户状态
      isGetUserPos: false, // 是否通过url或者定位获取用户经纬度
      isNoMoreShopData: false, // 是否没有更多附近商户数据了
      isQueryingLiehu: false, // 是否正在请求猎户数据
      noShopData: false, // 是否有附近商户
      isListenScroll: false, // 是否监听滚动事件
      geoPageStatus: 0, // 用户获取经纬度方法和获取用户页面数据的接口返回情况
      curPos: {}, // 用户的当前位置经纬度信息
      curPosInfo: '', // 用户的当前位置的文案信息
      firstPosStatus: 0, // 页面第一次定位时接口状态
      pageData: [], // 泰山数据用户页面展示
      cityInfoArr: [], // 泰山配置的城市信息,
      unConfirmCityInfo: {}, // 未确认的城市信息
      curCityInfo: {}, // 当前选择的城市信息
      noticeArr: [], // 消息通知数据
      bannerArr: [], // banner数据
      iconArr: [], // icon入口数据
      rct3Arr: [], // 三个图文一个方框的数据
      rct4Arr: [], // 四个图文一个方框的数据
      popupData: {}, // 弹窗数据
      shareInfo: {}, // 分享的数据
      clickKeyData: {}, // 点击埋点数据
      shopList: [], // 商户列表数据
      searchHistoryList: [], // 历史搜索记录列表
      searchResList: [], // 接口搜索结果列表
      historyMax: 5, // 历史记录长度,
      searchText: '', // 搜索的文本
      coinListRaw: [], // 泰山的金币数据
      coinList: [], // 金币券的列表数据
      coinTaskList: [], // 金币的任务列表
      myGoldCoinCount: 0, // 我的金币数
      isMoreGoldCoin: false, // 是否有金币待领取
      currentCouponInfo: {} // 当前准备兑换的券
    }
  },
  created () {
    this.doQueryUserStatus()
    // setTimeout(() => {
    this.getUserPos()
    // }, 2000)
    this.handleLocalStorage('init')
  },
  watch: {
    curPos (val) {
      this.pagination.index = 1
      this.isNoMoreShopData = false
      this.noShopData = false
      this.doQueryShopList()
    },
    geoPageStatus (val, oldVal) {
      if (val === 2) {
        this.setCurPos()
      }
    },
    searchText (val) {
      let realVal = val.replace(/(^\s*)|(\s*$)/g, '')
      if (!realVal) {
        this.searchStatus = 2
      } else {
        this.searchAddress(realVal)
      }
    },
    isShowDialog (val) {
      if (val) {
        this.pageFixed()
      } else {
        this.pageUnfixed()
      }
    },
    isShowSearch (val) {
      if (val) {
        this.pageFixed()
      } else {
        this.pageUnfixed()
      }
    }
  },
  mounted () {
    // this.autoFocusListen()
    this.keyboardFix()
  },
  methods: {
    // 获取用户经纬度
    async getUserPos () {
      let _this = this
      if (getParams('latitude') && getParams('longitude')) {
        this.curPos = {
          lat: getParams('latitude'),
          lng: getParams('longitude')
        }
        this.isGetUserPos = true
        this.geoPageStatus++
      } else {
        // let map = new BMap.Map('allmap')
        let geolocation = new window.BMap.Geolocation()
        geolocation.getCurrentPosition(function (r) {
          console.log('this.getStatus():', this.getStatus())
          if (this.getStatus() === 0) {
            _this.isGetUserPos = true
            _this.curPos = {
              lat: r.point.lat,
              lng: r.point.lng
            }
          } else {
            this.isGetUserPos = false
            Toast('未获取到您的位置，请在‘设置’中开启定位功能')
          }
          _this.geoPageStatus++
        }, { enableHighAccuracy: true })
        // 原来使用navigator.geolocation.getCurrentPosition()获取定位逻辑
        // try {
        //   let res = await getLngLat()
        //   if (res !== null && res.lat && res.lng) {
        //     this.isGetUserPos = true
        //     this.curPos = {
        //       lat: res.lat,
        //       lng: res.lng
        //     }
        //     console.log('获取到经纬度:', JSON.stringify(res))
        //     // this.doQueryCityInfo(res)
        //   } else {
        //     Toast('未获取到您的位置，请在‘设置’中开启定位功能')
        //     console.log('未获取到定位信息')
        //     this.isGetUserPos = false
        //   }
        //   this.geoPageStatus++
        // } catch (err) {
        //   this.isGetUserPos = false
        //   this.geoPageStatus++
        //   console.log('定位超时err:', err)
        //   // this.isGetGeo = false
        //   // this.locatedCity = this.defaultCity
        // }
      }
    },
    // 获取用户状态
    async doQueryUserStatus () {
      try {
        this.isLoading = true
        let res = await queryUserStatus()
        this.isLoading = false
        if (res.code === 'F_99999') {
          window.location.href = '//plogin.m.jd.com/user/login.action?appid=579&returnurl=' + encodeURIComponent(window.location.href)
          return false
        }
        this.isNewUser = res.data.newUser
        this.doQueryModuleData()
      } catch (err) {
        this.isLoading = false
        Toast('服务繁忙，请稍后再试！')
      }
    },
    // 获取页面泰山数据
    async doQueryModuleData () {
      try {
        let bussinessType = this.isNewUser ? 'FKM_COUPON_NEWUSER' : 'FKM_COUPON'
        let reqParams = {
          preview: false,
          bussinessType: bussinessType
        }
        this.isLoading = true
        let res = await queryModuleData(reqParams)
        console.log('taiRes:', res)
        if (res.success) {
          this.renderPage(res.data)
        } else {
          Toast('服务繁忙，请稍后再试！')
        }
        this.geoPageStatus++
        this.isLoading = false
      } catch (err) {
        this.geoPageStatus++
        this.isLoading = false
        Toast('服务繁忙，请稍后再试！')
      }
    },
    // 获取用户位置信息
    async doQueryCityInfo (data) {
      try {
        // let reqParams = {
        //   output: 'jsonp',
        //   get_poi: 0,
        //   key: '42DBZ-MDEK3-IKS3Q-3MI6O-YN2EE-NJFSL',
        //   location: data.lat + ',' + data.lng
        // }
        let reqParams = {
          output: 'json',
          coordtype: 'bd09ll',
          ak: 'gKgImcyCvlqHt5C3mGYFySeOwBaXOAr5',
          location: data.lat + ',' + data.lng
          // location: '39.929986,116.395645'
        }
        this.isLoading = true
        let res = await queryCityInfo(reqParams)
        this.isLoading = false
        if (res.status === 0) {
          this.curPosInfo = res.result.formatted_address
          // 原来有城市选择的逻辑，现在去除
          //   let matchCity = false
          //   this.cityInfoArr.forEach((item, index) => {
          //     if (item.ext.substr(0, 4) === res.result.ad_info.adcode.substr(0, 4)) {
          //       matchCity = true
          //       this.curCityInfo = item
          //       this.unConfirmCityInfo = item
          //       this.curPosInfo = res.result.address
          //     }
          //   })
          //   if (!matchCity) {
          //     this.curPos = {
          //       lat: this.cityInfoArr[0].ext2,
          //       lng: this.cityInfoArr[0].ext3
          //     }
          //   }
        }
      } catch (err) {
        this.isLoading = false
        Toast('服务繁忙，请稍后再试！')
      }
    },

    // 获取用户附近的商户列表
    async doQueryShopList () {
      if (this.isQueryingLiehu) return false
      let reqParams = {
        latitude: this.curPos.lat,
        longitude: this.curPos.lng,
        userLatitude: this.curPos.lat,
        userLongitude: this.curPos.lng,
        pageIndex: this.pagination.index,
        pageSize: this.pagination.size,
        queryBizType: '1000', // 码付运营页
        radius: '50000',
        fromS: getParams('p_id')
      }
      let res = {}
      try {
        this.isQueryingLiehu = true
        res = await queryLiehuShopList(reqParams)
        this.isQueryingLiehu = false
      } catch (err) {
        this.isQueryingLiehu = false
        Toast('服务繁忙，请稍后再试！')
      }
      if (res.resultCode === '0' && res.resultData && res.resultData.length) {
        if (this.pagination.index === 1) {
          this.shopList = []
          if (!res.resultData.length) {
            this.noShopData = true
          }
        }
        this.shopList.push(...res.resultData)
        // this.shopList = this.shopList.concat(res.data)
        if (res.resultData.length < this.pagination.size) {
          this.isNoMoreShopData = true
        }
      } else {
        this.isNoMoreShopData = true
      }
      if (!res.resultData && this.pagination.index === 1) {
        this.isNoMoreShopData = true
        this.noShopData = true
      }
      this.pagination.index++
    },
    // 获取金币任务列表
    async doQueryGoldList () {
      try {
        let idsArr = []
        let ids = ''
        this.coinList.forEach((item, index) => {
          idsArr.push(item.ext)
        })
        ids = idsArr.join(',')
        let reqParams = {
          plat: 32,
          ids: ids
        }
        let res = await queryGoldList(reqParams)
        if (res.success) {
          this.myGoldCoinCount = res.data.myGoldCoinCount
          this.isMoreGoldCoin = res.data.redIcon
          this.coinTaskList = res.data.tasks
          if (res.data.productInfos) {
            let obj = res.data.productInfos
            for (let key in obj) {
              this.coinList.forEach((item, index) => {
                if (item.ext === key) {
                  let tempObj = Object.assign({}, item)
                  tempObj.name = obj[key].name
                  tempObj.amount = obj[key].amount
                  tempObj.exchangeStatus = obj[key].exchangeStatus
                  this.$set(this.coinList, index, tempObj)
                }
              })
            }
          }
        }
      } catch (err) {

      }
    },
    // 金币兑换优惠券
    async doGoldCoinExcg () {
      this.closeDialog()
      try {
        let reqParams = {
          id: this.currentCouponInfo.ext
        }
        let res = await goldCoinExcg(reqParams)
        if (res.code === 'F_000000') {
          Toast('兑换成功')
          // this.doQueryGoldList()
          this.goldCoinExcgSucc()
        } else {
          Toast(res.msg || '活动火爆，请稍后再试')
        }
      } catch (err) {
        console.log(err)
        Toast('活动火爆，请稍后再试')
      }
    },
    // 领取任务
    async doGetTask (id) {
      try {
        let reqParams = {
          missionId: id
        }
        let res = await getTask(reqParams)
        if (res.code === 'F_000000') {
          Toast('任务领取成功')
          this.getTaskSucc(id)
        } else {
          Toast(res.msg || '活动火爆，请稍后再试')
        }
      } catch (err) {
        console.log(err)
        Toast('活动火爆，请稍后再试')
      }
    },
    // 领取奖励
    async doGetReward (id) {
      try {
        let reqParams = {
          missionId: id
        }
        let res = await getReward(reqParams)
        if (res.code === 'F_000000') {
          Toast('领取奖励成功')
          this.getRewardSucc(id)
        } else {
          Toast(res.msg || '活动火爆，请稍后再试')
        }
      } catch (err) {
        console.log(err)
        Toast('活动火爆，请稍后再试')
      }
    },
    searchAddress (address) {
      let _this = this
      // eslint-disable-next-line
      let searchService = new qq.maps.SearchService({
        complete: function (result) {
          if (!result.detail.pois) return
          _this.searchStatus = 1
          _this.searchResList = result.detail.pois
        },
        error: function (err) {
          _this.searchStatus = 2
          _this.searchResList = []
          Toast('无搜索结果')
          // $('#searchInput').blur()
          console.log(err)
        }
      })
      if (!this.curCityInfo.subTitle) {
        Toast('请先选择城市')
      } else {
        searchService.setLocation(this.curCityInfo.subTitle)
        searchService.search(address)
      }
    },
    // 处理页面数据
    renderPage (data) {
      this.pageData = data
      data.forEach((item, index) => {
        let frontType = item.frontType
        let display = item.display
        // 顶部通知
        if (frontType === 'mf_01' && display === '1') {
          this.noticeArr = item.moduleSubTitle.split('*')
          this.bannerArr = item.subModuleVos
          setTimeout(() => {
            this.noticeMove()
          }, 100)
        }
        // 图标文案icon入口
        if (frontType === 'mf_02' && display === '1') {
          this.iconArr = item.subModuleVos
        }
        // 四个图文一个方框
        if (frontType === 'mf_04' && display === '0') {
          let arr = []
          item.subModuleVos.forEach(function (item, index) {
            let obj = {
              textArr: []
            }
            let txt = item.subTitle
            let start = txt.indexOf('*')
            let end = txt.lastIndexOf('*')
            let txtNormal = ''
            let txtSpecial = ''
            // 有特殊文案
            if (start !== -1) {
              // 特殊文案在开头
              if (start === 0) {
                txtSpecial = txt.substr(1, end - 1)
                txtNormal = txt.substr(end + 1, 2)
                obj.textArr.push({ status: 1, text: txtSpecial })
                obj.textArr.push({ status: 0, text: txtNormal })
              } else { // 特殊文案在后面
                txtNormal = txt.substr(0, start)
                txtSpecial = txt.substr(start + 1, end - start - 1)
                obj.textArr.push({ status: 0, text: txtNormal })
                obj.textArr.push({ status: 1, text: txtSpecial })
              }
            } else {
              txtNormal = txt
              obj.textArr.push({ status: 0, text: txtNormal })
            }
            obj.imageUrl = item.imageUrl
            obj.jumpUrl = item.jumpUrl
            obj.title = item.title
            obj.id = item.id
            obj.moduleTitle = item.moduleTitle
            arr.push(obj)
          })
          this.rct4Arr = arr
        }
        // 三个图文一个方框
        if (frontType === 'mf_05' && display === '1') {
          let arr = []
          item.subModuleVos.forEach(function (item, index) {
            let obj = {
              imageUrl: item.imageUrl,
              title: item.title,
              jumpUrl: item.jumpUrl,
              id: item.id
            }
            arr.push(obj)
          })
          this.rct3Arr = arr
        }
        // 泰山的金币数据
        if (display === '1' && frontType === 'goldCoin') {
          // this.coinListRaw = item.subModuleVos
          this.coinList = item.subModuleVos
          // item.subModuleVos.forEach((item, index) => {
          //   item.amount = ''
          //   this.coinList.push(item)
          // })
          this.doQueryGoldList()
        }
        if (frontType === 'popup' && display === '1') {
          let isShow = false
          let day = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate() // 记录弹窗显示日期
          let cookieDay = docCookies.getItem('jdFeCodepayPop')
          if (!cookieDay || cookieDay !== day) {
            isShow = true
            docCookies.setItem('jdFeCodepayPop', day)
          }
          this.popupData = {
            isShow: isShow,
            imageUrl: item.subModuleVos[0].imageUrl,
            jumpUrl: item.subModuleVos[0].jumpUrl,
            trackId: item.subModuleVos[0].id
          }
          if (isShow) {
            this.isShowDialog = true
            this.dialogStatus = 3
          }
        }

        // 城市信息
        if (frontType === 'cityInfo') {
          this.cityInfoArr = item.subModuleVos
        }
        // 分享数据
        if (frontType === 'shareInfo') {
          this.shareInfo = {
            title: item.subModuleVos[0].title,
            desc: item.subModuleVos[0].subTitle,
            logo: item.subModuleVos[0].imageUrl
          }
          this.setShare()
        }
        // 埋点数据
        if (frontType === 'clickKey') {
          this.clickKeyData = {
            pageId: item.subModuleVos[0].title,
            pageBiz: item.subModuleVos[0].subTitle,
            btnBiz: item.subModuleVos[0].ext
          }
        }
      })
      setTimeout(() => {
        this.coinListScrollInit()
      }, 100)
    },
    // 设置默认位置
    setCurPos () {
      if (!this.isGetUserPos) {
        this.curPos = {
          lat: this.cityInfoArr[0].ext2,
          lng: this.cityInfoArr[0].ext3
        }
      }
      this.doQueryCityInfo(this.curPos)
    },
    // 将要切换城市
    willChangeCity (data) {
      // this.unConfirmCityInfo = data
      this.curCityInfo = data
      this.searchStatus = 2
    },
    // 确认选择的地址
    confirmAddress (data) {
      console.log('confirmData:', data)
      this.unConfirmCityInfo = this.curCityInfo
      this.curPosInfo = data.address
      this.curPos = {
        lat: data.latLng.lat,
        lng: data.latLng.lng
      }
      this.handleLocalStorage('add', data)
      this.searchCancel()
    },
    // 取消搜索
    searchCancel () {
      this.isShowSearch = false
      this.searchStatus = 2
      this.searchText = ''
      this.searchResList = []
      this.curCityInfo = this.unConfirmCityInfo
      // let dataLiehu = this.$refs.dataLiehu
      // console.log(dataLiehu)
      let anchor = this.$el.querySelector('#dataLiehu')
      let target = anchor.offsetTop
      // let doc = document.body || document.documentElement
      if (document.body && document.body.scrollTop) {
        document.body.scrollTop = target
      }
      if (document.documentElement && document.documentElement.scrollTop) {
        document.documentElement.scrollTop = target
      }
      console.log('target', target)
      // this.$nextTick(() => {
      //   dos
      // })
    },
    // 搜索框聚焦
    autoFocus () {
      this.$refs.searchInput.focus()
    },
    autoFocusDelay () {
      setTimeout(() => {
        this.$refs.searchInput.focus()
      }, 200)
    },
    autoFocusListen () {
      let u = window.navigator.userAgent
      let isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (!isIos) return false
      let focusSpan = document.getElementById('focusSpan')
      var input = document.getElementById('hiddenInput');
      focusSpan.addEventListener('click', function () {
        input.focus()
      })
    },
    // 点击加载更多
    clickLoadMore () {
      this.doQueryShopList()
      this.listenScroll()
    },
    pageFixed () {
      this.lastTop = document.body.scrollTop || document.documentElement.scrollTop
      document.body.setAttribute('style', 'overflow: hidden; position: fixed')
      document.documentElement.scrollTop = document.body.scrollTop = 0
    },
    pageUnfixed () {
      document.body.setAttribute('style', 'overflow: auto; position: relative');
      document.documentElement.scrollTop = document.body.scrollTop = this.lastTop
      this.lastTop = 0
    },
    // 键盘的特殊处理
    keyboardFix () {
      let _this = this
      document.addEventListener('touchstart', function (e) {
        _this.$refs.searchInput.blur()
        _this.$refs.hiddenInput.blur()
      }, false)
    },
    listenScroll () {
      if (this.pagination.index !== 2) return false
      window.onscroll = () => {
        this.isListenScroll = true
        // 距离底部10px时加载一次
        let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 10
        let bottomOfWindow1 = document.body.offsetHeight - document.body.scrollTop - window.innerHeight <= 10
        if ((bottomOfWindow || bottomOfWindow1) && this.isQueryingLiehu === false && this.isNoMoreShopData === false) {
          this.doQueryShopList()
        }
      }
    },
    // 兑换券成功后
    goldCoinExcgSucc () {
      let needCoin = this.currentCouponInfo.amount
      this.myGoldCoinCount = Number(this.myGoldCoinCount) - Number(needCoin)
      this.coinList.forEach((item, index) => {
        if (item.ext === this.currentCouponInfo.ext) {
          let tempObj = Object.assign({}, item)
          tempObj.name = this.currentCouponInfo.name
          tempObj.amount = this.currentCouponInfo.amount
          tempObj.exchangeStatus = 0
          this.$set(this.coinList, index, tempObj)
        }
      })
    },
    // 领取任务成功后
    getTaskSucc (id) {
      this.coinTaskList.forEach((item, index) => {
        if (item.missionId === id) {
          let tempObj = Object.assign({}, item)
          tempObj.status = 'getTask'
          this.$set(this.coinTaskList, index, tempObj)
        }
      })
    },
    // 领取奖励成功后
    getRewardSucc (id) { // 2
      this.coinTaskList.forEach((item, index) => {
        if (item.missionId === id) {
          this.myGoldCoinCount = Number(this.myGoldCoinCount) + parseInt(item.rewardOneDesc)
          let tempObj = Object.assign({}, item)
          tempObj.status = 2
          this.$set(this.coinTaskList, index, tempObj)
        }
      })
    },
    // 查看我的金币
    goMyGoldCoin () {
      this.sendPoint('goldCoin', 'lookMyGoldCoin')
      setTimeout(() => {
        location.href = '//m.jr.jd.com/member/gcmall/#/mine?channel=01-sffp'
      }, 300)
    },
    // 将要兑换券
    willExcg (data) {
      this.currentCouponInfo = data
      this.isShowDialog = true
      this.dialogStatus = 1
    },
    // 领取任务
    getTask (id) {
      this.doGetTask(id)
    },
    // 领取奖励
    getReward (id) {
      this.doGetReward(id)
    },
    // 展示金币任务列表
    showCoinTask () {
      this.isShowDialog = true
      this.dialogStatus = 2
      // setTimeout(() => {
      //   this.taskListScrollInit()
      // }, 400)
      this.$nextTick(() => {
        this.taskListScrollInit()
      })
    },
    // 关闭弹窗
    closeDialog () {
      this.dialogStatus = 0
      setTimeout(() => {
        this.isShowDialog = false
      }, 300)
    },
    fakeA (url, trackModule, trackId) {
      this.sendPoint(trackModule, trackId)
      setTimeout(() => {
        location.href = url
      }, 300)
    },
    // 发送埋点数据
    sendPoint: function (block, track) {
      let pageBiz = 'JR,FE,CODEPAY'
      let pageId = 'oldUser'
      if (this.isNewUser) {
        pageId = 'newUser'
      }
      if (!block) {
        block = 'default'
      }
      if (!track) {
        track = 'default'
      }
      // eslint-disable-next-line
      JPTrack.emit(pageBiz, [pageId, block, track])
    },
    // 顶部消息轮播
    noticeMove () {
      let $list = this.$refs.noticeList[0]
      let lineH = this.$refs.notice[0].clientHeight
      let listH = this.$refs.noticeList[0].clientHeight
      let length = Math.round(listH / lineH)
      // console.log('length:', length)
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
        // console.log('index:', index)
      }
      move()
    },
    // 处理本地存储数据
    handleLocalStorage (type, data) {
      if (type === 'init') {
        if (localStorage.getItem('codePay_searchHistory')) {
          let tempData = localStorage.getItem('codePay_searchHistory')
          tempData = JSON.parse(tempData)
          tempData.forEach((item, index) => {
            this.searchHistoryList.push(item)
          })
        }
      }
      if (type === 'add') {
        let dataEqual = false
        if (this.searchHistoryList.length > 0) {
          this.searchHistoryList.forEach((item, index) => {
            // item = JSON.parse(item)
            if (item.id === data.id) {
              dataEqual = true
              return false
            }
          })
        }
        if (dataEqual) return false
        if (this.searchHistoryList.length >= this.historyMax) {
          this.searchHistoryList.pop()
        }
        this.searchHistoryList.unshift(data)
        localStorage.setItem('codePay_searchHistory', JSON.stringify(this.searchHistoryList))
      }
      if (type === 'clear') {
        this.searchHistoryList = []
        localStorage.setItem('codePay_searchHistory', JSON.stringify(this.searchHistoryList))
      }
    },
    // 任务列表scroll初始化
    taskListScrollInit () {
      const wrapper = document.querySelector('.content-in')
      const scroll = new BScroll(wrapper)
      console.log(scroll)
    },
    // 金币列表scroll初始化
    coinListScrollInit () {
      const wrapper = document.querySelector('.coin-in')
      if (wrapper) {
        const scroll = new BScroll(wrapper, { scrollX: true })
        console.log(scroll)
      }
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
    }
  }
}

</script>

<style lang='scss' scoped>
$r:100;
.container{
  width: 750rem/$r;
  font-size: 10px;
  max-width: 750px;
  margin: 0 auto;
  color: #333;
  // padding-bottom: 20rem/$r;
  background-color: white;
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
  .loading-line{
    text-align: center;
    .van-loading{
      display: inline-block;
    }
  }
  // 通知栏
  .noticeLine {
    width: 100%;
    height: 50rem/$r;
    margin: 0 auto;
    background: #f0f0f0;
    padding-left: 20rem/$r;
    display: flex;
    align-items: center;
    font-size: 0;
    .notice_icon{
      display: inline-block;
      width: 85rem/$r;
      height: 30rem/$r;
      line-height: 30rem/$r;
      color: white;
      padding-left: 20rem/$r;
      background-image: url('assets/images1/icon_notice.png');
      background-size: 100% 100%;
      flex-grow: 0;
      flex-shrink: 0;
      margin-right: 20rem/$r;
      font-size: 20rem/$r;
    }
    .notice_txt{
      flex-grow: 1;
      height: 50rem/$r;
      overflow: hidden;
      position: relative;
      .notice_list{
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 0;
        .notice_item{
          line-height: 50rem/$r;
          font-size: 24rem/$r;
        }
      }
    }
    
  }
  .swipe_img{
    width: 100%;
  }
  // icon入口样式
  .resourceBlock{
    display: flex;
    justify-content: space-around;
    padding: 0 30rem/$r;
    margin-top: 20rem/$r;
    margin-bottom: 10rem/$r;
    figure{
      width: 120rem/$r;
      text-align: center;
      img{
        margin-bottom: 16rem/$r;
        width: 50rem/$r;
      }
      figcaption{
        font-size: 26rem/$r;
        text-align: center;
      }
    }
  }
  // 单图样式
  .singleImg{
    width: 710rem/$r;
    margin: 0 auto;
    img{
      width: 100%;
    }
  }
  // 三 四个资源位的样式
  .rectangle{
    width: 710rem/$r;
    margin: 0 auto;
    padding: 20rem/$r 0;
    .titleLine{
      width: 100%;
      height: 34rem/$r;
      margin-bottom: 20rem/$r;
      display: flex;
      justify-content: space-between;
      .title{
        font-size: 32rem/$r;
        color: #333333;
        padding-left: 6rem/$r;
        font-weight: bold;
        &::before{
          content: '';
          display: inline-block;
          width: 4rem/$r;
          height: 30rem/$r;
          background: #e2231a;
          margin-right: 16rem/$r;
        }
      }
      .more{
        color: #c3c3c3;
        font-size: 26rem/$r;
        line-height: 34rem/$r;
        &::after{
          content: '';
          display: inline-block;
          width: 16rem/$r;
          height: 20rem/$r;
          background-image: url('//img30.360buyimg.com/jr_image/jfs/t18661/48/1759162763/133/ba12ea76/5ad6b990N01cbf33b.png');
          background-size: 100% 100%;
        }
      }
    }
    // 四个资源位的样式
    &.rectangle4{
      .content{
        padding: 0 10rem/$r 0 10rem/$r;
        width: 100%;
        height: 300rem/$r;
        box-shadow: 0 0 17px 4px rgba(0,0,0,0.08);
        display: flex;
        flex-wrap: wrap;
        li{
          width: 50%;
          height: 50%;
          flex-shrink: 0;
          flex-grow: 0;
          display: flex;
          align-items: center;
          padding-left: 30rem/$r;
          .txt{
            flex-grow: 1;
            .title{
              font-size: 28rem/$r;
              color: #333333;
              margin-bottom: 10rem/$r;
            }
            .desc{
              font-size: 22rem/$r;
              height: 26rem/$r;
              // line-height: 0.11rem;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              // white-space: nowrap;
              // >span{
              //   display: inline-block;
              // }
              >p{
                display: inline-block;
              }
              .normal{
                color: #999;
              }
              .special{
                color: #e2231a;
              }
            }
          }
          .img{
            width: 120rem/$r;
            flex-shrink: 0;
            flex-grow: 0;
            img{
              display: block;
              margin: 0 auto;
              max-width: 72%;
            }
          }
          
        }
      }
    }
    // 三个资源位的样式
    &.rectangle3{
      .content{
        width: 100%;
        height: 220rem/$r;
        box-shadow: 0 0 17px 4px rgba(0,0,0,0.08);
        display: flex;
        text-align: center;
        align-items: center;
        li{
          width: 33.33%;
          flex-shrink: 0;
          .title{
            font-size: 28rem/$r;
            color: #333;
            margin-bottom: 10rem/$r;
          }
          .img{
            img{
              width: 42.2%;
            }
          }
        }
      }
    }
  }
  // 猎户模块的数据
  .dataLiehu{
    padding: 20rem/$r 20rem/$r 0 20rem/$r ;
    .dataLiehuIn{
      // box-shadow: 0 0 5px 1px #e4e3e3;
      box-shadow: 0 0 17px 4px rgba(0, 0, 0, 0.08);
      .addressLine {
        width: 100%;
        height: 76rem/$r;
        padding: 0 30rem/$r;
        background-color: #ededed;
        color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon_address {
          display: inline-block;
          width: 22rem/$r;
          height: 26rem/$r;
          background-image: url(//img30.360buyimg.com/jr_image/jfs/t22129/174/713055587/407/47bb2045/5b164bbaN531826da.png);
          background-size: 100% 100%;
          align-items: middle;
          position: relative;
        }
        .icon_rightArrow {
          display: inline-block;
          width: 14rem/$r;
          height: 22rem/$r;
          background-image: url(//img30.360buyimg.com/jr_image/jfs/t20587/134/739538044/218/806dd0ce/5b164bbaN6715ad4b.png);
          background-size: 100% 100%;
        }
        .addressTxt {
          flex-grow: 1;
          margin-left: 6rem/$r;
          margin-top: 4rem/$r;
          font-size: 24rem/$r;
        }
      }
    }
    .loadMore{
      &.hide{
        display: none;
      }
      margin-top: 20rem/$r;
      text-align: center;
      color: #999999;
      font-size: 24rem/$r;
      p{
        margin-bottom: 10rem/$r;
      }
      span{
        display: inline-block;
        width: 28rem/$r;
        height: 28rem/$r;
        border-top: 14rem/$r solid #999999;
        border-right: 15rem/$r solid transparent;
        border-left: 15rem/$r solid transparent;
      }
    }
    .noMore{
      margin-top: 20rem/$r;
      text-align: center;
      color: #999999;
      font-size: 24rem/$r;
    }
    .noData{
      height: 400rem/$r;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width: 169rem/$r;
      }
      .desc{
        color: #666;
        margin-top: 20rem/$r;
      }
    }
  }
  // 模块title
  .blockTitle{
    width: 710rem/$r;
    margin: 0 auto;
    font-size: 32rem/$r;
    color: #333333;
    margin-bottom: 20rem/$r;
    padding-left: 6rem/$r;
    font-weight: bold;
    &::before{
      content: '';
      display: inline-block;
      width: 4rem/$r;
      height: 30rem/$r;
      background: #e2231a;
      margin-right: 16rem/$r;
    }
  }
  // 金币模块
  .block{
    width: 710rem/$r;
    margin: 0 auto;
    padding: 20rem/$r 0;
    .titleLine{
      width: 100%;
      height: 34rem/$r;
      margin-bottom: 20rem/$r;
      display: flex;
      justify-content: space-between;
      .title{
        font-size: 32rem/$r;
        color: #333333;
        padding-left: 6rem/$r;
        font-weight: bold;
        &::before{
          content: '';
          display: inline-block;
          width: 4rem/$r;
          height: 30rem/$r;
          background: #e2231a;
          margin-right: 16rem/$r;
        }
      }
      .more{
        color: #c3c3c3;
        font-size: 26rem/$r;
        line-height: 34rem/$r;
        &::after{
          content: '';
          display: inline-block;
          width: 16rem/$r;
          height: 20rem/$r;
          background-image: url('//img30.360buyimg.com/jr_image/jfs/t18661/48/1759162763/133/ba12ea76/5ad6b990N01cbf33b.png');
          background-size: 100% 100%;
        }
      }
    }
    .block-content{
      width: 100%;
      box-shadow: 0 0 17px 4px rgba(0, 0, 0, 0.08);
    }
  }
  .block.gold-coin{
    .block-content{
      .coin-content{
        padding: 30rem/$r;
        padding-left: 15rem/$r;
        padding-top: 0;
        overflow: hidden;
        border-bottom: 1px solid #f0f0f0;
      }
      .coin-in{
        padding-top: 30rem/$r;
        overflow: hidden;
      }
      .coin-list{
        white-space: nowrap;
        display: inline-block;
        // overflow: scroll;
        // -webkit-overflow-scrolling: touch;
        // padding: 30rem/$r 30rem/$r 30rem/$r 15rem/$r;

        // display: flex;
        // flex-wrap: nowrap;

        &::-webkit-scrollbar{
          display: none;
        }
        .coin-item{
          flex-shrink: 0;
        }
      }
      .coin-info{
        width: 100%;
        height: 102rem/$r;
        padding: 0 30rem/$r 0 60rem/$r;
        font-size: 24rem/$r;
        color: #666;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .coin-my{
          &::before{
            content: '';
            display: inline-block;
            width: 24rem/$r;
            height: 24rem/$r;
            background-image: url('./assets/images1/icon_coin.png');
            background-size: 100% 100%;
            margin-right: 4rem/$r;
            vertical-align: text-top;
          }
        }
        .coin-more{
          position: relative;
          .icon-getCoin{
            position: absolute;
            right: 0;
            top: -26rem/$r;
            width: 90rem/$r;
            height: 28rem/$r;
            background-image: url('./assets/images1/icon_getCoin.png');
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  // 弹窗部分样式
  // 弹窗公共样式
  .full-mask{
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    position: fixed;
    top: 0;
    left: 0;
    .dialog{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      &.hide{
        transform: translate(-50%, -50%) scale(0, 0);
      }
      .close{
        position: absolute;
        right: -30rem/$r;
        top: -30rem/$r;
        display: inline-block;
        width: 60rem/$r;
        height: 60rem/$r;
        background-image: url('./assets/images1/icon_close.png');
        background-size: 100% 100%;
      }
    }

    // 兑换金币确认框
    .content.modal{
      width: 470rem/$r;
      border-radius: 10rem/$r;
      overflow: hidden;
      .info-content{
        height: 240rem/$r;
        padding: 0 26rem/$r;
        background-color: #f55f50;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 32rem/$r;
        text-align: center;
      }
      .btn-line{
        width: 100%;
        height: 100rem/$r;
        background: white;
        font-size: 30rem/$r;
        button{
          width: 50%;
          background: transparent;
          height: 100%;
          outline: none;
          border: none;
          &.cancel{
            color: #999;
            border-right: 1px solid #f0f0f0;
          }
          &.confirm{
            color: #f15748;
          }
        }
      }
    }
    // 金币任务列表弹窗
    .content.task{
      width: 630rem/$r;
      height: 1100rem/$r;
      background-image: url('./assets/images1/bg_task.png');
      background-size: 100% 100%;
      padding-top: 330rem/$r;
      .content-in{
        height: 730rem/$r;
        overflow: hidden;
        // overflow: scroll;
        // -webkit-overflow-scrolling: touch;
        // &::-webkit-scrollbar{
        //   display: none;
        // }
      }
      .task-list{
        
        // text-align: center;
      }
    }
    // 首次进入的广告弹窗
    .dialog.popup{
      text-align: center;
      width: 540rem/$r;
      img{
        display: block;
        width: 100%;
      }
      .popup-close{
        display: block;
        width: 80rem/$r;
        height: 177rem/$r;
        background: url(//img30.360buyimg.com/jr_image/jfs/t18502/1/1970428066/2629/33de8592/5ae054acN723be23a.png);
        background-size: 100% 100%;
        margin: 0 auto;
      }
    }
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .scale1-enter-active {
    animation: bounce-in .3s;
  }
  .scale1-leave-active {
    animation: bounce-in .3s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform:  translate(-50%, -50%) scale(0);
    }
    100% {
      transform:  translate(-50%, -50%) scale(1);
    }
  }
  // 地址更换选择
  .addressBlock{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    .mask{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: #000000;
      opacity: 0.4;
    }
    .addressContent{
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: white;
      .topLine{
        height: 80rem/$r;
        background: #eeeeee;
        padding: 16rem/$r 20rem/$r 0 20rem/$r;
        box-shadow: 0 1px 4px 1px #eeeeee;
        .cityBlock{
          display: inline-block;
          height: 50rem/$r;
          line-height: 50rem/$r;
          min-width: 120rem/$r;
          border-radius: 25rem/$r;
          background: white;
          text-align: center;
          .icon_downArrow{
            display: inline-block;
            width: 16rem/$r;
            height: 10rem/$r;
            background-image: url('//img30.360buyimg.com/jr_image/jfs/t20473/64/700553442/159/966bd5a3/5b164bbaNb41aec6d.png');
            background-size: 100% 100%;
          }
        }
        .searchBlock{
          display: inline-block;
          width: 570rem/$r;
          height: 50rem/$r;
          line-height: 50rem/$r;
          min-width: 120rem/$r;
          border-radius: 25rem/$r;
          background: white;
          float: right;
          position: relative;
          overflow: hidden;
          .placeHolder{
            position: absolute;
            left: 20rem/$r;
            z-index: 10;
            .icon_dot{
              display: inline-block;
              width: 8rem/$r;
              height: 8rem/$r;
              border-radius: 50%;
              background: #bbbbbb;
              margin-right: 6rem/$r;
              vertical-align: middle;
              position: relative;
              top: -1px;
            }
            .placeHolderTxt{
              height: 50rem/$r;
              line-height: 50rem/$r;
              font-size: 24rem/$r;
              color: #bbbbbb;
            }
          }
          .icon_search{
            position: absolute;
            right: 20rem/$r;
            top: 10rem/$r;
            display: inline-block;
            width: 30rem/$r;
            height: 30rem/$r;
            background-image: url('//img30.360buyimg.com/jr_image/jfs/t21895/248/725273802/602/afc455d4/5b164bb9Nd75527d3.png');
            background-size: 100% 100%;
          }
          .searchInput{
            position: absolute;
            left: 0;
            top: 0;
            width: 520rem/$r;
            height: 100%;
            color: #333333;
            padding-left: 30rem/$r;
            outline: none;
            -webkit-appearance:none; 
            border: none;
            line-height: 50rem/$r;
            :focus{
              color: red;
            }
          }
          input[type=search]::-webkit-search-cancel-button{
            appearance: none;
          }
          input[type=search]::search-cancel-button{
            appearance: none;
          }
        }
      }
      .dialogBlock{
        background: white;
      }
      .searchList{
        .searchItem{
          position: relative;
          width: 100%;
          height: 134rem/$r;
          padding: 30rem/$r 0 0 60rem/$r;
          border-bottom: 1px solid #e5e5e5;
          &:before{
            position: absolute;
            left: 20rem/$r;
            top: 32rem/$r;
            content: '';
            display: inline-block;
            width: 24rem/$r;
            height: 28rem/$r;
            background-image: url('//img30.360buyimg.com/jr_image/jfs/t21889/249/705969300/648/78c7a369/5b164bbaN48af87d2.png');
            background-size: 100% 100%;
          }
          .addressName{
            font-size: 28rem/$r;
          }
          .addressDetail{
            margin-top: 4rem/$r;
            font-size: 24rem/$r;
            color: #999999;
          }
        }
      }
      .addressCityBlock{
        .cityList{
          padding: 24rem/$r 20rem/$r 20rem/$r 20rem/$r;
          .cityItem{
            display: inline-block;
            width: 168rem/$r;
            height: 60rem/$r;
            line-height: 60rem/$r;
            overflow: hidden;
            text-align: center;
            border: 1px solid #e5e5e5;
            border-radius: 30rem/$r;
            margin-right: 8rem/$r;
            margin-bottom: 4rem/$r;
          }
        }

      }
      .addressSearchBlock{

      }
      .historySearchBlock{
        .historyLine{
          height: 66rem/$r;
          border-bottom: 1px solid #cccccc;
          padding: 0 20rem/$r;
          font-size: 24rem/$r;
          >span{
            display: inline-block;
            height: 100%;
            line-height: 66rem/$r;
          }
          .historyTxt_right{
            float: right;
          }
        }
      }
      .dialogClose{
        position: fixed;
        bottom: 60rem/$r;
        transform: translateX(-50%);
        left: 50%;
        display: inline-block;
        width: 200rem/$r;
        height: 60rem/$r;
        line-height: 60rem/$r;
        text-align: center;
        border: 1px solid white;
        border-radius: 30rem/$r;
        color: white;
        font-size: 28rem/$r;
        letter-spacing: 4px;
        z-index: 0;
      }
    }
  }
  // 隐藏的input输入框
  .hidden-input{
    z-index: -100;
    width: 0;
    height:0;
    opacity: 0;
  }
  // 用户未开通码付
  .unOpen{
    &.hide{
      display: none;
    }
    width: 750rem/$r;
    background-image: url('./assets/images1/bg_unopen.png');
    background-repeat: no-repeat;
    background-size: 100%;
    padding-top: 125rem/$r;
    padding-bottom: 40rem/$r;
    position: relative;
    .mainTxt{
      width: 470rem/$r;
      height: 300rem/$r;
      margin: 0 auto;
      font-size: 52rem/$r;
      text-align: center;
      line-height: 66rem/$r;
      padding-top: 40rem/$r;
      .line1{
        color: #f7ecc9;
      }
      .line2{
        color: #ece0ba;
      }
      .img_open{
        width: 310rem/$r;
      }
    }
    .useTips{
      width: 710rem/$r;
      height: 560rem/$r;
      margin: 50rem/$r auto 0 auto; 
      background-color: white;
      box-shadow: 0 0 17px 4px rgba(0, 0, 0, 0.08);
      padding-top: 20rem/$r;
      position: relative;
      color: #333333;
      .title{
        position: relative;
        text-align: center;
        height: 100rem/$r;
        line-height: 100rem/$r;
        .titleBg{
          font-size: 100rem/$r;
          color: #d84c54;
          opacity: 0.07;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%)
        }
        .titleTxt{
          font-size: 36rem/$r;
          color: #333333;
          font-weight: bold;
          &::before{
            display: inline-block;
            content: "";
            width: 23rem/$r;
            height: 30rem/$r;
            background-image: url('./assets/images1/icon_tips.png');
            background-size: 100% 100%;
            margin-right: 14rem/$r;
          }
          &::after{
            display: inline-block;
            content: "";
            width: 23rem/$r;
            height: 30rem/$r;
            background-image: url('./assets/images1/icon_tips.png');
            background-size: 100% 100%;
            margin-left: 14rem/$r;
            transform: rotateZ(180deg);
          }
        }
      } 
      .qr{
        position: absolute;
        left: 0;
        top: 180rem/$r;
        text-align: left;
        width: 100%;
        .img{
          width: 180rem/$r;
          height: 312rem/$r;
          font-size: 0;
          display: inline-block;
          img{
            width: 100%;
          }
        }
        .txt{
          display: inline-block;
          position: absolute;
          bottom: 20rem/$r;
          left: 200rem/$r;
          .title{
            font-size: 28rem/$r;
            height: 36rem/$r;
            line-height: 36rem/$r;
            text-align: left;
            &::before{
              content: '';
              display: inline-block;
              width: 4rem/$r;
              height: 24rem/$r;
              background-color: #e2231a;
              margin-right: 10rem/$r;
            }
          }
          .desc{
            font-size: 24rem/$r;
            line-height: 30rem/$r;
            &::before{
              content: '';
              display: inline-block;
              width: 6rem/$r;
              height: 6rem/$r;
              border-radius: 50%;
              background-color: #999999;
              margin-right: 10rem/$r;
              position: relative;
              top: -6rem/$r;
            }
            
          }
        }
      }
      .scan{
        position: absolute;
        right: 0;
        top: 140rem/$r;
        width: 100%;
        text-align: right;
        .img{
          width: 188rem/$r;
          height: 340rem/$r;
          font-size: 0;
          display: inline-block;
          img{
            width: 100%;
          }
        }
        .txt{
          display: inline-block;
          position: absolute;
          top: 20rem/$r;
          right: 200rem/$r;
          text-align: right;
          .title{
            font-size: 28rem/$r;
            height: 36rem/$r;
            line-height: 36rem/$r;
            text-align: right;
            &::after{
              content: '';
              display: inline-block;
              width: 4rem/$r;
              height: 24rem/$r;
              background-color: #e2231a;
              margin-left: 10rem/$r;
            }
          }
          .desc{
            font-size: 24rem/$r;
            line-height: 30rem/$r;
            &::after{
              content: '';
              display: inline-block;
              width: 6rem/$r;
              height: 6rem/$r;
              border-radius: 50%;
              background-color: #999999;
              margin-left: 10rem/$r;
              position: relative;
              top: -6rem/$r;
            }
            
          }
        }
      }
      .notice{
        position: absolute;
        right: 20rem/$r;
        bottom: 20rem/$r;
        text-align: right;
        color: #999999;
        font-size:18rem/$r;
        line-height: 24rem/$r;
      }
    }
    .layer{
      display: inline-block;
      width: 250rem/$r;
      height: 350rem/$r;
      background: url('./assets/images1/bg_layer.png');
      background-size: 100% 100%;
      position: absolute;
      top: 296rem/$r;
      left: 0;
    }
  }
  
}
</style>
