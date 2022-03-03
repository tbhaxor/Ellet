import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    availableAccounts: [],
    selectedAccount: "",
    chairperson: "",
    readyState: "connecting"
  },
  getters: {
    account: (state) => state.selectedAccount.toLowerCase(),
    accounts: (state) => state.availableAccounts.map(v => v.toLowerCase()),
    chairperson: (state) => state.chairperson.toLowerCase(),
    isReady: (state) => state.readyState == "ready"
  },
  mutations: {
    UPDATE_ACCOUNTS(state, payload) {
      state.availableAccounts = payload
    },
    UPDATE_ACCOUNT(state, payload) {
      state.selectedAccount = payload
    },
    UPDATE_CHAIRPERSON(state, payload) {
      state.chairperson = payload
    },
    UPDATE_READY_STATE(state, payload) {
      state.readyState = payload
    }
  },
  actions: {
    updateChairperson({ commit, getters }, payload) {
      payload = payload && payload.toLowerCase()
      if (payload && getters.accounts.includes(payload)) {
        commit("UPDATE_CHAIRPERSON", payload)
      } else if (typeof payload === "undefined" || payload === null) {
        commit("UPDATE_CHAIRPERSON", "")
      }
    },
    updateAccounts({ commit }, payload) {
      if (!payload || !payload.length) {
        commit("UPDATE_ACCOUNTS", [])
      } else {
        commit("UPDATE_ACCOUNTS", payload)
      }

    },
    updateAccount({ commit, getters }, payload) {
      if (payload && getters.accounts.includes(payload)) {
        commit("UPDATE_ACCOUNT", payload || null)
      } else if (typeof payload === "undefined" || payload === null) {
        commit("UPDATE_ACCOUNT", "")
      }
    },
    updateState({ commit }, payload) {
      commit("UPDATE_READY_STATE", payload)
    }
  },
})
