<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Ellet Ballot" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  created() {
    // get all the addresses on the chain
    this.$web3.eth
      .getAccounts()
      .then((accounts) => this.$store.dispatch("updateAccounts", accounts))
      .catch(() => this.$store.dispatch("updateAccounts"));
  },
  beforeDestroy() {
    this.$eth.off("accountsChanged", this.handleAccounts);
    this.$eth.off("connect", this.handleConnection);
    this.$eth.off("disconnect", this.handleDisconnect);
  },
  mounted() {
    this.$eth.on("connect", this.handleConnection);
    this.$eth.on("disconnect", this.handleDisconnect);
    this.$eth.on("accountsChanged", this.handleAccounts);
  },
  computed: {
    ...mapGetters(["isReady"]),
  },
  watch: {
    isReady(state) {
      if (state) {
        // get the chairperson address
        this.$contract.methods.chairperson().call((error, result) => {
          if (error) return console.error(error);
          this.$store.dispatch("updateChairperson", result);
        });

        // get the current addess of the
        this.$eth
          .request({ method: "eth_requestAccounts" })
          .then(([account]) => this.$store.dispatch("updateAccount", account));
      }
    },
  },
  methods: {
    /**
     * Handler function for the connect event fired initially when the metamask is connected
     */
    handleConnection() {
      this.$store.dispatch("updateState", "ready");
    },
    /**
     * Handler function for the accountsChanged event fired when the user has changed the account
     * @param {[string]}
     */
    handleAccounts([account]) {
      this.$store.dispatch("updateAccount", account);
    },
    /**
     * Handler function for the disconnect event fired when metamask is disconnedted
     */
    handleDisconnect() {
      this.$store.dispatch("updateAccounts");
      this.$store.dispatch("updateAccount");
      this.$store.dispatch("updateState", "disconnected");
      this.$store.dispatch("updateChairperson");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
