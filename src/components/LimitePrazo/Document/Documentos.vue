<template>
  <div class="documentos">
    <span class="title is-5"> - Documentos para análise</span>
    <div class="columns">
      <div class="column is-two-fifths">
        <UploadDoc
          @documento="buscaDoc"
          :list-docs="listDocs"
          :selecionado="selecionado"
        />
      </div>
      <div class="column docs">
        <tbody>
          <tr
            class="message is-small is-info"
            v-for="(doc, index) in documentos"
            :key="index"
          >
            <td>
              {{ doc.name }}
            </td>
            <span class="delete" @click="deleteDoc(doc)"></span>
          </tr>
        </tbody>
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
        "Relação de faturamento dos ultimos 12 (doze meses)",
        "Declaração de IRPF dos sócios",
        "Relação de bens (sem alienação ou gravame) da empresa e dos sócios acompanhado das documentações pertinentes",
        "Fotos do estabelecimento (Fachada, interior e estoque)",
        "Notas fiscais de fornecedores com comprovação de pagamento",
        "Documentos pessoais do sócio (RG, CPF ou CNH)",
      ],
      selecionado: [""],
    };
  },
  methods: {
    buscaDoc(doc: IDocumento) {
      this.documentos.push(doc);
      this.selecionado.push(doc.name.toString());
    },
    deleteDoc(doc: IDocumento) {
      var indiceDoc = this.documentos.indexOf(doc);
      var indiceSel = this.selecionado.indexOf(doc.name.toString());
      while (indiceDoc >= 0) {
        this.documentos.splice(indiceDoc, 1);
        this.selecionado.splice(indiceSel, 1);
        indiceDoc = this.documentos.indexOf(doc);
      }
    },
  },
});
</script>

<style scoped>
td {
  padding: 8px;
}
</style>
