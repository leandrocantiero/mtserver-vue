<template>
  <div class="wrapper">
    <notifications></notifications>

    <side-bar>
      <template slot="links">
        <sidebar-item
          v-for="{ name, path, icon, menu, children } in menuItems"
          :key="name"
          :link="{ name, path, icon, children }"
          :menu="menu"
        >
        </sidebar-item>
      </template>

      <template slot="links-after">
        <hr class="my-3" />
        <h6 class="navbar-heading p-0 text-muted">Documentação</h6>

        <b-nav class="navbar-nav mb-md-3">
          <b-nav-item href="#">
            <i class="fa fa-book"></i>
            <b-nav-text class="p-0">Manual do Usuário</b-nav-text>
          </b-nav-item>
          <b-nav-item href="#">
            <i class="fa fa-align-left"></i>
            <b-nav-text class="p-0">Perguntas frequentes</b-nav-text>
          </b-nav-item>
          <b-nav-item href="#">
            <i class="fa fa-question-circle"></i>
            <b-nav-text class="p-0">Suporte</b-nav-text>
          </b-nav-item>
        </b-nav>
      </template>
    </side-bar>

    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

      <dashboard-content />

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import { FadeTransition } from "vue2-transitions";
import { sync } from 'vuex-pathify'

export default {
  computed: {
    ...sync('app', ['menuItems'])
  },

  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
    FadeTransition,
  },

  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("sidenav");
      }
    },
  },

  mounted() {
    this.initScrollbar();
  },
};
</script>
<style lang="scss">
</style>
