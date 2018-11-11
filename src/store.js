import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topNavActiveIndex: null,
  },
  mutations: {

    processTopNavActiveIndex: (state, indexFromCurrentComponent) => {
      state.topNavActiveIndex = indexFromCurrentComponent;
    },

  },
  actions: {

    setTopNavActiveIndex: ({commit}, indexFromCurrentComponent) => {
      commit('processTopNavActiveIndex', indexFromCurrentComponent);
    },

  }
})
