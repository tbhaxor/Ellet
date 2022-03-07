<template>
  <div>
    <p>
      <strong style="margin-right: 15px">Select Address</strong>
      <select v-model="address">
        <option value="" disabled selected>--- Select Address ---</option>
        <option
          v-for="(account, index) in getAvailableAccounts"
          :key="index"
          :value="account"
        >
          {{ account }}
        </option>
      </select>
    </p>
    <p><button @click="register">Register</button></p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import getAccounts from "./mixins/getAccounts";

export default {
  name: "Register",
  data() {
    return {
      address: "",
    };
  },
  mixins: [getAccounts],
  computed: {
    ...mapGetters(["account"]),
  },
  methods: {
    async register() {
      this.$contract.methods
        .register(this.address)
        .send({ from: this.account })
        .then(() => alert("Saved"))
        .catch((e) => {
          const match = /revert (.+)/.exec(e.message);
          if (match && match[1]) {
            alert(match[1]);
          } else if (e.receipt) {
            alert("Transaction failed");
          }
        });
    },
  },
};
</script>

<style>
</style>