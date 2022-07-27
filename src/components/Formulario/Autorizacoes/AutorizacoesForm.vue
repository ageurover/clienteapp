<template>
  <section>
    <div class="field is-horizontal">
      <label class="checkbox">
        <input
          type="checkbox"
          id="autorizaDadosLgpd"
          v-model="cliente.autorizaDadosLgpd"
        />
        {{ format(eAutorizacoes[0]) }}
        <button class="button is-small is-black is-inverted">...</button>
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
    <div class="field is-horizontal">
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
    <div class="field is-horizontal">
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

export default defineComponent({
  name: "AutorizacoesForm",
  data() {
    return {
      cliente: {} as ICliente,
      state: false,
      eAutorizacoes,
    };
  },
  methods: {
    format(nome: string) {
      console.log(nome.split(' '));
      
      if (nome.length > 130) {
        return nome.substring(0, 130) + "...";
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
