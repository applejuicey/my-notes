import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topNavActiveIndex: null,  //当前页面的索引，用于顶部导航栏的高亮
    sectionHeadingsArray: [], //笔记的Section的标题，用于笔记目录导航
    IDBDatabaseInfo: null,    //保存indexedDB的相关信息
  },
  mutations: {

    processTopNavActiveIndex: (state, indexFromCurrentComponent) => {
      state.topNavActiveIndex = indexFromCurrentComponent;
    },

    processSectionHeadingsArray: (state, headingsArrayFromNoteRenderer) => {
      state.sectionHeadingsArray = headingsArrayFromNoteRenderer;
    },

    processIDBDatabaseInfo: (state, databaseInfo) => {
      state.IDBDatabaseInfo = databaseInfo;
    },

  },
  actions: {

    setTopNavActiveIndex: ({commit}, indexFromCurrentComponent) => {
      commit('processTopNavActiveIndex', indexFromCurrentComponent);
    },

    setSectionHeadingsArray: ({commit}, headingsArrayFromNoteRenderer) => {
      commit('processSectionHeadingsArray', headingsArrayFromNoteRenderer);
    },

    setIDBDatabaseInfo: ({commit}, databaseInfo) => {
      commit('processIDBDatabaseInfo', databaseInfo);
    },

  }
})
