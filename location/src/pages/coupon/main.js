import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'assets/scss/reset.scss'
Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  // router,
  // store,
  render: h => h(App)
}).$mount('jdjr-div')
