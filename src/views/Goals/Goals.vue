<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <b-row class="text-center">
        <b-col sm="12">
          <base-input type="text" placeholder="Buscar"> </base-input>

          <a href="#" class="btn btn-primary" @click="add">Adicionar</a>

          <goal-modal />
        </b-col>
      </b-row>
    </base-header>

    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <b-card no-body>
            <b-card-header class="border-0">
              <h3 class="mb-0">Gerencie as metas aqui</h3>
            </b-card-header>

            <el-table
              class="table-responsive table"
              header-row-class-name="thead-light"
              :data="goals.data"
              empty-text="Nenhum item encontrado"
              v-loading="loading"
            >
              <el-table-column
                prop="vendedor"
                label="Vendedor"
                min-width="140px"
                align="left"
              >
                <template v-slot="{ row }">
                  <el-popover
                    placement="top-start"
                    title="Detalhes"
                    width="400"
                    trigger="hover"
                  >
                    <a href="#" slot="reference" @click="edit(row)">{{
                      row.vendedor
                    }}</a>

                    <p>Produto: {{ row.produto }}</p>
                    <p>Familia: {{ row.familiaProduto }}</p>
                    <p>Cliente: {{ row.cliente }}</p>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                prop="periodo"
                label="Período"
                min-width="140px"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="quantidade"
                label="Quantidade"
                min-width="140px"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="valor"
                label="Valor"
                min-width="140px"
                align="center"
              >
                <template v-slot="{ row }">
                  {{ row.valor | currency }}
                </template>
              </el-table-column>

              <el-table-column label="Ações" min-width="140px" align="right">
                <template slot-scope="scope">
                  <a
                    href="#"
                    class="btn btn-sm btn-primary"
                    @click="edit(scope.row)"
                    >Editar</a
                  >
                  <a
                    href="#"
                    class="btn btn-sm btn-danger"
                    type="danger"
                    @click="remove(scope.row)"
                    >Excluir</a
                  >
                </template>
              </el-table-column>
            </el-table>

            <b-row class="justify-content-between align-items-center mx-4">
              <span>{{ goals.count | decimal }} itens no total</span>

              <b-pagination
                class="ml-auto pt-3"
                v-model="options.pageNumber"
                :total-rows="goals.count"
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
import { Table, TableColumn, Popover } from "element-ui";
import { sync } from "vuex-pathify";

export default {
  name: "goal",

  computed: {
    ...sync("goalStore", ["goals", "filter", "loading"]),

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
    Popover,

    GoalModal: () => import("./GoalModal.vue"),
  },

  watch: {
    params: {
      handler() {
        this.$store.dispatch("goalStore/get", this.params);
      },
      deep: true,
    },
  },

  data: () => ({
    options: {
      pageNumber: 1,
      pageSize: 50,
      sortBy: ["Periodo"],
      sortDesc: [false],
    },
  }),

  methods: {
    add() {
      this.$store.dispatch("goalStore/add");
    },

    edit(item) {
      this.$store.dispatch("goalStore/edit", item);
    },

    remove(item) {
      if (confirm(`Confirma exclusão da meta do(a): ${item.cliente}?`)) {
        this.$store.dispatch("goalStore/remove", item);
      }
    },
  },

  mounted() {
    this.$store.dispatch("goalStore/get", this.params);
  },
};
</script>

<style>
</style>