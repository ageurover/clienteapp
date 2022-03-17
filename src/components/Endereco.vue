<template>
  <div>
    <div class="field is-horizontal">
      <label for="cep" class="label">CEP</label>
      <input
        class="input"
        type="text"
        v-model="endereco.cep"
        id="cep"
        v-on:input="valida()"
      />
    </div>
    <div class="field is-horizontal">
      <label for="numero" class="label">Numero</label>
      <input
        class="input"
        type="text"
        v-model="endereco.numero"
        id="numero"
        v-on:input="valida()"
      />
    </div>
    <div class="field is-horizontal">
      <label for="tipoImovel" class="label">Tipo Imovel</label>
      <input
        class="input"
        type="text"
        v-model="endereco.tipoImovel"
        id="tipoImovel"
        v-on:input="valida()"
      />
    </div>
    <div class="field is-horizontal">
      <label for="logradouro" class="label">Logradouro</label>
      <input
        class="input"
        type="text"
        v-model="endereco.logradouro"
        id="logradouro"
        v-on:input="valida()"
      />
    </div>
    <div class="field is-horizontal">
      <label for="bairo" class="label">Bairro</label>
      <input
        class="input"
        type="text"
        v-model="endereco.bairo"
        id="bairro"
        v-on:input="valida()"
      />
    </div>
    <div class="field is-horizontal">
      <label for="pontoReferencia" class="label">Ponto De Referencia</label>
      <input
        class="input"
        type="text"
        v-model="endereco.pontoReferencia"
        id="pontoReferencia"
        v-on:input="valida()"
      />
    </div>
    <div class="field is-horizontal">
      <label for="estado" class="label">Estado</label>
      <input
        class="input"
        type="text"
        v-model="endereco.estado"
        id="estado"
        v-on:input="valida()"
      />
    </div>
    <div class="field is-horizontal">
      <label for="cidade" class="label">Cidade</label>
      <input
        class="input"
        type="text"
        v-model="endereco.cidade"
        id="cidade"
        v-on:input="valida()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ICliente from "@/interfaces/ICliente";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Endereco",
  data() {
    return {
      endereco: {} as ICliente,
    };
  },
  methods: {
    valida() {
      this.$emit("endereco", {
        cep: this.endereco.cep,
        numero: this.endereco.numero,
        tipoImovel: this.endereco.tipoImovel,
        logradouro: this.endereco.logradouro,
        bairo: this.endereco.bairo,
        pontoReferencia: this.endereco.pontoReferencia,
        estado: this.endereco.estado,
        cidade: this.endereco.cidade,
      });
    },
  },
});
</script>

<style>
@import "../assets/formStyle.css";
</style>