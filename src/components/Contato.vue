<template>
  <div>
    <div class="field is-horizontal">
      <label for="celular" class="label">Celular</label>
      <input
        class="input"
        type="text"
        v-model="contato.celular"
        id="celular"
        v-on:input="valida()"
      />
    </div>
    <div class="field is-horizontal">
      <label for="telefoneComercial" class="label">Telefone Comercial</label>
      <input
        class="input"
        type="text"
        v-model="contato.telefoneComercial"
        id="telefoneComercial"
        v-on:input="valida()"
      />
    </div>
    <div class="field is-horizontal">
      <label for="emailNfe" class="label">Email NFe</label>
      <input
        class="input"
        type="email"
        v-model="contato.emailNfe"
        id="emailNfe"
        v-on:input="valida()"
      />
    </div>
    <div class="field is-horizontal">
      <label for="emailContato" class="label">Email Contato</label>
      <input
        class="input"
        type="email"
        v-model="contato.emailContato"
        id="emailContato"
        v-on:input="valida()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ICliente from "@/interfaces/ICliente";

export default defineComponent({
  name: "Contato",
  data() {
    return {
      contato: {} as ICliente,
    };
  },
  methods: {
    valida() {
      this.$emit("contato", {
        celular: this.contato.celular,
        telefoneComercial: this.contato.telefoneComercial,
        emailNfe: this.contato.emailNfe,
        emailContato: this.contato.emailContato,
      });
    },
  },
});
</script>

<style>
@import "../assets/formStyle.css";
</style>