<template>
  <div>
    <form action="" method="post">
      <span>Pessoa Jurídica</span>
      <input class="input" type="text" placeholder="Representante" />
      <input class="input" type="text" placeholder="Razão Social" />
      <input class="input" type="text" placeholder="Ramo de Atividade" />
      <Endereco />
      <Autorizacoes/>
      <button class="button">Enviar</button>
    </form>
  </div>
</template>

<script lang="ts">
import Endereco from "./Endereco.vue";
import Autorizacoes from "./utils/Autorizacoes.vue";
export default {
  setup() {},
  components: { Endereco, Autorizacoes },
};
</script>