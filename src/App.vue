<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "app",

  mounted() {
    this.$store.dispatch("authStore/validateToken");
  },
};
</script>
