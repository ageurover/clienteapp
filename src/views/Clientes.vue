<template>
  <div class="clientes">
    <h1 class="title">clientes</h1>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "clientes",
});
</script>

<style scoped>
.clientes {
  padding: 1.25rem;
}
</style>