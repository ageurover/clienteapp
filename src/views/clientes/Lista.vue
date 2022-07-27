<template>
  <section class="clientes">
    <div class="column is-7 is-offset-1 ">
      <div class="field is-horizontal">
        <input
          class="input"
          type="text"
          placeholder="Procurar pelo CNPJ ou CPF"
          id="cnpjCliente"
          v-model="cnpjCpf"
          @input="mask"
        />
      </div>

      <div class="buttons is-centered">
        <button class="button is-info" @click="searchCnpjCpf">
          <span>
            Procurar
          </span>
          <span class="icon is-small is-left">
            <i class="fa fa-search"></i>
          </span>
        </button>
        <router-link class="button  is-success" to="/clientes/cadastro">
          <span>
            Cadastrar
          </span>
          <span class="icon is-small is-left">
            <i class="fas fa-plus"></i>
          </span>
        </router-link>
      </div>
    </div>

    <TableClient
      class="table-container"
      :clientes="clientes"
      :tipoCli="tipoCli"
    />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import useNotificador from "@/hooks/notificador";
import validarForm from "@/mixins/validarForm";
import TableClient from "@/components/TableClient.vue";
import { DEFINIR_CLIENTES } from "@/store/tipo-acoes";
import Notificacoes from "@/mixins/notificacoes";

export default defineComponent({
  name: "listaClientes",
  data() {
    return {
      cnpjCpf: "",
      tipoCli: "",
      id: "",
    };
  },
  methods: {
    searchCnpjCpf() {
      this.validations();
      this.store
        .dispatch(DEFINIR_CLIENTES, this.cnpjCpf.replace(/\D/g, ""))
        .then((response) => {
          if (response) {
            Notificacoes.clienteNotFound(response);
            this.cnpjCpf = "";
          } else {
            Notificacoes.clientFoundSucess();
            this.cnpjCpf = "";
          }
        });
    },
    mask() {
      this.cnpjCpf = validarForm.methods.addMask(this.cnpjCpf);
    },
    validations() {
      !validarForm.methods.validarNulo(this.cnpjCpf)
        ? (this.tipoCli = validarForm.methods.validaTipoCli(this.cnpjCpf))
        : false;
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return {
      clientes: computed(() => store.state.cliente.clientes),
      store,
      notificar,
    };
  },
  components: { TableClient },
});
</script>
<style scoped>
@import url("../../assets/listaStyle.css");
</style>
