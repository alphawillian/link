<template>
  <div class="detail-container">
    <div style="background-color: #fff;">
      <h4 class="title">{{ cardInfo.title }}</h4>
      <p class="subtitle">{{ cardInfo.subTitle }}</p>
      <div class="card-item" :style="`background-image: url(${cardInfo.fullCardImage})`">
        <div class="item-city">{{ cardInfo.city }}</div>
        <div class="item-corner">{{ cardInfo.cardName }}</div>
      </div>
      <div class="info-item" v-if="cardInfo.cardUseType !== 'perTripCard'">
        <p class="info-title">今日剩余次数</p>
        <p class="info-content">{{ cardInfo.residueTimes }}次</p>
      </div>
      <div class="info-item">
        <p class="info-title">权益剩余时间</p>
        <p class="info-content">{{ cardInfo.residueDays }}天</p>
      </div>
      <div class="info-item">
        <p class="info-title">有效期</p>
        <p
          class="info-content"
        >{{ moment(cardInfo.startTime).format('YYYY.MM.DD') + ' - ' + moment(cardInfo.endTime).format('YYYY.MM.DD')}}</p>
      </div>
    </div>

    <div class="right-box" v-if="conmentList.length">
      <p class="right-text">权益说明</p>
      <p class="right-p" v-for="(item, index) in conmentList" :key="index">{{item}}</p>
    </div>

    <div v-if="DATASOURCE.linksObj.toUseLink" class="big-btn" @click="handleToUse">去使用</div>
  </div>
</template>

<script>
import moment from 'moment'
import Fetoast from 'components/toast/index.js'
import { sendPointFn } from '../utils/utils'
import {
  apiQueryCardDetail
} from 'api/service'

export default {
  name: 'card-detail',

  data () {
    return {
      DATASOURCE: {},
      cityCardImgList: [], // 配置平台城市卡面列表
      biz: 'USER_RIGHTS2',
      id: '',
      moudle: '',
      cardInfo: {}, // 卡信息
      conmentList: [] // 权益说明列表
    }
  },

  async created () {
    this.DATASOURCE = window.DATASOURCE
    this.cityCardImgList = window.DATASOURCE.cityCardImgList // 从配置平台获取数据

    await this.$nextTick()
    if (!this.$route.query.id || !this.$route.query.moudle) {
      Fetoast('很抱歉，参数有误')
      return false
    }
    this.id = this.$route.query.id
    this.moudle = this.$route.query.moudle

    let res = {}
    try {
      res = await apiQueryCardDetail({
        biz: this.biz,
        id: this.id,
        moudle: this.moudle
      })
    } catch (e) {
      Fetoast('很抱歉，请求数据有误')
      return false
    }

    // TODO MOCKDATA
    // res = {
    //   code: 'F_000000',
    //   msg: '成功',
    //   data: {
    //     'bizType': '123',
    //     'cardId': '2018102916550012',
    //     'cardImage': 'https://m.360buyimg.com/babel/jfs/t1/1703/27/12113/99861/5bd27cabE17eb3c27/c26ebeaeeee49f4f.jpg',
    //     'cardName': '襄阳地铁',
    //     'cardType': 'subway',
    //     'city': '北京',
    //     'cityCorn': 'hangzhou',
    //     'endTime': '2018-11-29 23:59:59',
    //     'materialId': '00215408858889561',
    //     'moudle': '123',
    //     'startTime': '2018-10-30 19:30:13',
    //     'subTitle': '襄阳地铁',
    //     'title': '襄阳地铁',
    //     'residueTimes': '30',
    //     'residueDays': 2,
    //     'conment': '权益权益权益说明权益权益权益说明权益权益权益说明权益权益权益说明权益权益权益说明权益权益权益说明权益权益权益说明权益权益权益说明权益权益权益说明权益权益权益说明'
    //   }
    // }

    if (res.code === 'F_000000') {
      let cardInfo = res.data
      for (let i = 0; i < this.cityCardImgList.length; i++) {
        if (cardInfo.cityCorn === this.cityCardImgList[i].city) {
          cardInfo.fullCardImage = this.cityCardImgList[i].img
        }
      }
      this.cardInfo = cardInfo
      if (cardInfo.conment) {
        this.conmentList = cardInfo.conment.split('***')
      }
    } else {
      Fetoast(res.msg)
    }
  },

  methods: {
    moment,
    handleToUse () { // 去使用
      sendPointFn('carddetail', 'default', 'use')
      setTimeout(() => {
        location.href = this.DATASOURCE.linksObj.toUseLink
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin bg-img {
  background-size: contain;
  background-repeat: no-repeat;
}
.detail-container {
  width: 7.5rem;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 0 0 1.3rem 0;
  /*padding-bottom: env(safe-area-inset-bottom);*/
  .title {
    font-size: .5rem;
    color: #333;
    margin: .32rem auto 0;
    padding: 0 0 0 .32rem;
  }
  .subtitle {
    font-size: .3rem;
    color: #999;
    padding: 0 0 0 .32rem;
  }
  .card-item {
    margin: .36rem auto .5rem;
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
      font-size: .66rem;
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
  .info-item {
    margin: 0 auto;
    padding: .5rem 0 .5rem .7rem;
    & + .info-item {
      border-top: 1px solid rgba(220,220,220,.7);
    }
    .info-title {
      font-size: .3rem;
      color: #666;
    }
    .info-content {
      font-size: .34rem;
      color: #333;
      font-weight: 500;
    }
  }
  .right-box {
    .right-text {
      margin: .6rem auto .3rem;
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
    .right-p {
      padding: 0.03rem .35rem;
      font-size: .24rem;
      color: #999999;
    }
  }
  .big-btn {
    width: 100%;
    /*height: 1rem;*/
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #f33f44;
    color: #fff;
    font-size: .34rem;
    text-align: center;
    line-height: 1rem;
    /*margin-bottom: env(safe-area-inset-bottom);*/
  
    padding-bottom: constant(safe-area-inset-bottom)!important;
    padding-bottom: env(safe-area-inset-bottom)!important;
    &::after {
      position: fixed;
      content: "";
      left: 0;
      bottom: 0;
      height: constant(safe-area-inset-bottom)!important;
      height: env(safe-area-inset-bottom)!important;
      width: 100%;
      z-index: 1;
      background-color: #f5f5f5;
    }
  }
}
</style>
