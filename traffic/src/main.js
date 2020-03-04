import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'assets/scss/reset.scss'
// import Vant from 'vant'
// import 'vant/lib/index.css'
import Swipe from 'vant/lib/swipe'
import SwipeItem from 'vant/lib/swipe-item'
import Tab from 'vant/lib/tab'
import Tabs from 'vant/lib/tabs'
import 'vant/lib/swipe/style'
import 'vant/lib/swipe-item/style'
import 'vant/lib/tab/style'
import 'vant/lib/tabs/style'

Vue.use(Swipe).use(SwipeItem).use(Tab).use(Tabs)
Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm, info) {
  if (err) {
    const { message, stack } = err
    window.__sgm__.error({ msg: info + message, stack })
  }
  console.log('vue err vm info:')
  console.info(err)
  console.info(vm)
  console.info(info)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
