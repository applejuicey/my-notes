import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topNavActiveIndex: null,
    sectionTitlesArray: [],
  },
  mutations: {

    processTopNavActiveIndex: (state, indexFromCurrentComponent) => {
      state.topNavActiveIndex = indexFromCurrentComponent;
    },

    processSectionTitlesArray: (state, titlesArrayFromNoteRenderer) => {
      state.sectionTitlesArray = titlesArrayFromNoteRenderer;
    },

  },
  actions: {

    setTopNavActiveIndex: ({commit}, indexFromCurrentComponent) => {
      commit('processTopNavActiveIndex', indexFromCurrentComponent);
    },

    setSectionTitlesArray: ({commit}, titlesArrayFromNoteRenderer) => {
      commit('processSectionTitlesArray', titlesArrayFromNoteRenderer);
    },

  }
})
