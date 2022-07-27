<template>
  <Nav @emit-page="getPage">
    <section class="box">
      <CapaForm id="dados" v-if="p == 0"></CapaForm>
      <EnderecoForm id="endereco" v-if="p == 1"></EnderecoForm>
      <ContatoForm id="contato" v-if="p == 2"></ContatoForm>
      <Referencia id="referencias" v-if="p == 3"></Referencia>
      <Documentos id="documentos" v-if="p == 4"></Documentos>
      <AutorizacoesForm id="autorizacoes" v-if="p == 5"></AutorizacoesForm>
    </section>
  </Nav>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import ICliente from "@/interfaces/ICliente";
import { useStore } from "@/store";
import useNotificador from "@/hooks/notificador";
import { useRoute } from "vue-router";
import {
  ATUALIZAR_CLIENTE,
  BUSCAR_CLIENTE_ID,
  EDITAR_CLIENTE,
} from "@/store/tipo-acoes";
import Notificacoes from "@/mixins/notificacoes";
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
      currentCliente: {} as ICliente,
      limitePrazo: false,
      p: 0,
      tabs: [
        "Dados",
        "Endereco",
        "Contato",
        "Referencias",
        "Documentos",
        "Autorizacoes",
      ],
    };
  },
  methods: {
    getPage(p: number) {
      this.p = p;
    },
    salvar() {
      if (this.idCli) {
        this.store
          .dispatch(ATUALIZAR_CLIENTE, this.currentCliente)
          .then((r) => {
            console.log(r);

            Notificacoes.clienteUpdateSucess();
          })
          .catch((err) => {
            console.log(err);

            Notificacoes.clienteUpdateError(err);
          });
      }
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    const route = useRoute();
    const idCli = route.params.id;
    return {
      clientes: computed(() => store.state.cliente.clientes),
      edit: computed(() => store.state.toEditClient),
      store,
      idCli,
      notificar,
    };
  },
  mounted() {
    if (this.idCli) {
      this.store
        .dispatch(BUSCAR_CLIENTE_ID, this.idCli)
        .then(() => {
          this.store.dispatch(EDITAR_CLIENTE, true);
          this.clientes.forEach((cli) => {
            this.currentCliente = cli;
          });
        })
        .catch((err) => {
          Notificacoes.clienteNotFound(err);
        });
    } else {
      this.store.dispatch(EDITAR_CLIENTE, false);
    }
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
