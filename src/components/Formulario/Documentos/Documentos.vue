<template>
  <section>
    <DocumentoUpload></DocumentoUpload>
    <span class="title is-5 tag" v-if="documentos?.length == 0">
      Sem documentos
    </span>
    <table
      class="table is-striped is-narrow is-hoverable is-fullwidth"
      v-if="documentos?.length > 0"
    >
      <thead>
        <tr>
          <th>Arquivo</th>
          <th>Upload</th>
          <th>Original</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(doc, i) in documentos" :key="i">
          
          <td>
            <span class="icon " v-if="verificarTipoDoc(doc.fileName)">
              <i class="fa fa-image"></i>
            </span>
            <span class="icon " v-if="!verificarTipoDoc(doc.fileName)">
              <i class="fa fa-file-pdf"></i>
            </span>
            {{ format(eTipoDoc[Number(doc.tipoDoc)]) }}
          </td>
          <td>
            {{ doc.dataUpload }}
          </td>
          <td>
            {{ doc.fileName }}
          </td>
          <td>
            <div class="buttons">
              <span class="button is-success is-small">
                <span class="icon">
                  <i class="fas fa-download"></i>
                </span>
              </span>

              <span @click="removerDoc(doc)" class="button is-danger is-small">
                <span class="icon">
                  <i class="fas fa-trash"></i>
                </span>
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import IDocumento from "@/interfaces/IDocumento";
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { eTipoDoc } from "@/interfaces/ITipoDoc";
import DocumentoUpload from "./DocumentoUpload.vue";
import { REMOVER_DOCUMENTO } from "@/store/tipo-acoes";

export default defineComponent({
  name: "EnderecoForm",
  data() {
    return {
      documentosList: {} as IDocumento[],
      eTipoDoc,
    };
  },
  components: { DocumentoUpload },
  methods: {
    verificarTipoDoc(tipo: string) {
      return tipo.endsWith("png");
    },
    format(nome: string) {
      if (nome.length > 25) {
        return nome.substring(0, 25) + "...";
      } else {
        return nome;
      }
    },
    removerDoc(doc: IDocumento) {
      this.store.dispatch(REMOVER_DOCUMENTO, doc);
    },
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const idCli = route.params.id;
    return {
      documentos: computed(() => store.state.documento.documentos),
      store,
      idCli,
    };
  },
  mounted() {
    if (this.idCli) {
      this.documentosList = this.documentos;
    }
  },
});
</script>
