<template>
  <div id="#doc-analise" class="file is-centered is-boxed is-info has-name">
    <label class="file-label ">
      <input class="file-input" type="file" name="resume" @change="sendFile" />
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label">
          Adicionar
        </span>
      </span>
      <span class="file-name">
        {{ doc }}
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DocsAnalise",
  data() {
    return {
      doc: "Documento.pdf",
    };
  },
  emits: ["enviaDocumento"],
  methods: {
    sendFile() {
      this.$emit("enviaDocumento", { documento: this.doc });
    },
  },
});
</script>

<style scoped>

@media screen and (max-width: 1080px) {
  
}
</style>
