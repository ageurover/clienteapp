<template>
  <div class="column" style="max-width: 800px;">
    <form class="box">
      <ValidaPessoa v-on:valida="validaCpfCnpj" />
      <p class="tag is-danger is-light" v-if="validacao.v === 2">
        Verifique as informações...
      </p>
      <div v-if="validacao.v === 0">
        <FormPF />
      </div>
      <div v-else-if="validacao.v === 1">
        <FormPJ />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import ValidaPessoa from "./utils/ValidaPessoa.vue";
import FormPF from "./FormPF.vue";
import FormPJ from "./FormPJ.vue";

export default {
  components: { ValidaPessoa, FormPF, FormPJ },
  data() {
    return {
      validacao: {},
    };
  },
  methods: {
    validaCpfCnpj(valor) {
      this.validacao = valor;
    },
  },
};
</script>