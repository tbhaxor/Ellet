import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["accounts", "chairperson"]),
    getAvailableAccounts() {
      return this.accounts.filter(v => v !== this.chairperson)
    }
  },
}