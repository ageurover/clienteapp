<template>
  <div class="columns">
    <div class="column">
      <span class="title is-3">Limite e Prazo</span>
      <Documentos/>
      <br>
      <Referencia/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Documentos from "./Document/Documentos.vue";
import Referencia from "./Referencias/Referencia.vue";

export default defineComponent({
    name: "LimitePrazo",
    data() {
        return {};
    },
    components: { Documentos, Referencia }
});
</script>
