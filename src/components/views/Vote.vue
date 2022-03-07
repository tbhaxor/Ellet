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
    <p><button @click="vote">Submit Vote</button></p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import getAccounts from "./mixins/getAccounts";
export default {
  name: "SubmitVote",
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
    vote() {
      this.$contract.methods
        .submitVote(this.address)
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