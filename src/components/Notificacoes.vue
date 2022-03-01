<template>
  <div class="notificacoes">
    <article
      class="message"
      :class="contexto[notificacao.tipo]"
      v-for="notificacao in notificacoes"
      :key="notificacao.id"
    >
      <div class="message-header">
        <p>{{ notificacao.titulo }}</p>
      </div>
      <div class="message-body">{{ notificacao.texto }}</div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { tipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
  name: "Notificacoes",
  data(){
      return{
          contexto:{
            [tipoNotificacao.SUCESSO]: 'is-success',
            [tipoNotificacao.ATENCAO]: 'is-warning',
            [tipoNotificacao.FALHA]: 'is-danger'
          }
      }
  },
  setup() {
    const store = useStore();
    return {
      notificacoes: computed(() => store.state.notificacoes),
    };
  },
});
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 400px;
  padding: 8px;
  z-index: 999;
}
</style>