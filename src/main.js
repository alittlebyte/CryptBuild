import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import Vue2Filters from 'vue2-filters'
import VueNativeSock from 'vue-native-websocket'

Vue.use(Vuetify);
Vue.use(Vue2Filters);
Vue.use(VueNativeSock, 'wss://ws.coincap.io/trades/binance');

new Vue({
  el: '#app',
  render: h => h(App)
})
