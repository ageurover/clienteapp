<template>
  <Nav @emit-page="getPage">
    <section class="box">
      <CapaForm id="dados" v-if="p == 0"></CapaForm>
      <EnderecoForm id="endereco" v-if="p == 1"></EnderecoForm>
      <ContatoForm id="contato" v-if="p == 2"></ContatoForm>
      <AutorizacoesForm id="autorizacoes" v-if="p == 3"></AutorizacoesForm>
      <Referencia id="referencias" v-if="p == 4"></Referencia>
      <Documentos id="documentos" v-if="p == 5"></Documentos>
    </section>
  </Nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CapaForm from "./Capa/CapaForm.vue";
import EnderecoForm from "./Endereco/EnderecoForm.vue";
import ContatoForm from "./Contato/ContatoForm.vue";
import Referencia from "./Referencias/Referencias.vue";
import Documentos from "./Documentos/Documentos.vue";
import AutorizacoesForm from "./Autorizacoes/AutorizacoesForm.vue";
import Nav from "./Nav.vue";

export default defineComponent({
  name: "Formulario",
  data() {
    return {
      p: 0,
      tabs: [
        "Dados",
        "Endereco",
        "Contato",
        "Autorizacoes",
        "Referencias",
        "Documentos",
      ],
    };
  },
  methods: {
    getPage(p: number) {
      this.p = p;
    },
  },
  components: {
    CapaForm,
    EnderecoForm,
    ContatoForm,
    Referencia,
    AutorizacoesForm,
    Documentos,
    Nav,
  },
});
</script>
