<template>
  <div>
    <div class="field">
      <input
        type="text"
        class="input is-small"
        for="empresa"
        placeholder="Nome"
        v-model="formRef.nome"
      />
    </div>
    <div class="field">
      <input
        type="text"
        class="input is-small"
        for="telefone"
        placeholder="Telefone"
        v-model="formRef.telefone"
      />
    </div>
    <div class="field">
      <input
        type="email"
        class="input is-small"
        for="email"
        placeholder="Email"
        v-model="formRef.email"
      />
    </div>
    <Button
      name="Inserir"
      tipo="is-info is-small is-outlined"
      icon="fa-arrow-right"
      @action="enviarDados"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Button.vue";
import IReferencia from "@/interfaces/IReferencia";

export default defineComponent({
  name: "FormReferencia",
  data() {
    return {
      formRef: {} as IReferencia,
    };
  },
  emits: ["enviar"],
  methods: {
    enviarDados() {
        this.$emit("enviar", {...this.formRef});
        this.formRef.nome = "";
        this.formRef.telefone = "";
        this.formRef.email = "";
    },
  },
  components: { Button },
});
</script>

<style scoped></style>
