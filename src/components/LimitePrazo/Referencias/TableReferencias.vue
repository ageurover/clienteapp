<template>
  <tbody class="table-referencias table resp">
    <tr v-for="(ref, id) in refs" :key="id">
      <article class="message is-info">
        <div class="message-header">
          <div id="icon" class="column">
            <i class="fas fa-address-card" />
          </div>
          {{ ref.nome }}
          <button class="delete" @click="deleteRef(ref)"></button>
        </div>
        <div class="message-body is-small">
          {{ ref.telefone }}
          {{ ref.email }}
        </div>
      </article>
    </tr>
  </tbody>
</template>

<script lang="ts">
import IReferencia from "@/interfaces/IReferencia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TableReferencuias",
  data() {
    return {
      referencias: [] as IReferencia[],
    };
  },
  props: ["refs"],
  methods: {
    deleteRef(ref: IReferencia) {
      this.referencias = this.refs;
      var indice = this.referencias.indexOf(ref);
      while (indice >= 0) {
        this.referencias.splice(indice, 1);
        indice = this.referencias.indexOf(ref);
      }
    },
  },
});
</script>

<style scoped>
.columns {
  margin: 10px;
  width: auto;
  border-collapse: collapse;
  padding: 0;
}
.column {
  padding: 0;
}

.resp tbody {
  display: block;
  width: auto;
  position: relative;
  overflow-x: auto;
  white-space: nowrap;
}
.resp tbody tr {
  display: inline-block;
  vertical-align: top;
}
.resp th {
  display: block;
  text-align: right;
}
.resp td {
  display: block;
  text-align: left;
}
</style>
