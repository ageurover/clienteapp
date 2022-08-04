<template>
  <main>
    <NavBar></NavBar>
    <div class="conteudo">
      <notificacoes></notificacoes>
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Notificacoes from "./components/Notificacoes.vue";
import NavBar from "./components/Navbar/NavBar.vue";
import Footer from "./components/Footer/Footer.vue";

export default defineComponent({
  name: "App",
  components: {
    Notificacoes,
    NavBar,
    Footer,
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
main {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.conteudo {
  flex: 1 0 auto;
}
</style>
