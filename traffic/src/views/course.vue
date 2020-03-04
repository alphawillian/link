<template>
  <div class="course-container">
    <div class="top-box"></div>
    <div class="content-box">
      <div class="course-item item1" v-if="DATASOURCE.linksObj.quickPayCourseLink">
        <p>贴近即可支付</p>
        <div class="big-btn" @click="toCourse(1)">闪付教程</div>
      </div>
      <div class="course-item item2" v-if="DATASOURCE.linksObj.codePayCourseLink">
        <p>扫码乘车</p>
        <div class="big-btn" @click="toCourse(2)">码支付教程</div>
      </div>
      <div class="course-item item3" v-if="DATASOURCE.linksObj.freePayCourseLink">
        <p>先乘车，后付费</p>
        <div class="big-btn" @click="toCourse(3)">免密出行教程</div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendPointFn } from '../utils/utils'
export default {
  name: 'course',
  
  data () {
    return {
      DATASOURCE: {}
    }
  },
  
  created () {
    this.DATASOURCE = window.DATASOURCE || {}
  },

  methods: {
    toCourse (type) { // 点击教程跳转
      let clickId = ''
      let href = ''
      if (type === 1) {
        clickId = 'quickpass'
        href = window.DATASOURCE.linksObj.quickPayCourseLink || 'https://www.jd.com'
      } else if (type === 2) {
        clickId = 'mentcode'
        href = window.DATASOURCE.linksObj.codePayCourseLink || 'https://www.jd.com'
      } else if (type === 3) {
        clickId = 'freepay'
        href = window.DATASOURCE.linksObj.freePayCourseLink || 'https://www.jd.com'
      }
      setTimeout(() => {
        window.location.href = href
      }, 300)
      this.sendPoint(clickId)
    },
    // 发送埋点数据
    sendPoint (clickId, moduleId) {
      const pageId = 'course'
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
.course-container {
  width: 7.5rem;
  min-height: 100vh;
  position: relative;
  background-image: linear-gradient(to bottom, #f33f44, #f97464);
  .top-box {
    width: 7.5rem;
    height: 4.37rem;
    @include bg-img;
    background-image: url(https://storage.jd.com/fe-traffic/images/course-top-bg.png);
  }
  .content-box {
    position: absolute;
    top: 1.9rem;
    left: 0;
    width: 100%;
    .course-item {
      padding: 1.1rem 0 0 0;
      margin: 0 auto .5rem;
      width: 6.9rem;
      height: 3.02rem;
      /*box-shadow: #ba1c04 0 0 .08rem .2rem;*/
      @include bg-img;
      &.item1 {
        background-image: url(https://storage.jd.com/fe-traffic/images/quickpay-item.png);
      }
      &.item2 {
        background-image: url(https://storage.jd.com/fe-traffic/images/codepay-item.png);
      }
      &.item3 {
        background-image: url(https://storage.jd.com/fe-traffic/images/freepay-item.png);
      }
      p {
        text-align: center;
        font-size: .38rem;
        font-weight: 600;
        color: #333;
      }
      .big-btn {
        margin: .4rem auto 0;
        width: 4.3rem;
        height: .8rem;
        border-radius: .1rem;
        background-image: linear-gradient(to bottom, rgba(255, 74, 76, 1), rgba(255, 67, 71, 1));
        text-align: center;
        line-height: .8rem;
        color: #fff;
        font-size: .34rem;
        box-shadow: 0 0 .08rem rgba(186, 28, 4, .8);
      }
    }
  }
}
</style>
