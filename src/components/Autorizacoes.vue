<template>
  <div>
    <div class="field is-horizontal">
      <label class="checkbox">
        <input
          class="checkbox block-with-text"
          type="checkbox"
          id="autorizaDadosLgpd"
          v-model="autorizacoes.autorizaDadosLgpd"
          v-on:change="enviaDados()"
        />
        Autorizo a empresa Brasil Distribuidora, em atenção à Lei Geral de
        Proteção a Dados (Lei 13.709/18), a coleta, processamento, análise,
        armazenamento e uso dos meus dados com a finalidade de cadastros,
        atendimento, agendamentos, orçamentos, entregas, pedidos, emissão de
        notas fiscais, duplicatas, envio de orçamento, publicidade e
        compartilhamento entre parceiros
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
          v-on:change="enviaDados()"
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
          v-on:change="enviaDados()"
        />
        Autorizo envio de publicidade
      </label>
    </div>
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
  methods: {
    enviaDados() {
      this.$emit("autoriza", {
        autorizaPublicidade: this.autorizacoes.autorizaPublicidade,
        autorizaDadosLgpd: this.autorizacoes.autorizaDadosLgpd,
        autorizaMensagens: this.autorizacoes.autorizaMensagens,
      });
    },
  },
});
</script>

<style>
@import "../assets/formStyle.css";
</style>