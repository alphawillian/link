<template>
  <div class="qa-container">
    <div class="qa-top">
      <div
        class="qa-top-item"
        v-for="(item, index) in tabList"
        :key="index"
        @click="handleJump(item)"
      >
        <img :src="item.imageUrl" alt>
        <p>{{ item.ext }}</p>
      </div>
    </div>
    <div class="qa-body">
      <h4 class="qa-title">{{ qaObj.title }}</h4>
      <div class="qa-item" v-for="(item, index) in qaObj.list" :key="index">
        <h5 class="qa-item-title">{{ item.title }}</h5>
        <p class="qa-item-content">{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Fetoast from 'components/toast/index.js'
import { sendPointFn } from '../utils/utils'
import {
  apiQueryQaTab
} from 'api/service'

export default {
  name: 'question',

  data () {
    return {
      tabList: [], // 接口获取的tablist
      qaObj: {} // 前端配置平台获取的固定常见问题
    }
  },

  async created () {
    this.qaObj = window.DATASOURCE.qaObj
    await this.$nextTick()

    let res = {}
    try {
      res = await apiQueryQaTab({
        biz: 'trafficHome',
        cityCode: '310000'
      })
    } catch (e) {
      Fetoast('很抱歉，请求数据有误')
      return false
    }

    // TODO MOCKDATA
    // res = {
    //   'code': 'F_000000',
    //   'data': {
    //     'display': '1',
    //     'ext': '',
    //     'frontType': '',
    //     'list': [
    //       {
    //         'bitFloat': '',
    //         'businessType': '221-236-0',
    //         'display': '1',
    //         'displayOrder': '',
    //         'dpl_url': '',
    //         'exposal_urls': '',
    //         'ext': '闪付问题',
    //         'ext2': '',
    //         'ext3': '',
    //         'id': '00215584320726476',
    //         'idAdResource': '0',
    //         'imageUrl': 'https://img12.360buyimg.com/jrpmobile/jfs/t1/82430/19/120/121750/5ce29e63E029aa2b0/94e2675ae8b276fb.png?width=690&height=240',
    //         'jumpUrl': 'https://www.jd.com',
    //         'msgBizLineId': '9010000',
    //         'openAd': '',
    //         'resourceType': 'oper_resource',
    //         'specialExt': '',
    //         'subTitle': '',
    //         'title': ''
    //       },
    //       {
    //         'bitFloat': '',
    //         'businessType': '221-236-0',
    //         'display': '1',
    //         'displayOrder': '',
    //         'dpl_url': '',
    //         'exposal_urls': '',
    //         'ext': '付款码问题',
    //         'ext2': '',
    //         'ext3': '',
    //         'id': '00215584320726476',
    //         'idAdResource': '0',
    //         'imageUrl': 'https://img12.360buyimg.com/jrpmobile/jfs/t1/82430/19/120/121750/5ce29e63E029aa2b0/94e2675ae8b276fb.png?width=690&height=240',
    //         'jumpUrl': 'https://www.jd.com',
    //         'msgBizLineId': '9010000',
    //         'openAd': '',
    //         'resourceType': 'oper_resource',
    //         'specialExt': '',
    //         'subTitle': '',
    //         'title': ''
    //       },
    //       {
    //         'bitFloat': '',
    //         'businessType': '221-236-0',
    //         'display': '1',
    //         'displayOrder': '',
    //         'dpl_url': '',
    //         'exposal_urls': '',
    //         'ext': '免密支付问题',
    //         'ext2': '',
    //         'ext3': '',
    //         'id': '00215584320726476',
    //         'idAdResource': '0',
    //         'imageUrl': 'https://img12.360buyimg.com/jrpmobile/jfs/t1/82430/19/120/121750/5ce29e63E029aa2b0/94e2675ae8b276fb.png?width=690&height=240',
    //         'jumpUrl': 'https://www.jd.com',
    //         'msgBizLineId': '9010000',
    //         'openAd': '',
    //         'resourceType': 'oper_resource',
    //         'specialExt': '',
    //         'subTitle': '',
    //         'title': ''
    //       },
    //       {
    //         'bitFloat': '',
    //         'businessType': '221-236-0',
    //         'display': '1',
    //         'displayOrder': '',
    //         'dpl_url': '',
    //         'exposal_urls': '',
    //         'ext': '打车问题',
    //         'ext2': '',
    //         'ext3': '',
    //         'id': '00215584320726476',
    //         'idAdResource': '0',
    //         'imageUrl': 'https://img12.360buyimg.com/jrpmobile/jfs/t1/82430/19/120/121750/5ce29e63E029aa2b0/94e2675ae8b276fb.png?width=690&height=240',
    //         'jumpUrl': 'https://www.jd.com',
    //         'msgBizLineId': '9010000',
    //         'openAd': '',
    //         'resourceType': 'oper_resource',
    //         'specialExt': '',
    //         'subTitle': '',
    //         'title': ''
    //       },
    //       {
    //         'bitFloat': '',
    //         'businessType': '221-236-0',
    //         'display': '1',
    //         'displayOrder': '',
    //         'dpl_url': '',
    //         'exposal_urls': '',
    //         'ext': '测试问题',
    //         'ext2': '',
    //         'ext3': '',
    //         'id': '00215584320726476',
    //         'idAdResource': '0',
    //         'imageUrl': 'https://img12.360buyimg.com/jrpmobile/jfs/t1/82430/19/120/121750/5ce29e63E029aa2b0/94e2675ae8b276fb.png?width=690&height=240',
    //         'jumpUrl': 'https://www.jd.com',
    //         'msgBizLineId': '9010000',
    //         'openAd': '',
    //         'resourceType': 'oper_resource',
    //         'specialExt': '',
    //         'subTitle': '',
    //         'title': ''
    //       },
    //       {
    //         'bitFloat': '',
    //         'businessType': '221-236-0',
    //         'display': '1',
    //         'displayOrder': '',
    //         'dpl_url': '',
    //         'exposal_urls': '',
    //         'ext': '测试问题',
    //         'ext2': '',
    //         'ext3': '',
    //         'id': '00215584320726476',
    //         'idAdResource': '0',
    //         'imageUrl': 'https://img12.360buyimg.com/jrpmobile/jfs/t1/82430/19/120/121750/5ce29e63E029aa2b0/94e2675ae8b276fb.png?width=690&height=240',
    //         'jumpUrl': 'https://www.jd.com',
    //         'msgBizLineId': '9010000',
    //         'openAd': '',
    //         'resourceType': 'oper_resource',
    //         'specialExt': '',
    //         'subTitle': '',
    //         'title': ''
    //       }
    //     ],
    //     'moduleKey': 'QA',
    //     'moduleName': '常见问题',
    //     'moduleNote': '',
    //     'moduleShowType': '',
    //     'moduleSubTitle': '',
    //     'moduleTitle': '',
    //     'moduleType': 'banner',
    //     'moduleUrl': '',
    //     'subModuleVos': [
    //
    //     ],
    //     'subModuleWithThreeLevelModuleVos': [
    //
    //     ]
    //   },
    //   'msg': '接口调用成功',
    //   'success': true
    // }

    if (res.code === 'F_000000') {
      this.tabList = res.data.list
    } else {
      Fetoast(res.msg)
    }
  },

  methods: {
    handleJump (item) {
      setTimeout(() => {
        location.href = item.jumpUrl
      }, 300)
      this.sendPoint(item.id)
    },
    // 发送埋点数据
    sendPoint (clickId, moduleId) {
      console.log('clickId:', clickId)
      const pageId = 'question'
      clickId = clickId || 'default'
      moduleId = moduleId || 'default'
      sendPointFn(pageId, moduleId, clickId)
    }
  }
}
</script>

<style lang='scss' scoped>
@mixin bg-img {
  background-size: contain;
  background-repeat: no-repeat;
}
.qa-container {
  width: 7.5rem;
  height: 100vh;
  margin: 0 auto;
  padding: .47rem 0 0 0;
}
.qa-top {
  margin: 0 0 .72rem 0;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  .qa-top-item {
    flex: 0 0 25%;
    -webkit-flex: 0 0 25%;
    margin: 0 0 .2rem 0;
    img {
      display: block;
      width: .93rem;
      height: .93rem;
      margin: 0 auto;
      border-radius: .1rem;
    }
    p {
      font-size: .26rem;
      text-align: center;
      color: #333;
    }
  }
}
.qa-body {
  padding: 0 .3rem;
  .qa-title {
    font-size: .32rem;
    position: relative;
    padding: 0 0 0 .14rem;
    margin: 0 0 .42rem 0;
    &::before {
      display: block;
      content: '';
      width: .06rem;
      height: .32rem;
      background-color: #f65651;
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
    }
  }
  .qa-item {
    margin: 0 auto .38rem;
    .qa-item-title {
      font-size: .3rem;
      font-weight: 400;
      color: #333;
    }
    .qa-item-content {
      font-size: .26rem;
      color: #999;
      padding: 0 0 0 .3rem;
    }
  }
}
</style>
