<template>
  <ul>
    <li
      v-for="page in pages"
      :key="page.id"
      @click="setPage(page.id)"
      :style="{ textDecoration: page.id == currentPage ? 'underline' : 'none' }"
    >
      {{ page.name }}
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      pages: [
        { name: "Submit Vote", id: "Vote" },
        { name: "Get Winner", id: "GetWinner" },
      ],
    };
  },
  methods: {
    setPage(page) {
      this.$store.dispatch("setPage", page);
    },
  },
  computed: {
    ...mapGetters({ currentPage: "page" }),
  },
};
</script>

<style scoped>
li {
  cursor: pointer;
  text-align: left;
}
</style>