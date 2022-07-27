<template>
  <section>
    <div class="tabs is-centered is-small is-fullwidth">
      <ul v-for="(t, i) in tabs" :key="i">
        <li :class="page == i ? 'is-active' : ''">
          <a @click="alterPage(i)">{{ t }}</a>
        </li>
      </ul>
    </div>
    <slot :page="page"></slot>
    <progress
      class="progress is-small is-primary"
      :value="page + 1"
      :max="tabs.length + 1"
    ></progress>
    <nav class="pagination" role="navigation" aria-label="pagination">
      <button
        @click="pre"
        class="button pagination-previous"
        :disabled="page == 0"
      >
        <span class="icon is-small">
          <i class="fa fa-arrow-left"></i>
        </span>
        <span>Anterior</span>
      </button>
      <button v-if="page != 4" @click="next" class="button pagination-next">
        <span>Próxima</span>
        <span class="icon is-small">
          <i class="fa fa-arrow-right"></i>
        </span>
      </button>
      <button
        v-if="page == 4"
        @click="next"
        class="button pagination-next is-info"
      >
        <span>Cadastrar</span>
        <span class="icon is-small">
          <i class="fa fa-check"></i>
        </span>
      </button>
    </nav>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Nav",
  data() {
    return {
      page: 0,
      tabs: [
        "Dados",
        "Endereco",
        "Contato",
        "Referencias",
        "Documentos",
        "Autorizacoes",
      ],
    };
  },
  emits: ["emitPage"],
  methods: {
    pre() {
      this.page != 0 ? (this.page -= 1) : this.page;
      this.emit();
    },
    next() {
      this.page < this.tabs.length - 1 ? (this.page += 1) : this.page;
      this.emit();
    },
    alterPage(page: number) {
      this.page = page;
      this.emit();
    },
    emit() {
      this.$emit("emitPage", this.page);
    },
    /**
     * resize() {
      window.addEventListener("load", () => {
        var largura = window.innerWidth;
        if (largura < 818) {
          document.querySelector(".tabs")?.classList.add("is-small");
        }
        if (largura >= 818) {
          document.querySelector(".tabs")?.classList.remove("is-small");
        }
      });
    },
     */
  },
});
</script>
