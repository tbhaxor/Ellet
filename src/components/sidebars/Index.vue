<template>
  <div>
    <p><strong>Navigation</strong></p>
    <chairperson v-if="isChairperson" />
    <voter v-else />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chairperson from "./Chairperson.vue";
import Voter from "./Voter.vue";

export default {
  components: { Voter, Chairperson },
  name: "Sidebar",
  props: {
    isChairperson: {
      required: true,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(["account", "chairperson"]),
  },
};
</script>

<style scoped>
div {
  float: left;
  width: 150px;
  min-height: 400px;
}
</style>