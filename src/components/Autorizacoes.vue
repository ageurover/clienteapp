<template>
  <div class="field is-horizontal">
    <label class="checkbox">
      <input
        class="checkbox"
        type="checkbox"
        id="autorizaDadosLgpd"
        v-model="autorizacoes.autorizaDadosLgpd"
      />
      Autorizo a empresa Brasil Distribuidora, em atenção à Lei Geral de
      Proteção a Dados (Lei 13.709/18)...
      <span class="tag is-warning is-light">Lei mais</span>
    </label>
  </div>
  <div class="field is-horizontal">
    <label class="checkbox">
      <input
        class="checkbox"
        type="checkbox"
        id="autorizaMensagens"
        v-model="autorizacoes.autorizaMensagens"
      />
      Autorizo envio de orçamentos/pedidos por mensagem
    </label>
  </div>
  <div class="field is-horizontal">
    <label class="checkbox">
      <input
        class="checkbox"
        type="checkbox"
        id="autorizaPublicidade"
        v-model="autorizacoes.autorizaPublicidade"
      />
      Autorizo envio de publicidade
    </label>
  </div>
</template>

<script lang="ts">
import ICliente from "@/interfaces/ICliente";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      autorizacoes: {} as ICliente,
    };
  },
  methods: {},
});
</script>