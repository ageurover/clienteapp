<template>
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
          <span :v-show="cliente.tipoPJF == tipoCli">
            <router-link :to="`/clientes/cadastro/${cliente.id}`" >
              <button class="button is-info is-small is-responsive">
                <i class="fa fa-pencil-alt "></i>
              </button>
            </router-link>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        clientes: {
            type: Object,
        },
        tipoCli: {
            type: String,
        },
    },
});
</script>

<style>
@import url("../assets/listaStyle.css");
</style>