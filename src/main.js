import Vue from 'vue'
import App from './App.vue'
import Web3 from "web3"

const httpWeb3 = new Web3.providers.HttpProvider("http://127.0.0.1:9545/")
Vue.prototype.$web3 = new Web3(httpWeb3)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
