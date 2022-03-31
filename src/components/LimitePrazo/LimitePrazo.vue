<template>
  <div class="limite-prazo">
    <span class="title is-3">Limite e Prazo</span>
    <Documentos />
    <br />
    <div class="referencias">
      <span class="title is-5"> - Empresas Referencias</span>
      <div class="columns">
        <div class="column is-two-fifths">
          <FormReferencia @enviar="buscaReferencias" />
        </div>
        <div id="tb-ref" class="column">
          <TableReferencias :refs="referencias" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IReferencia from "@/interfaces/IReferencia";
import { computed, defineComponent } from "vue";
import Documentos from "./Document/Documentos.vue";
import FormReferencia from "./Referencias/FormReferencia.vue";
import { useStore } from "@/store";
import validarForm from "@/mixins/validarForm";
import TableReferencias from "./Referencias/TableReferencias.vue";

export default defineComponent({
  name: "LimitePrazo",
  data() {
    return {
      referencias: [] as IReferencia[],
      idCli: "",
    };
  },
  async mounted() {
    this.idCli = validarForm.methods.buscaIdURL();
    const cliente = this.store.state.clientes.find(
      (cli) => cli.id == this.idCli
    );
    if (cliente != null) {
      this.referencias = Object.values(cliente.referencias);
    }
  },
  emits: ["limitePrazo"],
  methods: {
    buscaReferencias(refs: IReferencia) {
      this.referencias.push(refs);
      this.$emit("limitePrazo", {...this.referencias});
    },
  },
  setup() {
    const store = useStore();
    return {
      clientes: computed(() => store.state.clientes),
      store,
    };
  },
  components: { Documentos, FormReferencia, TableReferencias },
});
</script>
