<template>
  <div class="column">
    <span class="subtitle">Empresa</span>
    <div class="field">
      <div class="label">Nome</div>
      <input
        type="text"
        class="input is-small"
        for="empresa"
        v-model="referencia.nome"
      />
    </div>
    <div class="field">
      <div class="label">Empresa</div>
      <input
        type="text"
        class="input is-small"
        for="empresa"
        v-model="referencia.nome"
      />
    </div>
  </div>
</template>

<script lang="ts">
import IReferencia from "@/interfaces/IReferencia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormReferencia",
  data() {
    return {
      referencia: {} as IReferencia,
    };
  },
});
</script>
