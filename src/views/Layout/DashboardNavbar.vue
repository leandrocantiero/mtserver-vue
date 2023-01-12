<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top navbar-expand"
    :class="{ 'navbar-dark': type === 'default' }"
  >
    <a
      href="#"
      aria-current="page"
      class="
        h4
        mb-0
        text-white text-uppercase
        d-none d-lg-inline-block
        active
        router-link-active
      "
    >
      {{ $route.name }}
    </a>

    <b-navbar-nav class="align-items-center ml-md-auto">
      <li class="nav-item d-sm-none">
        <a
          class="nav-link"
          href="#"
          data-action="search-show"
          data-target="#navbar-search-main"
        >
          <i class="ni ni-zoom-split-in"></i>
        </a>
      </li>
    </b-navbar-nav>

    <b-navbar-nav class="align-items-center ml-auto ml-md-0">
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
        <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
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
    </b-navbar-nav>
  </base-nav>
</template>
<script>
import { get } from "vuex-pathify";

import { CollapseTransition } from "vue2-transitions";
import { BaseNav, Modal } from "@/components";

export default {
  computed: {
    ...get("app", ["currentUser"]),

    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },

  props: {
    type: {
      type: String,
      default: "default", // default|light
      description:
        "Look of the dashboard navbar. Default (Green) or light (gray)",
    },
  },

  components: {
    CollapseTransition,
    BaseNav,
    Modal,
  },

  data: () => ({
    activeNotifications: false,
    showMenu: false,
    searchModalVisible: false,
    searchQuery: "",
  }),

  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },

    closeDropDown() {
      this.activeNotifications = false;
    },

    logout() {
      this.$store.dispatch("authStore/logout");
    },
  },
};
</script>
