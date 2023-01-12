<template>
  <div>
    <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
      style="
        min-height: 600px;
        background-image: url(img/theme/img-1-1000x600.jpg);
        background-size: cover;
        background-position: center top;
      "
    >
      <b-container fluid>
        <span class="mask bg-gradient-success opacity-8"></span>
        <b-container fluid class="d-flex align-items-center">
          <b-row>
            <b-col sm="10">
              <h1 class="display-2 text-white">Olá {{ currentUser.nome }}</h1>
              <p class="text-white mt-0 mb-5">
                Use esta página para alterar as configurações da empresa, de
                propriedades, etc...
              </p>
              <a
                href="#"
                class="btn btn-info"
                @click.prevent="scrollTo('#form')"
                >Vamos lá
              </a>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container id="form" fluid class="mt--6">
      <b-row>
        <b-col xl="12" class="order-xl-1">
          <card>
            <b-row align-v="center" slot="header" v-loading="loading">
              <b-col cols="6">
                <h3 class="mb-0">Editar Configurações</h3>
              </b-col>

              <!-- <b-col cols="6" class="text-right">
                <a href="#!" class="btn btn-sm btn-warning">Restaurar</a>
                <a href="#!" class="btn btn-sm btn-primary">Salvar</a>
              </b-col> -->
            </b-row>

            <b-form>
              <h6 class="heading-small text-muted mb-4">Propriedades</h6>

              <div class="pl-lg-4">
                <b-row class="mb-3">
                  <b-col sm="12">
                    <base-input
                      type="text"
                      label="Buscar propriedade pela descrição"
                      placeholder="Ex: Ação para títulos em atraso"
                      v-model="filter.descricao"
                    >
                    </base-input>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col
                    sm="12"
                    md="6"
                    v-for="prop in properties.data"
                    :key="prop.nome"
                  >
                    <base-input
                      type="text"
                      :placeholder="prop.nome"
                      :label="prop.descricao"
                      :disabled="loading"
                      v-model="prop.valor"
                      @change="edit(prop)"
                    />
                  </b-col>
                </b-row>
              </div>
            </b-form>
          </card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
function autoScroll() {
  var div = document.getElementById("form");
  div.style.display = "";
  var top = div.offsetTop;
  if (window.scrollTop != top) window.scrollTo(0, top);
}
function loadAutoScroll() {
  autoScroll();
  window.onload = null;
  return false;
}
function scrollAutoScroll() {
  autoScroll();
  window.setTimeout(function () {
    window.onscroll = null;
  }, 100);
  return false;
}
window.onload = loadAutoScroll;
window.onscroll = scrollAutoScroll;

import { scrollTo } from "@/util/helpers.js";
import { sync, get } from "vuex-pathify";

export default {
  computed: {
    ...get("app", ["currentUser"]),

    ...sync("propertyStore", ["properties", "filter", "loading"]),

    params() {
      return {
        ...this.options,
        ...this.filter,
      };
    },
  },

  watch: {
    params: {
      handler() {
        this.$store.dispatch("propertyStore/get", this.params);
      },
      deep: true,
    },
  },

  data: () => ({
    options: {
      pageNumber: 1,
      pageSize: 100,
      sortBy: ["Descricao"],
      sortDesc: [false],
    },
  }),

  methods: {
    scrollTo: scrollTo,

    edit(prop) {
      this.$store.dispatch("propertyStore/update", prop);
    },
  },

  mounted() {
    this.$store.dispatch("propertyStore/get", this.params);
  },
};
</script>

<style>
</style>