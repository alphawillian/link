import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'
import 'assets/scss/reset.scss'

Vue.config.productionTip = false

Vue.use(Vant)
new Vue({
  router,
  store,
  render: function (createElement) {
    return createElement(App)
  }
}).$mount('jdjr-div')