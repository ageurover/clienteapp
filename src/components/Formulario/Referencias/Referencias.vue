<template>
  <section>
    <ReferenciasForm></ReferenciasForm>
    <table
      class="table is-striped is-narrow is-responsive is-hoverable is-fullwidth "
    >
      <thead>
        <tr>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr class="title is-5 tag" v-if="referencias?.length == 0">
          Sem referencias
        </tr>
        <tr v-for="(ref, id) in referencias" :key="id">
          <td id="icon">
            <span class="delete button is-danger"></span>
            <i class="fas fa-address-card" />
            {{ ref.nome }}
          </td>
          <td id="icon">
            <i class="fas fa-phone" />
            {{ ref.telefone }}
          </td>
          <td id="icon">
            <i class="fas fa-envelope" />
            {{ ref.email }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import IReferencia from "@/interfaces/IReferencia";
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import ReferenciasForm from "./ReferenciasForm.vue";

export default defineComponent({
  name: "Referencia",
  data() {
    return {
      refenreciasList: {} as IReferencia[],
    };
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const idCli = route.params.id;
    return {
      referencias: computed(() => store.state.referencia.referencias),
      store,
      idCli,
    };
  },
  async mounted() {
    if (this.idCli) {
      this.refenreciasList = this.referencias;
    }
  },
  components: { ReferenciasForm },
});
</script>
