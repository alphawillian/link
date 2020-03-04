import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@jdpay/jdpay_css'

import vcps from '@jdpay/jdpay_vcps/lib'
Vue.use(vcps)
Vue.prototype.$FeToast = vcps.FeToast

Vue.config.productionTip = false
console.log('abc')
if (window.data_source) {
  const sourceData = window.data_source
  // 设置title
  document.title = sourceData.pageTitle || ''
  document.querySelector('title').innerText = sourceData.pageTitle || ''
  // 是否在线
  const timeNow = new Date().getTime()
  const timeInfo = sourceData.pageTime || {}
  const onlineDate = timeInfo.onlineDate
  const onlineLink = timeInfo.onlineLink
  const offlineDate = timeInfo.offlineDate
  const offlineLink = timeInfo.offlineLink
  if (onlineDate && onlineLink) {
    const timeStart = new Date(onlineDate).getTime()
    if (timeStart > timeNow) {
      console.log('未上线')
      location.href = onlineLink + '&timeLine=' + onlineDate
      // return false
    }
  }
  if (offlineDate && offlineLink) {
    const timeEnd = new Date(offlineDate).getTime()
    if (timeEnd < timeNow) {
      console.log('已下线')
      location.href = offlineLink
      // return false
    }
  }
  // 设置分享
  const shareData = sourceData.share
  const shareUrl = 'https://pb.jd.com/activity/2020/palm/index.html'
  const optObj = {
    share_title: shareData.title, // 分享标题
    share_subtitle: shareData.desc, // 分享描述
    share_url: shareUrl, // 分享链接
    share_img: shareData.logo // 分享图标
  }
  // eslint-disable-next-line
  window.JPFESDK.setShare(optObj)
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
