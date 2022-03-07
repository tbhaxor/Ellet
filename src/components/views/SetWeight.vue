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
    <p>
      <strong style="margin-right: 15px">Select Address</strong>
      <input min="1" step="1" v-model="weight" type="number" />
    </p>
    <p><button @click="adjustWeight">Adjust Weight</button></p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import getAccountsMixin from "./mixins/getAccounts";

export default {
  name: "SetWeight",
  mixins: [getAccountsMixin],
  data() {
    return {
      address: "",
      weight: 1,
    };
  },
  computed: {
    ...mapGetters(["account"]),
  },
  methods: {
    adjustWeight() {
      this.$contract.methods
        .setWeight(this.address, this.weight)
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