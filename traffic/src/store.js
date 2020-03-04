import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    ruleList: [],
    prizeList: [],
    rawCityInfo: {}
  },
  mutations: {
    SET_RULELIST: (state, data) => {
      state.ruleList = data
    },
    SET_PRIZELIST: (state, data) => {
      state.prizeList = data
    },
    SET_RAW_CITYINFO: (state, data) => {
      state.rawCityInfo = data
    }
  }
})