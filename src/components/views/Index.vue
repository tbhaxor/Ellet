<template>
  <component :is="page" />
</template>

<script>
import { mapGetters } from "vuex";
import Register from "./Registration.vue";
import SetWeight from "./SetWeight.vue";
import GetWinner from "./Winner.vue";
import Vote from "./Vote.vue";

export default {
  components: { Register, SetWeight, GetWinner, Vote },
  computed: {
    ...mapGetters(["page"]),
  },
};
</script>

<style scoped>
div {
  margin-top: 10px;
}
</style>