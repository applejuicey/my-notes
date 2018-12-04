import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topNavActiveIndex: null,
    sectionHeadingsArray: [],
  },
  mutations: {

    processTopNavActiveIndex: (state, indexFromCurrentComponent) => {
      state.topNavActiveIndex = indexFromCurrentComponent;
    },

    processSectionHeadingsArray: (state, headingsArrayFromNoteRenderer) => {
      state.sectionHeadingsArray = headingsArrayFromNoteRenderer;
    },

  },
  actions: {

    setTopNavActiveIndex: ({commit}, indexFromCurrentComponent) => {
      commit('processTopNavActiveIndex', indexFromCurrentComponent);
    },

    setSectionHeadingsArray: ({commit}, headingsArrayFromNoteRenderer) => {
      commit('processSectionHeadingsArray', headingsArrayFromNoteRenderer);
    },

  }
})
