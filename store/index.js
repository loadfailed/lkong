import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    followlist: {}
  },

  mutations: {

    SET_FOLLOWLIST(state, followlist) {
      console.log('vuex', state.followlist)
      state.followlist = followlist
    }
  }

})

export default store