<template>
  <section @change="alteraAutorizacoes">
    <div class="field is-horizontal">
      <label class="checkbox">
        <input
          type="checkbox"
          id="autorizaDadosLgpd"
          v-model="cliente.autorizaDadosLgpd"
        />
        <span> {{ format(eAutorizacoes[0]) }}</span>
        <span class="icon has-text-success">
          <p class="button is-small is-dark is-light is-inverted ">...</p>
        </span>
      </label>
    </div>
    <div class="field is-horizontal">
      <label class="checkbox">
        <input
          class="checkbox"
          type="checkbox"
          id="autorizaMensagens"
          v-model="cliente.autorizaMensagens"
        />
        {{ eAutorizacoes[1] }}
      </label>
    </div>
    <div class="field is-horizontal">
      <label class="ckeckbox">
        <input
          class="checkbox"
          type="checkbox"
          id="autorizaPublicidade"
          v-model="cliente.autorizaPublicidade"
        />
        {{ eAutorizacoes[2] }}
      </label>
    </div>
    <div class="field is-horizontal" v-if="cliente.tipoPJF == 'PJ'">
      <label class="checkbox">
        <input
          class="checkbox"
          type="checkbox"
          id="autorizaPublicidade"
          v-model="cliente.autorizaConsultaReferencia"
        />
        {{ eAutorizacoes[3] }}
      </label>
    </div>
    <div class="field is-horizontal" v-if="cliente.tipoPJF == 'PJ'">
      <label class="checkbox">
        <input
          class="checkbox"
          type="checkbox"
          id="autorizaPublicidade"
          v-model="cliente.autorizaConsultaCredito"
        />
        {{ eAutorizacoes[4] }}
      </label>
    </div>
  </section>
</template>

<script lang="ts">
import ICliente from "@/interfaces/ICliente";
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { eAutorizacoes } from "@/interfaces/eAutorizacoes";
import { DEFINIR_TABS } from "@/store/tipo-acoes";
import { eTabs } from "@/interfaces/eTabs";

export default defineComponent({
  name: "AutorizacoesForm",
  data() {
    return {
      cliente: {} as ICliente,
      state: false,
      eAutorizacoes,
      newTabs: eTabs,
    };
  },
  methods: {
    alteraAutorizacoes() {
      this.cliente.autorizaConsultaCredito &&
      this.cliente.autorizaConsultaReferencia
        ? this.alteraTabs(true)
        : this.alteraTabs(false);
    },
    alteraTabs(op: boolean) {
      if (!op) {
        this.newTabs = eTabs.filter(
          (t) => t != "Referências" && t != "Documentos"
        );
        this.store.dispatch(DEFINIR_TABS, this.newTabs);
      } else {
        this.newTabs = eTabs;
        this.store.dispatch(DEFINIR_TABS, this.newTabs);
      }
    },
    format(nome: string) {
      if (nome.length > 130) {
        return nome.substring(0, 130);
      } else {
        return nome;
      }
    },
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const idCli = route.params.id;
    return {
      clientes: computed(() => store.state.cliente.clientes),
      store,
      idCli,
    };
  },
  mounted() {
    if (this.idCli) {
      this.cliente = this.clientes[0];
    }
  },
});
</script>
