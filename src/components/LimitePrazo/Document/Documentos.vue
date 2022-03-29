<template>
  <div class="documentos">
    <span class="title is-5"> - Documentos para análise</span>
    <div class="columns">
      <div class="column is-three-fifths">
        <tbody>
          <tr v-for="(doc, index) in listDocs" :key="index">
            <td class="tag is-ligh button is-outlined">
              <span class="icon"> <i class="fas fa-file"></i> </span
              ><span>{{ doc }}</span>
            </td>
          </tr>
        </tbody>
      </div>
      <div class="column">
        <UploadDoc />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IDocumento from "@/interfaces/IDocumento";
import UploadDoc from "./UploadDoc.vue";

export default defineComponent({
  name: "LimitePrazo",
  components: { UploadDoc },
  data() {
    return {
      documentos: [] as IDocumento[],
      listDocs: [
        "Contrato Social ou Estatudo Social (ultima alteração)",
        "Contrato de Locação ou compra e venda do Imóvel",
        "Balanço patrimonial dos ultimos 2 (dois) exercícios",
      ],
    };
  },
});
</script>
