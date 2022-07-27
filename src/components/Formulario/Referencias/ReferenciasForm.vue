<template>
  <section class="columns">
    <div class="column is-10" v-if="novo == true">
      <div class="field is-horizontal">
        <label for="nome" class="label"> Nome </label>
        <input
          type="text"
          class="input"
          v-model="newReferencia.nome"
          id="nome"
        />
      </div>
      <div class="field is-horizontal">
        <label for="telefone" class="label">Telefone </label>
        <input
          type="text"
          class="input"
          for="telefone"
          v-model="newReferencia.telefone"
        />
      </div>
      <div class="field is-horizontal">
        <label for="email" class="label">Email </label>
        <input
          type="email"
          class="input"
          for="email"
          v-model="newReferencia.email"
        />
      </div>
    </div>
    <div class="column">
      <div class="buttons">
        <button
          @click="novo = !novo"
          v-if="novo == false"
          type="submit"
          class="button is-info "
        >
          Novo
        </button>
        <button
          v-if="novo == true"
          type="submit"
          @click="incluir"
          class="button is-success is-fullwidth"
        >
          Incluir
        </button>
        <button
          v-if="novo == true"
          type="submit"
          @click="novo = !novo"
          class="button is-danger is-fullwidth"
        >
          Cancelar
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import IReferencia from "@/interfaces/IReferencia";
import Notificacoes from "@/mixins/notificacoes";
import { useStore } from "@/store";
import { ADICIONAR_REFERENCIA } from "@/store/tipo-acoes";

export default defineComponent({
  name: "ReferenciaForm",
  data() {
    return {
      novo: false,
      newReferencia: {} as IReferencia,
    };
  },
  emits: ["enviar", "sair"],
  setup() {
    const store = useStore();
    return {
      referencias: computed(() => store.state.referencia.referencias),
      store,
    };
  },
  methods: {
    incluir() {
      this.store.dispatch(ADICIONAR_REFERENCIA, this.newReferencia);
      this.newReferencia = {} as IReferencia;
      this.novo=!this.novo
    },
    validarForm() {
      var v = true;
      Object.values(this.newReferencia).length != 3 ? (v = false) : v;
      Object.values(this.newReferencia).forEach((e) => {
        if (e == null || e === "") {
          v = false;
        }
      });
      return v;
    },
    enviarDados() {
      if (!this.validarForm()) {
        Notificacoes.referenciaNula();
        return;
      } else {
        this.$emit("enviar", { ...this.newReferencia });
        this.clearFields();
      }
    },
    clearFields() {
      this.newReferencia = {} as IReferencia;
    },
  },
});
</script>
