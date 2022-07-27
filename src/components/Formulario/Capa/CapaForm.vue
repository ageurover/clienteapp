<template>
  <section>
    <div class="field is-horizontal">
      <label for="tipoPJF" class="label">Tipo de Pessoa</label>
      <label class="radio">
        <input
          type="radio"
          name="foobar"
          value="PF"
          v-model="cliente.tipoPJF"
        />
        PF
      </label>
      <label class="radio">
        <input
          type="radio"
          name="foobar"
          value="PJ"
          v-model="cliente.tipoPJF"
        />
        PJ
      </label>
    </div>
    <div class="field is-horizontal">
      <label for="cnpjCpf" class="label"> CNPJ/CPF</label>
      <input type="text" class="input" v-model="cliente.cnpjCpf" id="cnpjCpf" />
    </div>
    <div class="field is-horizontal" v-if="cliente.tipoPJF == 'PJ'">
      <label for="inscricaoEstadual" class="label">Inscricao Estadual</label>
      <input
        type="text"
        class="input"
        v-model="cliente.inscricaoEstadual"
        id="inscrcaoEstadual"
      />
    </div>
    <div class="field is-horizontal">
      <label for="razaoSocial" class="label">Razão Social</label>
      <input
        type="text"
        class="input"
        v-model="cliente.razaoSocial"
        id="razaoSocial"
      />
    </div>
    <div class="field is-horizontal" v-if="cliente.tipoPJF == 'PJ'">
      <label for="nomeFanstasia" class="label">Nome Fantasia</label>
      <input
        type="text"
        class="input"
        v-model="cliente.nomeFanstasia"
        id="nomeFanstasia"
      />
    </div>
    <div class="field is-horizontal">
      <label for="ramoAtividade" class="label">Ramo de Atividade</label>
      <div class="select">
        <select v-if="cliente.ramoAtividade != 'OUTRO'" class="select" v-model="cliente.ramoAtividade">
          <option v-for="(r, i) in eRamoAtividade" :key="i" :value="r">
            {{ r }}
          </option>
          <option value="OUTRO">OUTRO</option>
        </select>
        <input type="tex" class="input" v-if="cliente.ramoAtividade == 'OUTRO'" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import ICliente from "@/interfaces/ICliente";
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { eRamoAtividade } from "@/interfaces/eRamoAtividades";

export default defineComponent({
  name: "CapaForm",
  data() {
    return {
      cliente: {} as ICliente,
      eRamoAtividade,
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
      setTimeout(() => {
        this.cliente = this.clientes[0];
      }, 300);
    }
  },
});
</script>
