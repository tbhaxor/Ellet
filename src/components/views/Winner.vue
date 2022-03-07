<template>
  <div>
    <p>
      <strong style="margin-right: 15px">Winner:</strong>{{ winner || "N/A" }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "GetWinner",
  data() {
    return {
      winner: "",
    };
  },
  computed: {
    ...mapGetters(["account"]),
  },
  created() {
    this.$contract.methods
      .getWinner()
      .call({ from: this.account })
      .then((winner) => {
        this.winner = winner.toLowerCase();
      })
      .catch((e) => {
        const match = /revert (.+)/.exec(e.message);
        if (match && match[1]) {
          alert(match[1]);
        } else if (e.receipt) {
          alert("Transaction failed");
        }
      });
  },
};
</script>

<style>
</style>