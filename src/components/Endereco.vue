<template>
  <div class="field is-horizontal">
    <label for="cep" class="label">CEP</label>
    <input class="input" type="text" v-model="endereco.cep" id="cep" />
  </div>
  <div class="field is-horizontal">
    <label for="numero" class="label">Numero</label>
    <input class="input" type="number" v-model="endereco.numero" id="numero" />
  </div>
  <div class="field is-horizontal">
    <label for="Rua" class="label">Logradouro</label>
    <input
      class="input"
      type="text"
      v-model="endereco.logradouro"
      id="logradouro"
    />
  </div>
  <div class="field is-horizontal">
    <label for="tipoImovel" class="label">Tipo Imovel</label>
    <input
      class="input"
      type="number"
      v-model="endereco.tipoImovel"
      id="tipoImovel"
    />
  </div>
  <div class="field is-horizontal">
    <label for="pontoReferencia" class="label">Ponto Referencia</label>
    <input
      class="input"
      type="text"
      v-model="endereco.pontoReferencia"
      id="pontoReferecia"
    />
  </div>
  <div class="field is-horizontal">
    <label for="bairro" class="label">Bairro</label>
    <input class="input" type="text" v-model="endereco.bairo" id="bairro" />
  </div>
  <div class="field is-horizontal">
    <label for="cidade" class="label">Cidade</label>
    <input class="input" type="text" v-model="endereco.cidade" id="cidade" />
  </div>
  <div class="field is-horizontal">
    <label for="estado" class="label">Estado</label>
    <input class="input" type="text" v-model="endereco.estado" id="estado" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ICliente from "@/interfaces/ICliente";

export default defineComponent({
  name: "Endereco",
  data() {
    return {
      endereco: {} as ICliente,
    };
  },
});
</script>