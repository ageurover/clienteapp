<template>
  <div style="display: flex">
    <input
      maxlength="18"
      type="text"
      class="input"
      placeholder="CPF/CNPJ"
      v-model="valor"
    >
    <button
      type="submit"
      class="button is-link"
      v-on:click.prevent="validaPessoa"
    >
      >
    </button>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    return {
      valor: "",
      valorF: "",
      v: 0,
    };
  },
  methods: {
    validaPessoa() {
      this.valorF = this.valor.toString().replace(/[./,-]/g, "");

      if (this.valorF.length === 11) {
        this.v = 0;
      } else if (this.valorF.length === 14) {
        this.v = 1;
      } else {
        this.v = 2;
      }
      this.$emit("valida", {
        v: this.v,
        valor: this.valorF,
      });
    },
  },
};
</script>