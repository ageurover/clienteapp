<template>
  <section class="clientes">
    <div class="field has-addons">
      <div class="control" has-icons-left>
        <input
          class="input"
          type="text"
          placeholder="Procurar pelo CNPJ ou CPF"
          id="cnpjCliente"
          v-model.lazy="cnpjCpf"
          @input="mask"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-"></i>
        </span>
      </div>
      <div class="control">
        <a class="button is-info" @click="searchCnpjCpf"> Procurar </a>
      </div>
    </div>
    <div class="field is-horizontal">
      <div>
        <router-link to="/clientes/novo" class="button">
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
          <span>Novo Cliente</span>
        </router-link>
      </div>
      <!-- <div>
        <router-link to="/clientes/novopf" class="button">
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
          <span>Nova Pessoa Fisica</span>
        </router-link>
      </div> -->
    </div>
    <div class="table-container">
      <table class="table is-responsive">
        <thead>
          <tr>
            <th>id</th>
            <th>Cnpj/Cpf</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Celular</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes" :key="cliente.id">
            <td>{{ cliente.id }}</td>
            <td>{{ cliente.tipoPJF }} - {{ cliente.cnpjCpf }}</td>
            <td>{{ cliente.razaoSocial }}</td>
            <td>{{ cliente.telefoneComercial }}</td>
            <td>{{ cliente.celular }}</td>
            <td>
              <span v-show="cliente.tipoPJF == tipoCli">
                <router-link
                  :to="`/clientes/novo/${cliente.id}`"
                  class="button"
                >
                  <span class="icon is-small">
                    <i class="fas fa-pencil-alt"></i>
                  </span>
                </router-link>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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

export default defineComponent({
  name: "listaClientes",
  data() {
    return {
      cnpjCpf: "",
      tipoCli: "",
      id: ''
    };
  },
  methods: {
    searchCnpjCpf() {
      this.validations()
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
          this.id = response.data.content[0].id
          
          this.notificar(
            tipoNotificacao.SUCESSO,
            "Sucesso",
            "Cliente localizado, pode realizar a edição!"
          );
          this.cnpjCpf = "";
        }
      );
    },
    mask(){
      this.cnpjCpf = validarForm.methods.validaCnpjCpf(this.cnpjCpf)
    },
    validations(){
      !validarForm.methods.validarNulo(this.cnpjCpf)
        ? this.tipoCli = validarForm.methods.validaTipoCli(this.cnpjCpf)
        : false
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
});
</script>
<style scoped>
@media screen and (max-width: 800px) {
  .is-responsive {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    display: block;
    position: relative;
  }
  .is-responsive td:empty:before {
    content: " ";
  }
  .is-responsive th,
  .is-responsive td {
    margin: 0;
    vertical-align: top;
  }
  .is-responsive th {
    text-align: left;
  }
  .is-responsive thead {
    border-right: solid 2px #dbdbdb;
    display: block;
    float: left;
  }
  .is-responsive thead tr {
    display: block;
    padding: 0 10px 0 0;
  }
  .is-responsive thead tr th::before {
    content: " ";
  }
  .is-responsive thead td,
  .is-responsive thead th {
    border-width: 0 0 1px;
  }
  .is-responsive tbody {
    display: block;
    width: auto;
    position: relative;
    overflow-x: auto;
    white-space: nowrap;
  }
  .is-responsive tbody tr {
    display: inline-block;
    vertical-align: top;
  }
  .is-responsive th {
    display: block;
    text-align: right;
  }
  .is-responsive td {
    display: block;
    min-height: 1.25em;
    text-align: left;
  }
  .is-responsive th:last-child,
  .is-responsive td:last-child {
    border-bottom-width: 0;
  }
  .is-responsive tr:last-child td:not(:last-child) {
    border: 1px solid #dbdbdb;
    border-width: 0 0 1px;
  }
  .is-responsive.is-bordered td,
  .is-responsive.is-bordered th {
    border-width: 1px;
  }
  .is-responsive.is-bordered tr td:last-child,
  .is-responsive.is-bordered tr th:last-child {
    border-bottom-width: 1px;
  }
  .is-responsive.is-bordered tr:last-child td,
  .is-responsive.is-bordered tr:last-child th {
    border-width: 1px;
  }
}
</style>