<template>
  <section class="clientes">
    <router-link to="/clientes">
      <button class="button is-inverted is-link">
        <span class="icon">
          <i class="fa fa-arrow-left"></i>
        </span>
        <span>
          Retornar
        </span>
      </button>
    </router-link>
    <div class="column is-10 is-offset-1">
      <span class="title"> Cadastro Cliente </span>
      <Formulario></Formulario>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Formulario from "@/components/Formulario/Formulario.vue";

export default defineComponent({
  name: "Cadastro",
  components: { Formulario },
});
</script>

<style>
@import "../../assets/formStyle.css";
</style>
