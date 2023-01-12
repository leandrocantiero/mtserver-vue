<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <b-row>
        <b-col xl="3" md="6">
          <stats-card
            title="Pedidos de hoje"
            type="gradient-red"
            sub-title="350"
            icon="fa fa-shopping-cart"
          >
          </stats-card>
        </b-col>

        <b-col xl="3" md="6">
          <stats-card
            title="Pedidos do mês"
            type="gradient-orange"
            sub-title="2.536"
            icon="fa fa-shopping-cart"
          >
          </stats-card>
        </b-col>

        <b-col xl="3" md="6">
          <stats-card
            title="Performance"
            type="gradient-info"
            sub-title="49,65%"
            icon="ni ni-chart-bar-32"
            class="mb-4"
          >
          </stats-card>
        </b-col>

        <b-col xl="3" md="6">
          <stats-card
            title="Faturados"
            type="gradient-green"
            sub-title="924"
            icon="ni ni-money-coins"
            class="mb-4"
          >
          </stats-card>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="12">
          <base-input
            type="text"
            placeholder="Buscar"
            v-model="filter.nomeOrEmail"
          >
          </base-input>
        </b-col>
      </b-row>
    </base-header>

    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <b-card no-body>
            <b-card-header class="border-0">
              <h3 class="mb-0">Gerencie seus vendedores aqui</h3>
            </b-card-header>

            <el-table
              class="table-responsive table"
              empty-text="Nenhum item encontrado"
              header-row-class-name="thead-light"
              :data="sellers.data"
              v-loading="loading"
            >
              <el-table-column
                prop="codigo"
                label="Código"
                min-width="140px"
                align="left"
              >
              </el-table-column>
              <el-table-column
                prop="nome"
                label="Nome"
                min-width="140px"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="email"
                label="Email"
                min-width="140px"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="tipo"
                label="Tipo"
                min-width="140px"
                align="center"
              >
                <template v-slot="{ row }">
                  <badge class="badge-dot mr-4 justify-content-center" type="">
                    <i :class="`bg-${getColor(row.tipo)}`"></i>
                    <span :class="`text-${getColor(row.tipo)}`">{{
                      getText(row.tipo)
                    }}</span>
                  </badge>
                </template>
              </el-table-column>
              <el-table-column
                align="right"
                prop="supervisor"
                label="Supervisor"
                min-width="140px"
              >
              <template v-slot="{ row }">
                <span> {{ row.supervisor || "Sem supervisor" }} </span>
              </template>
              </el-table-column>
            </el-table>

            <b-row class="justify-content-between align-items-center mx-4">
              <span>{{ sellers.count | decimal }} itens no total</span>

              <b-pagination
                class="ml-auto pt-3"
                v-model="options.pageNumber"
                :total-rows="sellers.count"
                :per-page="options.pageSize"
                first-number
              ></b-pagination>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Table, TableColumn } from "element-ui";
import { sync } from "vuex-pathify";

export default {
  name: "seller",

  computed: {
    ...sync("sellerStore", ["sellers", "filter", "loading"]),

    params() {
      return {
        ...this.options,
        ...this.filter,
      };
    },
  },

  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },

  watch: {
    params: {
      handler() {
        this.$store.dispatch("sellerStore/get", this.params);
      },
      deep: true,
    },
  },

  data: () => ({
    options: {
      pageNumber: 1,
      pageSize: 50,
      sortBy: ["Nome"],
      sortDesc: [false],
    },
  }),

  methods: {
    getColor(tipo) {
      if (tipo == "0") return "warning";
      return "success";
    },

    getText(tipo) {
      if (tipo == "0") return "Vendedor";
      return "Supervisor";
    },
  },

  mounted() {
    this.$store.dispatch("sellerStore/get", this.params);
  },
};
</script>

<style>
</style>