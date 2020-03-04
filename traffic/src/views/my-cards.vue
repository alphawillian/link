<template>
  <div class="my-cards-container">
    <div v-if="cardsList.length">
      <div class="cards-list">
        <div
          class="card-item"
          v-for="(item, index) in cardsList"
          :key="index"
          :style="`background-image: url(${item.fullCardImage})`"
          @click="handleToDetail(item)"
        >
          <div class="item-city">{{ item.city }}</div>
          <div class="item-corner">{{ item.cardName }}</div>
        </div>
      </div>
      <div class="buy-link" @click="handleToBuy(1)">点击查看更多出行权益>></div>
    </div>
    <div v-else>
      <div class="no-card-box"></div>
      <p class="no-card-text">暂无可使用的出行权益</p>
      <p class="right-text">出行权益</p>
      <div
        class="right-banner"
        :style="`background-image: url(${DATASOURCE.linksObj.buyCardImg})`"
        @click="handleToBuy(2)"
      ></div>
    </div>
  </div>
</template>

<script>
import Fetoast from 'components/toast/index.js'
import { sendPointFn } from '../utils/utils'
import {
  apiQueryCardsList
} from 'api/service'

export default {
  name: 'my-cards',

  data () {
    return {
      DATASOURCE: {}, // 配置平台获取数据
      cityCardImgList: [], // 配置平台城市卡面列表
      cardsList: [] // 我的卡列表
    }
  },

  async created () {
    this.DATASOURCE = window.DATASOURCE
    this.cityCardImgList = this.DATASOURCE.cityCardImgList // 从配置平台获取数据

    let res = {}
    try {
      res = await apiQueryCardsList()
    } catch (e) {
      console.log(e)
      Fetoast('获取数据异常')
      return false
    }

    // TODO MOCKDATA
    // res = {
    //   'code': 'F_000000',
    //   'data': [
    //     {
    //       'bizType': '123',
    //       'cardId': '2018102916550012',
    //       'cardImage': 'https://m.360buyimg.com/babel/jfs/t1/1703/27/12113/99861/5bd27cabE17eb3c27/c26ebeaeeee49f4f.jpg',
    //       'cardName': '襄阳地铁',
    //       'cardType': 'subway',
    //       'city': '北京',
    //       'cityCorn': 'hangzhou',
    //       'endTime': '2018-11-29 23:59:59',
    //       'materialId': '00215408858889561',
    //       'moudle': '123',
    //       'startTime': '2018-10-30 19:30:13',
    //       'subTitle': '襄阳地铁',
    //       'title': '襄阳地铁',
    //       'residueTime': '30'
    //     },
    //     {
    //       'bizType': '123',
    //       'cardId': '2018102916550012',
    //       'cardImage': 'https://m.360buyimg.com/babel/jfs/t1/1703/27/12113/99861/5bd27cabE17eb3c27/c26ebeaeeee49f4f.jpg',
    //       'cardName': '襄阳地铁',
    //       'cardType': 'subway',
    //       'city': '杭州',
    //       'cityCorn': 'hangzhou',
    //       'endTime': '2018-11-29 23:59:59',
    //       'materialId': '00215408858889561',
    //       'moudle': '123',
    //       'startTime': '2018-10-30 19:30:13',
    //       'subTitle': '襄阳地铁',
    //       'title': '襄阳地铁',
    //       'residueTime': '30'
    //     },
    //     {
    //       'bizType': '123',
    //       'cardId': '2018102916550012',
    //       'cardImage': 'https://m.360buyimg.com/babel/jfs/t1/1703/27/12113/99861/5bd27cabE17eb3c27/c26ebeaeeee49f4f.jpg',
    //       'cardName': '襄阳地铁',
    //       'cardType': 'subway',
    //       'city': '杭州',
    //       'cityCorn': 'hangzhou',
    //       'endTime': '2018-11-29 23:59:59',
    //       'materialId': '00215408858889561',
    //       'moudle': '123',
    //       'startTime': '2018-10-30 19:30:13',
    //       'subTitle': '襄阳地铁',
    //       'title': '襄阳地铁',
    //       'residueTime': '30'
    //     }
    //   ],
    //   'msg': '接口调用成功',
    //   'success': true
    // }

    if (res.code === 'F_000000') {
      if (res.data.length) { // 匹配城市卡面
        let arr = res.data
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < this.cityCardImgList.length; j++) {
            if (arr[i].cityCorn === this.cityCardImgList[j].city) {
              arr[i].fullCardImage = this.cityCardImgList[j].img
            }
          }
        }
        this.cardsList = arr
      } else {
        this.cardsList = []
      }
    } else {
      Fetoast(res.msg)
    }
  },
  mounted () {
    this.setShare()
  },
  methods: {
    handleToDetail (item) { // 去详情
      this.$router.push({
        path: '/carddetail',
        query: {
          id: item.materialId,
          moudle: item.moudle
        }
      })
      this.sendPoint('detail', 'card')
    },

    handleToBuy (type) { // 去购买
      setTimeout(() => {
        window.location.href = this.DATASOURCE.linksObj.buyCardLink
      }, 300)
      this.sendPoint(type === 1 ? 'hasCard' : 'noCard', 'buy')
    },
    // 设置分享
    setShare () {
      // eslint-disable-next-line
      const shareData = this.DATASOURCE.shareObj
      let optObj = {
        moreItem: true, // 非必传，Boolean类型，是否隐藏APP内的右上角分享,默认为true
        share_img: shareData.share_img, // 分享图标
        share_url: location.href, // 分享链接
        share_title: '我的权益卡', // 分享标题
        share_subtitle: shareData.share_subtitle, // 分享描述
        channels: ['1', '2', '3', '4', '5'] // 必传，0-微信朋友圈，1-微信好友，2-新浪微博，3-短信，4-QQ好友，5-QQ空间 金融环境微博短信不可用,商城环境短信不可用
      }
      window.JPFESDK.setShare(optObj)
    },
    // 发送埋点数据
    sendPoint (clickId, moduleId) {
      console.log('clickId:', clickId)
      const pageId = 'mycards'
      clickId = clickId || 'default'
      moduleId = moduleId || 'default'
      sendPointFn(pageId, moduleId, clickId)
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin bg-img {
    background-size: contain;
    background-repeat: no-repeat;
  }
.my-cards-container {
  width: 7.5rem;
  min-height: 100vh;
  position: relative;
}
.cards-list {
  margin: .5rem auto 0;
  .card-item {
    margin: 0 auto .3rem;
    width: 6.91rem;
    height: 3.94rem;
    position: relative;
    border-radius: .1rem;
    @include bg-img;
    background-size: 100% 100%;
    
    .item-city {
      height: .66rem;
      margin: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      left: .55rem;
      font-size: .5rem;
      line-height: .66rem;
      color: #fff;
    }
    .item-corner {
      padding: .05rem .15rem;
      position: absolute;
      right: 0;
      bottom: 0;
      font-size: .2rem;
      color: #fff;
      border-radius: .1rem 0 .1rem 0;
      background-image: linear-gradient(to right bottom, #ffa942, #f14440);
    }
  }
}
.no-card-box {
  margin: .93rem auto 0;
  width: 4.72rem;
  height: 3.18rem;
  @include bg-img;
  background-image: url(https://storage.jd.com/fe-traffic/images/no-card-bg.png);
}
.no-card-text {
  margin: .4rem auto 0;
  line-height: .3rem;
  font-size: .3rem;
  color: #999;
  text-align: center;
}
.right-text {
  margin: 2.11rem auto .37rem;
  text-align: center;
  font-size: .3rem;
  color: #333;
  position: relative;
  &::before {
    margin: auto;
    content: '';
    width: 2.42rem;
    position: absolute;
    left: .33rem;
    top: 0;
    bottom: 0;
    height: 1px;
    background-color: #dcdcdc;
  }
  &::after {
    margin: auto;
    content: '';
    width: 2.42rem;
    position: absolute;
    right: .33rem;
    top: 0;
    bottom: 0;
    height: 1px;
    background-color: #dcdcdc;
  }
}
.right-banner {
  width: 6.9rem;
  height: 1.6rem;
  margin: 0 auto;
  @include bg-img;
}
.buy-link {
  display: block;
  margin: 1rem auto;
  font-size: .3rem;
  text-align: center;
  text-decoration: underline;
  color: #fb7872;
}
</style>
