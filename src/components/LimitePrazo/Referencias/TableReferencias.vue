<template>
  <tbody class="table-referencias table resp">
    <tr v-for="(ref, id) in refs" :key="id">
      <div class="columns">
        <div id="icon" class="column">
          <i class="fas fa-address-card" />
        </div>
        <div class="column is-four-fifths">
          <td class="tag">{{ ref.nome }}</td>
          <td class="tag">{{ ref.telefone }}</td>
          <td class="tag">{{ ref.email }}</td>
        </div>
      </div>
    </tr>
  </tbody>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TableReferencuias",
  props: ["refs"],
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
