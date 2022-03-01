<template>
  <div class="box">
    <div style="display: flex">
      <label class="checkbox">
        <input type="checkbox" />
        Autorizo a empresa Brasil Distribuidora, em atenção à Lei Geral de
        Proteção a Dados (Lei 13.709/18)...
        <span class="tag is-warning is-light">Lei mais</span>
      </label>
    </div>
    <div>
      <label class="checkbox">
        <input type="checkbox" />
        Autorizo envio de orçamentos/pedidos por mensagem
      </label>
    </div>
    <div>
      <label class="checkbox">
        <input type="checkbox" />
        Autorizo envio de publicidade
      </label>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    return {};
  },
  methods: {
    verifica(v) {
      this.p = v;
    },
  },
};
</script>