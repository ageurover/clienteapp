<template>
  <button class="control button" :class="tipo" @click="action">
    <p v-show="name">{{ name }}</p>
    <span class="icon">
      <i class="fa" :class="icon" />
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["action"],
  props: {
    icon: {},
    name: {},
    tipo: {},
  },
  methods: {
    action() {
      this.$emit("action");
    },
  },
});
</script>
