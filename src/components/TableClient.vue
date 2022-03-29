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
            <router-link :to="`/clientes/novo/${cliente.id}`" >
              <!-- <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span> -->
              <Button icon="fa-pencil-alt" tipo="is-info is-outlined is-small is-responsive"/>
            </router-link>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "./Button.vue";

export default defineComponent({
    props: {
        clientes: {
            type: Object,
        },
        tipoCli: {
            type: String,
        },
    },
    components: { Button }
});
</script>

<style>
@import url("../assets/listaStyle.css");
</style>