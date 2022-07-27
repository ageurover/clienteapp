<template>
  <section>
    <div class="field is-horizontal">
      <label for="celular" class="label">Celular</label>
      <input class="input" type="text" v-model="cliente.celular" id="celular" />
    </div>
    <div class="field is-horizontal">
      <label for="telefoneComercial" class="label">Telefone Comercial</label>
      <input
        class="input"
        type="text"
        v-model="cliente.telefoneComercial"
        id="telefoneComercial"
      />
    </div>
    <div class="field is-horizontal">
      <label for="emailNfe" class="label">Email NFe</label>
      <input
        class="input"
        type="email"
        v-model="cliente.emailNfe"
        id="emailNfe"
      />
    </div>
    <div class="field is-horizontal">
      <label for="emailContato" class="label">Email Contato</label>
      <input
        class="input"
        type="email"
        v-model="cliente.emailContato"
        id="emailContato"
      />
    </div>
  </section>
</template>

<script lang="ts">
import ICliente from "@/interfaces/ICliente";
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "ContatoForm",
  data() {
    return {
      cliente: {} as ICliente,
    };
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const idCli = route.params.id;
    return {
      clientes: computed(() => store.state.cliente.clientes),
      store,
      idCli
    };
  },
  async mounted() {
    if (this.idCli) {
      this.cliente = this.clientes[0];
    }
  },
});
</script>
