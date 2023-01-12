<template>
  <nav
    class="
      navbar navbar-vertical
      fixed-left
      navbar-expand-md navbar-light
      bg-white
    "
    id="sidenav-main"
  >
    <div class="container-fluid">
      <navbar-toggle-button @click.native="showSidebar"> </navbar-toggle-button>

      <router-link class="navbar-brand" to="/">
        <img :src="logo" class="navbar-brand-img" alt="..." />
      </router-link>

      <slot name="mobile-right">
        <ul class="nav align-items-center d-md-none">
          <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
            <a
              slot="title-container"
              class="nav-link nav-link-icon"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="ni ni-bell-55"></i>
            </a>

            <a class="dropdown-item" href="#">Uma notificação</a>
            <a class="dropdown-item" href="#">Outra notificação</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Uma outra notificação</a>
          </base-dropdown>

          <base-dropdown
            menu-on-right
            class="nav-item"
            tag="li"
            title-tag="a"
            title-classes="nav-link pr-0"
          >
            <a
              href="#"
              class="nav-link pr-0"
              @click.prevent
              slot="title-container"
            >
              <b-media no-body class="align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" src="img/theme/team-4.jpg" />
                </span>
                <b-media-body class="ml-2 d-none d-lg-block">
                  <span class="mb-0 text-sm font-weight-bold">{{
                    currentUser.nome
                  }}</span>
                </b-media-body>
              </b-media>
            </a>

            <template>
              <b-dropdown-header class="noti-title">
                <h6 class="text-overflow m-0">Bem vindo(a)</h6>
              </b-dropdown-header>
              <b-dropdown-item to="/profile">
                <i class="fa fa-user"></i>
                <span>Ver perfil</span>
              </b-dropdown-item>
              <b-dropdown-item to="/configuration">
                <i class="fa fa-cog"></i>
                <span>Configurações</span>
              </b-dropdown-item>
              <b-dropdown-item href="#!">
                <i class="fa fa-question-circle"></i>
                <span>Suporte</span>
              </b-dropdown-item>
              <div class="dropdown-divider"></div>
              <b-dropdown-item @click="logout">
                <i class="fa fa-door-open"></i>
                <span>Sair</span>
              </b-dropdown-item>
            </template>
          </base-dropdown>
        </ul>
      </slot>

      <slot></slot>

      <div
        v-show="$sidebar.showSidebar"
        class="navbar-collapse collapse show"
        id="sidenav-collapse-main"
      >
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img :src="logo" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <navbar-toggle-button
                @click.native="closeSidebar"
              ></navbar-toggle-button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav">
          <slot name="links"> </slot>
        </ul>

        <slot name="links-after"> </slot>

        <!-- <hr class="my-3" />
        <h6 class="navbar-heading text-muted">Documentation</h6>
        <ul class="navbar-nav mb-md-3">
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://www.creative-tim.com/learning-lab/bootstrap-vue/alerts/argon-dashboard"
            >
              <i class="ni ni-spaceship"></i> Getting started
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://www.creative-tim.com/learning-lab/bootstrap-vue/colors/argon-dashboard"
            >
              <i class="ni ni-palette"></i> Foundation
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://www.creative-tim.com/learning-lab/bootstrap-vue/alerts/argon-dashboard"
            >
              <i class="ni ni-ui-04"></i> Components
            </a>
          </li>
        </ul> -->
      </div>
    </div>
  </nav>
</template>
<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";
import { get } from "vuex-pathify";

export default {
  name: "sidebar",

  computed: {
    ...get("app", ["currentUser"]),
  },

  components: {
    NavbarToggleButton,
  },

  props: {
    logo: {
      type: String,
      default: "img/brand/green.png",
      description: "Sidebar app logo",
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item",
    },
  },

  provide() {
    return {
      autoClose: this.autoClose,
    };
  },

  methods: {
    closeSidebar() {
      this.$sidebar.displaySidebar(false);
    },

    showSidebar() {
      this.$sidebar.displaySidebar(true);
    },

    logout() {
      this.$store.dispatch("authStore/logout");
    },
  },

  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
};
</script>
