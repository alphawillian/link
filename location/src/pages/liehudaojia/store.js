import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rawCityInfo: {},
    currentLatLng: {},
    selectedCity: {},
    confirmedCity: {},
    addressChange: false
  },
  mutations: {
    SET_RAW_CITYINFO: (state, data) => {
      state.rawCityInfo = data
    },
    SET_CURRENT_LATLNG: (state, data) => {
      state.currentLatLng = data
    },
    SET_SELECTED_CITY: (state, data) => {
      state.selectedCity = data
    },
    SET_CONFIRM_CITY: (state, data) => {
      state.confirmedCity = data
    },
    SET_ADDRESSCHANGE: (state, data) => {
      state.addressChange = data
    }
  },
  actions: {

  }
})
