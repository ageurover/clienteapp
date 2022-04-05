<template>
  <div>
    <div class="field is-horizontal">
      <div class="select">
        <select class="select" v-model="selectDoc">
          <option
            v-for="(doc, id) in listDocs"
            :key="id"
            :disabled="selectDesabiled(doc)"
          >
            {{ doc }}
          </option>
        </select>
      </div>
    </div>
    <div class="file is-medium is-info">
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
</template>

<script lang="ts">
import IDocumento from "@/interfaces/IDocumento";
import { defineComponent } from "vue";
import Notificacoes from "@/mixins/notificacoes";

export default defineComponent({
  name: "DocsAnalise",
  data() {
    return {
      doc: {} as IDocumento,
      selectDoc: "",
    };
  },
  props: {
    selecionado: {
      type: Array,
    },
    listDocs: {
      type: Array,
    },
  },
  emits: ["documento"],
  methods: {
    upload(evt: Event) {
      if (!this.documentSelected()) {
        return;
      }
      const target = evt.target as HTMLInputElement;
      const files = target.files as FileList;

      this.doc.dataUpload = new Date();
      this.doc.name = this.selectDoc;
      this.doc.tipoDoc = files[0].type;
      this.doc.dataUrl = this.loadFile(files[0])

      /* const reader = new FileReader();

      reader.onload = function() {
        reader.result;
      };

      reader.readAsDataURL(files[0]); */

      this.$emit("documento", { ...this.doc });

      console.log(files[0]);
    },
    selectDesabiled(doc: any) {
      var r = false;
      this.selecionado?.forEach((e) => {
        doc == e ? (r = true) : r;
      });
      return r;
    },
    loadFile(file: Blob) {
      const obj_url = URL.createObjectURL(file);
      return obj_url;
    }, 
    documentSelected() {
      if (this.selectDesabiled(this.selectDoc)) {
        if (this.selectDoc == "") {
          Notificacoes.documentoNull();
          return false;
        } else {
          Notificacoes.documentoDuplicado(this.selectDoc);
          return false;
        }
      }
      return true;
    },
  },
});
</script>
