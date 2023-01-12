<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container class="container">
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="6" md="8" class="px-5">
              <h1 class="text-white">Conexão com o banco de dados</h1>
              <p class="text-lead text-white">
                Utilize o formulário abaixo para realizar a conexão com a sua
                base ou criar uma nova caso necessário.
              </p>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>

    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="8" md="8">
          <b-card no-body class="bg-secondary border-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Conectar ou criar base</small>
              </div>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <database-form
                  simplified
                  :config="database"
                  @configChanged="onConfigChange"
                ></database-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="12" class="text-right">
              <router-link to="/login" class="text-light"
                ><small>Ir para o login</small></router-link
              >
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { sync } from "vuex-pathify";

export default {
  computed: {
    ...sync("authStore", ["loading"]),
    ...sync("databaseStore", {
      database: "database",
      loadingDatabase: "loading",
    }),
  },

  components: {
    DatabaseForm: () => import("../Database/DatabaseForm.vue"),
  },

  methods: {
    onSubmit() {
      // this.$store.dispatch("authStore/register", this.user);
    },

    onConfigChange(value) {
      this.database = value;
    },

    loadConfig() {
      this.$store.dispatch("databaseStore/get");
    },
  },

  mounted() {
    this.loadConfig();
  },
};
</script>

<style></style>
