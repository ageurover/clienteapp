<template>
  <div class="field is-horizontal">
    <label for="celular" class="label">Celular</label>
    <input class="input" type="text" v-model="contato.celular" id="celular" />
  </div>
  <div class="field is-horizontal">
    <label for="telefoneComercial" class="label">Telefone Comercial</label>
    <input
      class="input"
      type="text"
      v-model="contato.telefoneComercial"
      id="telefoneComercial"
    />
  </div>
  <div class="field is-horizontal">
    <label for="emailNfe" class="label">Email NFe</label>
    <input class="input" type="text" v-model="contato.emailNfe" id="emailNfe" />
  </div>
  <div class="field is-horizontal">
    <label for="emailContato" class="label">Email Contato</label>
    <input
      class="input"
      type="text"
      v-model="contato.emailContato"
      id="emailContato"
    />
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
});
</script>
