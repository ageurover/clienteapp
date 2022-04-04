<template>
  <div @change="enviaDados" class="autorizacoes">
    <div class="field is-horizontal">
      <input
        class="checkbox"
        type="checkbox"
        id="autorizaDadosLgpd"
        v-model="a.autorizaDadosLgpd"
      />
      <label class="checkbox">
        <span v-show="!state">
          Autorizo a empresa Brasil Distribuidora, em atenção à Lei Geral de
          Proteção a Dados (Lei 13.709/18)
          <p
            v-show="!state"
            class="button is-small is-info is-outlined"
            @click="state = !state"
          >
            Ler mais
          </p>
        </span>
        <span v-show="state">
          Autorizo a empresa Brasil Distribuidora, em atenção à Lei Geral de
          Proteção a Dados (Lei 13.709/18) a coleta, processamento, análise,
          armazenamento e uso dos meus dados com a finalidade de cadastros,
          atendimento, agendamentos, orçamentos, entregas, pedidos, emissão de
          notas fiscais, duplicatas, envio de orçamento, publicidade e
          compartilhamento entre parceiros
          <p
            v-show="state"
            class="button is-small is-info is-outlined"
            @click="state = !state"
          >
            Ler menos
          </p>
        </span>
      </label>
    </div>
    <div class="field is-horizontal" v-show="tipoCli === 'PJ'">
      <input
        class="checkbox"
        type="checkbox"
        id="autorizaMensagens"
        v-model="a.autorizaMensagens"
      />
      <label class="checkbox"
        >Autorizo envio de orçamentos/pedidos por mensagem</label
      >
    </div>
    <div class="field is-horizontal" v-show="tipoCli === 'PJ'">
      <input
        class="checkbox"
        type="checkbox"
        id="autorizaPublicidade"
        v-model="a.autorizaPublicidade"
      />
      <label class="checkbox">Autorizo envio de publicidade</label>
    </div>
    <div class="field is-horizontal" v-show="tipoCli === 'PJ'">
      <input
        class="checkbox"
        type="checkbox"
        id="autorizaPublicidade"
        v-model="a.autorizaConsultaReferencia"
      />
      <label class="checkbox">Autorizo a consulta de meus dados (CNPJ e CPF dos sócios) nos órgãos de proteção ao crédito</label>
    </div>
    <div class="field is-horizontal" v-show="tipoCli === 'PJ'">
      <input
        class="checkbox"
        type="checkbox"
        id="autorizaPublicidade"
        v-model="a.autorizaConsultaCredito"
      />
      <label class="checkbox">Autorizo a consulta de crédito em meu CNPJ / CPF</label>
    </div>
  </div>
</template>

<script lang="ts">
import ICliente from "@/interfaces/ICliente";
import validarForm from "@/mixins/validarForm";
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      a: {} as ICliente,
      state: false,
      idCli: "",
    };
  },
  props: ['tipoCli'],
  async mounted() {
    this.idCli = validarForm.methods.buscaIdURL();
    const cliente = this.store.state.clientes.find(
      (cli) => cli.id == this.idCli
    );
    if (cliente != null) {
      this.a.autorizaConsultaCredito = cliente.autorizaConsultaCredito;
      this.a.autorizaConsultaReferencia = cliente.autorizaConsultaReferencia;
      this.a.autorizaDadosLgpd = cliente.autorizaDadosLgpd;
      this.a.autorizaMensagens = cliente.autorizaMensagens;
      this.a.autorizaPublicidade = cliente.autorizaPublicidade;
      this.a.referencias = cliente.referencias;
    }
  },
  methods: {
    enviaDados() {
      this.$emit("autoriza", {
        autorizaPublicidade: this.a.autorizaPublicidade,
        autorizaDadosLgpd: this.a.autorizaDadosLgpd,
        autorizaMensagens: this.a.autorizaMensagens,
        autorizaConsultaCredito: this.a.autorizaConsultaCredito,
        autorizaConsultaReferencia: this.a.autorizaConsultaReferencia
      });
    },
  },
  setup() {
    const store = useStore();
    return {
      clientes: computed(() => store.state.clientes),
      store,
    };
  },
});
</script>

<style scoped>
@import "../assets/formStyle.css";
.autorizacoes{
  margin: 15px;
}
</style>