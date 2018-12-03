import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import element from './element';
import axios from './axios';
import markedjs from './markedjs';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
