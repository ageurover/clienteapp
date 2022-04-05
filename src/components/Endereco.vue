<template>
  <div @change="enviaAoForm()">
    <div class="field is-horizontal">
      <label for="cep" class="label">CEP</label>
      <input class="input" type="text" v-model="e.cep" id="cep" />
    </div>
    <div class="field is-horizontal">
      <label for="numero" class="label">Numero</label>
      <input class="input" type="text" v-model="e.numero" id="numero" />
    </div>
    <div class="field is-horizontal">
      <label for="tipoImovel" class="label">Tipo Imovel</label>
      <div class="select">
        <select class="select" v-model="e.tipoImovel">
          <option value="ALUGADO">ALUGADO</option>
          <option value="PROPRIO">PROPRIO</option>
        </select>
      </div>
    </div>
    <div class="field is-horizontal">
      <label for="logradouro" class="label">Logradouro</label>
      <input class="input" type="text" v-model="e.logradouro" id="logradouro" />
    </div>
    <div class="field is-horizontal">
      <label for="bairo" class="label">Bairro</label>
      <input class="input" type="text" v-model="e.bairo" id="bairro" />
    </div>
    <div class="field is-horizontal">
      <label for="pontoReferencia" class="label">Ponto De Referencia</label>
      <input
        class="input"
        type="text"
        v-model="e.pontoReferencia"
        id="pontoReferencia"
      />
    </div>
    <div class="field is-horizontal">
      <label for="estado" class="label">Estado</label>
      <input class="input" type="text" v-model="e.estado" id="estado" />
    </div>
    <div class="field is-horizontal">
      <label for="cidade" class="label">Cidade</label>
      <input class="input" type="text" v-model="e.cidade" id="cidade" />
    </div>
  </div>
</template>

<script lang="ts">
import useNotificador from "@/hooks/notificador";
import ICliente from "@/interfaces/ICliente";
import ResponseData from "@/interfaces/ResponseData";
import Notificacoes from "@/mixins/notificacoes";
import validarForm from "@/mixins/validarForm";
import CepDataService from "@/services/CepDataService";
import { useStore } from "@/store";
import { ALTERA_CLIENTE } from "@/store/tipo-mutacao";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Endereco",
  data() {
    return {
      e: {} as ICliente,
      idCli: "",
    };
  },
  async mounted() {
    this.idCli = validarForm.methods.buscaIdURL();
    const cliente = this.store.state.clientes.find(
      (cli) => cli.id == this.idCli
    );
    if (cliente != null) {
      this.e.numero = cliente.numero;
      this.e.bairo = cliente.bairo;
      this.e.cidade = cliente.cidade;
      this.e.pontoReferencia = cliente.pontoReferencia;
      this.e.tipoImovel = cliente.tipoImovel;
      this.e.referencias = cliente.referencias;
      this.e.cep = cliente.cep;
      this.e.estado = cliente.estado;
      this.e.logradouro = cliente.logradouro;
    }
  },
  methods: {
    searchCep() {
      CepDataService.get(this.e.cep).then(async (response: ResponseData) => {
        if (await response.data.erro) {
          this.clearFields();
          Notificacoes.cepNotFound(this.e.cep)
        } else {
          this.e.cidade = response.data.localidade;
          this.e.estado = response.data.uf;
          this.e.bairo = response.data.bairro;
          this.e.numero = response.data.complemento;
          this.e.logradouro = response.data.logradouro;
        }
      });
      return "control is-loading";
    },
    clearFields() {
      this.e.cidade = "";
      this.e.estado = "";
      this.e.bairo = "";
      this.e.numero = "";
      this.e.logradouro = "";
    },
    enviaAoForm() {
      if (this.e.cep.length < 8) this.clearFields();
      if (this.e.cep.length === 8) this.searchCep();
      this.store.commit(ALTERA_CLIENTE, this.e);
      this.$emit("endereco", {
        cep: this.e.cep,
        numero: this.e.numero,
        tipoImovel: this.e.tipoImovel,
        logradouro: this.e.logradouro,
        bairo: this.e.bairo,
        pontoReferencia: this.e.pontoReferencia,
        estado: this.e.estado,
        cidade: this.e.cidade,
      });
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return {
      clientes: computed(() => store.state.clientes),
      store,
      notificar,
    };
  },
});
</script>

<style>
@import "../assets/formStyle.css";
</style>
