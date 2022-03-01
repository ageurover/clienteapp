<template>
  <div>
    <form action="" method="post">
      <span>Pessoa Física</span>
      <input class="input" type="text" placeholder="Representante" />
      <input class="input" type="text" placeholder="Nome" />
      <input class="input" type="date" placeholder="Data de Nascimento" />
      <div style="display: flex">
        <input class="input" type="text" placeholder="RG" />
        <input class="input" type="text" placeholder="SSP" />
      </div>
      <Endereco />
      <Autorizacoes/>
      <button class="button is-link">Enviar</button>
    </form>
  </div>
</template>

<script lang="ts">
import Endereco from "./Endereco.vue";
import Autorizacoes from "./utils/Autorizacoes.vue";

export default {
  components: {
    Endereco,
    Autorizacoes
},
  setup() {
    return {
      clientes: [],
    };
  },
  methods: {
    createCliente() {},
  },
};
</script>