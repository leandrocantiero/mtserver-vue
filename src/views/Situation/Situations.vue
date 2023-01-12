<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <b-row class="text-center">
        <b-col sm="12">
          <base-input
            type="text"
            placeholder="Buscar"
            v-model="filter.descricao"
          >
          </base-input>

          <a href="#" class="btn btn-primary" @click="add">Adicionar</a>

          <situation-modal />
        </b-col>
      </b-row>
    </base-header>

    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <b-card no-body>
            <b-card-header class="border-0">
              <h3 class="mb-0">Gerencie as situações dos pedidos aqui</h3>
            </b-card-header>

            <el-table
              class="table-responsive table"
              empty-text="Nenhum item encontrado"
              header-row-class-name="thead-light"
              :data="situations.data"
              v-loading="loading"
            >
              <el-table-column
                align="left"
                prop="codigo"
                label="Código"
                min-width="140px"
              >
              </el-table-column>

              <el-table-column
                align="center"
                prop="descricao"
                label="Descrição"
                min-width="140px"
              >
                <template v-slot="{ row }">
                  <a href="#" @click="edit(row)">{{ row.descricao }}</a>
                </template>
              </el-table-column>

              <el-table-column align="right" label="Ações" min-width="140px">
                <template slot-scope="scope">
                  <b-btn class="btn-sm btn-success" @click="edit(scope.row)">
                    Editar
                  </b-btn>
                  <b-btn class="btn-sm btn-danger" @click="remove(scope.row)">
                    Excluir
                  </b-btn>
                </template>
              </el-table-column>
            </el-table>

            <b-row class="justify-content-between align-items-center mx-4">
              <span>{{ situations.count | decimal }} itens no total</span>

              <b-pagination
                class="ml-auto pt-3"
                v-model="options.pageNumber"
                :total-rows="situations.count"
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
  name: "situation",

  computed: {
    ...sync("situationStore", ["situations", "filter", "loading"]),

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
    SituationModal: () => import("./SituationModal.vue"),
  },

  watch: {
    params: {
      handler() {
        this.$store.dispatch("situationStore/get", this.params);
      },
      deep: true,
    },
  },

  data: () => ({
    options: {
      pageNumber: 1,
      pageSize: 50,
      sortBy: ["Descricao"],
      sortDesc: [false],
    },
  }),

  methods: {
    add() {
      this.$store.dispatch("situationStore/add");
    },

    edit(item) {
      this.$store.dispatch("situationStore/edit", item);
    },

    remove(item) {
      if (confirm(`Confirma exclusão da justificativa: ${item.descricao}?`)) {
        this.$store.dispatch("situationStore/remove", item.codigo);
      }
    },
  },

  mounted() {
    this.$store.dispatch("situationStore/get", this.params);
  },
};
</script>

<style>
</style>