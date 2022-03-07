import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    availableAccounts: [],
    selectedAccount: "",
    chairperson: "",
    readyState: "connecting",
    page: ""
  },
  getters: {
    account: (state) => state.selectedAccount.toLowerCase(),
    accounts: (state) => state.availableAccounts.map(v => v.toLowerCase()),
    chairperson: (state) => state.chairperson.toLowerCase(),
    isReady: (state) => state.readyState == "ready",
    page: (state) => state.page
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
    },
    UPDATE_PAGE(state, payload) {
      state.page = payload
    }
  },
  actions: {
    setPage({ commit, getters }, payload) {
      const VOTER_VALID = ["Vote", "GetWinner"]
      const CHAIRPERSON_VALID = ["Register", "SetWeight"].concat(...VOTER_VALID);

      if ((getters.account === getters.chairperson && CHAIRPERSON_VALID.includes(payload)) || VOTER_VALID.includes(payload)) {
        commit("UPDATE_PAGE", payload)
      }
    },
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

      if (getters.account === getters.chairperson) {
        commit("UPDATE_PAGE", "Register")
      } else {
        commit("UPDATE_PAGE", "Vote")
      }

    },
    updateState({ commit }, payload) {
      commit("UPDATE_READY_STATE", payload)
    }
  },
})
