<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <b-row>
        <b-col xl="3" md="6">
          <a href="#">
            <stats-card
              title="Construir base"
              type="gradient-red"
              sub-title="Realize a contrução da base clicando aqui"
              icon="fa fa-database"
              class="mb-4"
            >
            </stats-card>
          </a>
        </b-col>

        <b-col xl="3" md="6">
          <a href="#">
            <stats-card
              title="Realizar Backup"
              type="gradient-orange"
              sub-title="Realize o backup da base de dados"
              icon="fa fa-cloud"
              class="mb-4"
            >
            </stats-card>
          </a>
        </b-col>

        <b-col xl="3" md="6">
          <a href="#">
            <stats-card
              title="Importar dados"
              type="gradient-green"
              sub-title="Realize a importação de dados (.env)"
              icon="fa fa-arrow-up"
              class="mb-4"
            >
            </stats-card>
          </a>
        </b-col>

        <b-col xl="3" md="6">
          <a href="#">
            <stats-card
              title="Exportar dados"
              type="gradient-info"
              sub-title="Realize a exportação de dados (.env)"
              icon="fa fa-arrow-down"
              class="mb-4"
            >
            </stats-card>
          </a>
        </b-col>
      </b-row>
    </base-header>

    <b-container id="form" fluid class="mt--6">
      <b-row>
        <b-col xl="12" class="order-xl-1">
          <database-form :config="database" @configChanged="onConfigChange" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Table, TableColumn } from "element-ui";
import { sync } from "vuex-pathify";

export default {
  computed: {
    ...sync("databaseStore", ["database", "loading"]),
  },

  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    DatabaseForm: () => import("./DatabaseForm.vue"),
  },

  methods: {
    onConfigChange(value) {
      this.database = value;
    },

    loadConfig() {
      this.$store.dispatch("databaseStore/get");
    }
  },

  mounted() {
    this.loadConfig()
  },
};
</script>

<style>
</style>