<template>
  <section class="clientes">
    <div class="field has-addons">
      <div class="control" has-icons-left>
        <input
          class="input"
          type="text"
          placeholder="Procurar pelo CNPJ ou CPF"
          id="cnpjCliente"
          v-model="cnpjCpf"
          @input="mask"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-"></i>
        </span>
      </div>
      <Button @action="searchCnpjCpf" name="Procurar" icon="fa-arrow-right" tipo="is-info is-rounded"/>
    </div>
    <div class="field is-horizontal">
      <div>
        <router-link to="/clientes/novo">
          <Button icon="fa-address-book" name="Novo Cliente" tipo="is-info is-outlined"/>
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
import { ADICIONA_CLIENTE, LIMPAR_LISTA } from "@/store/tipo-mutacao";
import { tipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import ClienteDataService from "@/services/ClienteDataService";
import ResponseData from "@/interfaces/ResponseData";
import validarForm from "@/mixins/validarForm";
import TableClient from "@/components/TableClient.vue";
import Button from "@/components/Button.vue";

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
      this.store.commit(LIMPAR_LISTA);
      ClienteDataService.findByCnpjCpf(this.cnpjCpf.replace(/\D/g, "")).then(
        (response: ResponseData) => {
          if (response.data.content[0] === undefined) {
            this.notificar(
              tipoNotificacao.FALHA,
              "find by Cnpj",
              "CPF/CNPJ " + this.cnpjCpf + " não localizado"
            );
            this.cnpjCpf = "";
            return;
          }
          this.store.commit(ADICIONA_CLIENTE, response.data.content[0]);
          this.id = response.data.content[0].id;
          this.notificar(
            tipoNotificacao.SUCESSO,
            "Sucesso",
            "Cliente localizado, pode realizar a edição!"
          );
          this.cnpjCpf = "";
        }
      );
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
      clientes: computed(() => store.state.clientes),
      store,
      notificar,
    };
  },
  components: { TableClient, Button },
});
</script>
<style scoped>
@import url("../../assets/listaStyle.css");
</style>