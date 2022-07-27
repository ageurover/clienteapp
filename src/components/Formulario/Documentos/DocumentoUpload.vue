<template>
  <div>
    <div class="field is-horizontal">
      <label class="label">Categoria</label>
      <div class="select">
        <select class="select item" v-model="tipo">
          <option v-for="(d, id) in tipoDoc" :key="id">
            {{ d.tipo }}
          </option>
        </select>
      </div>
      <div class="file is-info">
        <label class="file-label ">
          <input
            class="file-input"
            id="files"
            name="files[]"
            type="file"
            multiple
            @change="upload($event)"
          />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Adicionar
            </span>
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IDocumento from "@/interfaces/IDocumento";
import ITipoDoc, { eTipoDoc } from "@/interfaces/ITipoDoc";
import Notificacoes from "@/mixins/notificacoes";
import { useStore } from "@/store";
import { ADICIONAR_DOCUMENTO } from "@/store/tipo-acoes";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "DocumentoUpload",
  data() {
    return {
      doc: {} as IDocumento,
      selectDoc: {} as ITipoDoc,
      tipoDoc: [] as ITipoDoc[],
      tipo: "",
    };
  },
  setup() {
    const store = useStore();
    return {
      documentos: computed(() => store.state.documento.documentos),
      store,
    };
  },
  mounted() {
    this.montaTipos();
  },
  emits: ["documento"],
  methods: {
    montaTipos() {
      eTipoDoc.forEach((t, i) => {
        let tipo = {} as ITipoDoc;
        tipo.id = i;
        tipo.tipo = t;
        this.tipoDoc.push(tipo);
      });
    },
    upload(evt: Event) {
      const target = evt.target as HTMLInputElement;
      const files = target.files as FileList;

      this.doc.fileName = files[0].name;
      this.doc.dataTypeFile = files[0].type;
      this.doc.tipoDoc = '2';
      this.doc.dataUpload = new Date(files[0].lastModified).toISOString()

      console.log(this.doc);
      this.store.dispatch(ADICIONAR_DOCUMENTO, this.doc)

      //this.$emit("documento", { ...this.doc });
    },
  },
});
</script>

<style scoped>
.select {
  padding: 0 15px 0 0;
}
.item {
  padding: 0 15px;
}
</style>
