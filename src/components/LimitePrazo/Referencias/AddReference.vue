<template>
  <Button icon="fa-plus" name="Adicionar" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Button.vue";

export default defineComponent({
  name: "AddReference",
  components: { Button },
});
</script>
