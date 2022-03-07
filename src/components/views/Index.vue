<template>
  <component :is="page" />
</template>

<script>
import { mapGetters } from "vuex";
import Register from "./Registration.vue";
export default {
  components: { Register },
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