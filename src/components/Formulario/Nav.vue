<template>
  <section>
    <div class="tabs is-centered is-small is-fullwidth">
      <ul v-for="(t, i) in tabs" :key="i">
        <li :class="page == i ? 'is-active' : ''">
          <a @click="alterPage(i)">{{ t }}</a>
        </li>
      </ul>
    </div>
    <slot :page="page"></slot>
    <progress
      class="progress is-small is-primary"
      :value="page + 1"
      :max="5"
    ></progress>
    <nav class="pagination" role="navigation" aria-label="pagination">
      <button
        @click="pre"
        class="button pagination-previous"
        :disabled="page == 0"
      >
        <span class="icon is-small">
          <i class="fa fa-arrow-left"></i>
        </span>
        <span>Anterior</span>
      </button>
      <button
        @click="next"
        class="button pagination-next"
        :class="page == 5 ? 'is-info' : ''"
      >
        <span v-if="page != 5">Próxima</span>
        <span v-if="page == 5">Cadastrar</span>
        <span v-if="page != 5" class="icon is-small">
          <i class="fa fa-arrow-right"></i>
        </span>
        <span v-if="page == 5" class="icon is-small">
          <i class="fa fa-check"></i>
        </span>
      </button>
    </nav>
  </section>
</template>

<script lang="ts">
import ICliente from "@/interfaces/ICliente";
import Notificacoes from "@/mixins/notificacoes";
import { useStore } from "@/store";
import {
  BUSCAR_CLIENTE_ID,
  DEFINIR_TABS,
  EDITAR_CLIENTE,
} from "@/store/tipo-acoes";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { eTabs } from "@/interfaces/eTabs";

export default defineComponent({
  name: "Nav",
  data() {
    return {
      cliente: {} as ICliente,
      page: 0,
    };
  },
  emits: ["emitPage"],
  setup() {
    const store = useStore();
    const route = useRoute();
    const idCli = route.params.id;
    return {
      clientes: computed(() => store.state.cliente.clientes),
      tabs: computed(() => store.state.tab.tabs),
      store,
      idCli,
    };
  },
  mounted() {
    this.store.dispatch(DEFINIR_TABS, eTabs);
    if (this.idCli) {
      this.store
        .dispatch(BUSCAR_CLIENTE_ID, this.idCli)
        .then(() => {
          this.clientes.forEach((cli) => {
            this.cliente = cli;
            if (
              this.cliente.autorizaConsultaCredito &&
              this.cliente.autorizaConsultaReferencia
            ) {
              this.store.dispatch(DEFINIR_TABS, eTabs);
            } else {
              const newTabs = eTabs.filter(
                (t) => t != "Referências" && t != "Documentos"
              );
              this.store.dispatch(DEFINIR_TABS, newTabs);
            }
          });
        })
        .catch((err) => {
          Notificacoes.clienteNotFound(err);
        });
    } else {
      this.store.dispatch(EDITAR_CLIENTE, false);
    }
  },
  methods: {
    pre() {
      this.page != 0 ? (this.page -= 1) : this.page;
      this.emit();
    },
    next() {
      this.page < this.tabs.length - 1 ? (this.page += 1) : this.page;
      this.emit();
    },
    alterPage(page: number) {
      this.page = page;
      this.emit();
    },
    emit() {
      this.$emit("emitPage", this.page);
    },
  },
});
</script>
