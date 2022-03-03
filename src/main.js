import Vue from 'vue'
import App from './App.vue'
import Web3 from "web3"
import BallotContract from "@contracts/Ballot.json"

// Configure the web3 connection and ballot contract
const web3 = new Web3(new Web3.providers.HttpProvider(`${process.env.VUE_APP_CHAIN_PROTOCOL}://${process.env.VUE_APP_CHAIN_URL}`))
Vue.prototype.$web3 = web3
Vue.prototype.$contract = new web3.eth.Contract(BallotContract.abi, process.env.VUE_APP_CONTRACT_ADDRESS)
Vue.prototype.$eth = window.ethereum

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
