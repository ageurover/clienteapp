<template>
  <div @change="enviaAoForm()">
    <div class="field is-horizontal">
      <label for="celular" class="label">Celular</label>
      <input class="input" type="text" v-model="c.celular" id="celular" />
    </div>
    <div class="field is-horizontal">
      <label for="telefoneComercial" class="label">Telefone Comercial</label>
      <input
        class="input"
        type="text"
        v-model="c.telefoneComercial"
        id="telefoneComercial"
      />
    </div>
    <div class="field is-horizontal">
      <label for="emailNfe" class="label">Email NFe</label>
      <input class="input" type="email" v-model="c.emailNfe" id="emailNfe" />
    </div>
    <div class="field is-horizontal">
      <label for="emailContato" class="label">Email Contato</label>
      <input
        class="input"
        type="email"
        v-model="c.emailContato"
        id="emailContato"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import ICliente from "@/interfaces/ICliente";
import { useStore } from "@/store";
import validarForm from "@/mixins/validarForm";
import { ALTERA_CLIENTE } from "@/store/tipo-mutacao";

export default defineComponent({
  name: "Contato",
  data() {
    return {
      c: {} as ICliente,
      idCli: "",
    };
  },
  mounted() {
    this.idCli = validarForm.methods.buscaIdURL();
    const cliente = this.store.state.clientes.find(
      (cli) => cli.id == this.idCli
    );
    if (cliente != null) {
      this.c.emailNfe = cliente.emailNfe;
      this.c.emailContato = cliente.emailContato;
      this.c.celular = cliente.celular;
      this.c.telefoneComercial = cliente.telefoneComercial;
    }
  },
  methods: {
    enviaAoForm() {
      this.store.commit(ALTERA_CLIENTE, this.c);
      this.$emit("contato", {
        celular: this.c.celular,
        telefoneComercial: this.c.telefoneComercial,
        emailNfe: this.c.emailNfe,
        emailContato: this.c.emailContato,
      });
    },
  },
  setup() {
    const store = useStore();
    return {
      clientes: computed(() => store.state.clientes),
      store,
    };
  },
});
</script>

<style>
@import "../assets/formStyle.css";
</style>
