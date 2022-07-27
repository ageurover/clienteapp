<template>
  <section>
    <div class="field is-horizontal">
      <label for="cep" class="label">CEP</label>
      <input class="input" type="text" v-model="cliente.cep" id="cep" />
    </div>
    <div class="field is-horizontal">
      <label for="numero" class="label">Numero</label>
      <input class="input" type="text" v-model="cliente.numero" id="numero" />
    </div>
    <div class="field is-horizontal">
      <label for="tipoImovel" class="label">Tipo Imovel</label>
      <div class="select">
        <select class="select" v-model="cliente.tipoImovel">
          <option value="ALUGADO">ALUGADO</option>
          <option value="PROPRIO">PROPRIO</option>
        </select>
      </div>
    </div>
    <div class="field is-horizontal">
      <label for="logradouro" class="label">Logradouro</label>
      <input
        class="input"
        type="text"
        v-model="cliente.logradouro"
        id="logradouro"
      />
    </div>
    <div class="field is-horizontal">
      <label for="bairo" class="label">Bairro</label>
      <input class="input" type="text" v-model="cliente.bairo" id="bairro" />
    </div>
    <div class="field is-horizontal">
      <label for="pontoReferencia" class="label">Ponto De Referencia</label>
      <input
        class="input"
        type="text"
        v-model="cliente.pontoReferencia"
        id="pontoReferencia"
      />
    </div>
    <div class="field is-horizontal">
      <label for="estado" class="label">Estado</label>
      <input class="input" type="text" v-model="cliente.estado" id="estado" />
    </div>
    <div class="field is-horizontal">
      <label for="cidade" class="label">Cidade</label>
      <input class="input" type="text" v-model="cliente.cidade" id="cidade" />
    </div>
  </section>
</template>

<script lang="ts">
import ICliente from "@/interfaces/ICliente";
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "EnderecoForm",
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
      idCli,
    };
  },
  mounted() {
    if (this.idCli) {
      this.cliente = this.clientes[0]
    }
  },
});
</script>
