<template>
  <section class="clientes">
    <router-link to="/">
      <button @click="limpaClientes" class="button is-inverted is-link">
        <span class="icon">
          <i class="fa fa-arrow-left"></i>
        </span>
        <span>
          Retornar
        </span>
      </button>
    </router-link>
    <div class="column is-10 is-offset-1">
      <span class="title"> Cadastro Cliente </span>
      <Formulario></Formulario>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Formulario from "@/components/Formulario/Formulario.vue";
import { useStore } from "@/store";
import {
  DEFINIR_TABS,
  LIMPAR_LISTA_CLI,
  LIMPAR_LISTA_DOCS,
  LIMPAR_LISTA_REFS,
} from "@/store/tipo-acoes";

export default defineComponent({
  name: "Cadastro",
  components: { Formulario },
  setup() {
    const store = useStore();
    return {
      tabs: computed(() => store.state.tab.tabs),
      store,
    };
  },
  mounted() {
    this.store.dispatch(DEFINIR_TABS, this.tabs);
  },
  methods: {
    limpaClientes() {
      this.store.dispatch(LIMPAR_LISTA_CLI);
      this.store.dispatch(LIMPAR_LISTA_REFS);
      this.store.dispatch(LIMPAR_LISTA_DOCS);
    },
  },
});
</script>

<style>
@import "../../assets/formStyle.css";
</style>
