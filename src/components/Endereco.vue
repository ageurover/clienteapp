<template>
  <div>
    <div class="field is-horizontal">
      <label for="cep" class="label">CEP</label>
      <input
        class="input"
        type="text"
        v-model="endereco.cep"
        id="cep"
        @input="valida()"
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
      <div class="select">
        <select v-model="endereco.tipoImovel" @input="valida()">
          <option class="input" value="ALUGADO">ALUGADO</option>
          <option value="PROPRIO">PROPRIO</option>
        </select>
      </div>
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
import useNotificador from "@/hooks/notificador";
import ICliente from "@/interfaces/ICliente";
import { tipoNotificacao } from "@/interfaces/INotificacao";
import ResponseData from "@/interfaces/ResponseData";
import CepDataService from "@/services/CepDataService";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Endereco",
  data() {
    return {
      endereco: {} as ICliente,
    };
  },
  methods: {
    searchCep() {
      CepDataService.get(this.endereco.cep).then(
        async (response: ResponseData) => {
          if (await response.data.erro) {
            this.clearFields();
            this.notificar(
              tipoNotificacao.ATENCAO,
              "Invalido",
              'CEP "' + this.endereco.cep + '" não foi encontrado'
            );
          } else {
            this.endereco.cidade = response.data.localidade;
            this.endereco.estado = response.data.uf;
            this.endereco.bairo = response.data.bairro;
            this.endereco.numero = response.data.complemento;
            this.endereco.logradouro = response.data.logradouro;
          }
        }
      );
    },
    clearFields() {
      this.endereco.cidade = "";
      this.endereco.estado = "";
      this.endereco.bairo = "";
      this.endereco.numero = "";
      this.endereco.logradouro = "";
    },
    valida() {
      if (this.endereco.cep.length < 8) this.clearFields();
      if (this.endereco.cep.length === 8) this.searchCep();
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
  setup() {
    const { notificar } = useNotificador();
    return {
      notificar,
    };
  },
});
</script>

<style>
@import "../assets/formStyle.css";
</style>