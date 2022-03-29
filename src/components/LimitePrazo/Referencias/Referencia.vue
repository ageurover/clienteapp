<template>
  <div class="referencias">
    <span class="title is-5"> - Empresas Referencias</span>
    <div class="columns">
      <div class="column is-three-fifths">
        <tbody>
          <tr v-for="(ref, index) in refs" :key="index">
            <td class="tag is-ligh">
              <span class="icon">
                <i class="fas fa-address-card" />
              </span>
              <span>{{ ref.empresa }}</span>
              <span>{{ ref.telefone }}</span>
            </td>
          </tr>
        </tbody>
      </div>
      <div class="column">
        <AddReference/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IReferencia from "@/interfaces/IReferencia";
import { defineComponent } from "vue";
import AddReference from "./AddReference.vue";

export default defineComponent({
    name: "Referencia",
    data() {
        return {
            referencia: {} as IReferencia,
            refs: [
                {
                    empresa: "Brasil Distribuidora PVH",
                    telefone: "3536-1616",
                },
                {
                    empresa: "Super Atacado",
                    telefone: "3516-5000",
                },
                {
                    empresa: "DisBrasil",
                    telefone: "3535-1000",
                },
            ],
        };
    },
    components: { AddReference }
});
</script>
