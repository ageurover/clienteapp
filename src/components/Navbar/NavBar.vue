<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand ">
      <div class="img-navbar column" :class="navbarItem" v-if="resize()">
        <router-link to="/">
          <img
            src="https://brasilsuperatacado.com.br/wp-content/uploads/2019/06/logoBrasilTop.png"
          />
        </router-link>
      </div>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasic"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasic" class="navbar-menu">
      <div class="navbar-end">
        <router-link to="/" class="navbar-item">
          Home
        </router-link>

        <a class="navbar-item">
          Documentation
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
            </a>
            <a class="navbar-item">
              Jobs
            </a>
            <a class="navbar-item">
              Contact
            </a>
            <hr class="navbar-divider" />
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "NavBar",
  data() {
    return {
      navbarItem: "",
    };
  },
  mounted() {
    this.windowWidth();
  },
  methods: {
    resize() {
      window.addEventListener("resize", () => {
        this.windowWidth();
      });
      return true;
    },
    windowWidth() {
      var largura = window.innerWidth;
      largura < 750
        ? (this.navbarItem = "navbar-item")
        : (this.navbarItem = "");
    },
  },
});
</script>

<style lang="css">
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
