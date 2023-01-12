<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <b-row class="text-center">
        <b-col sm="12">
          <base-input type="text" placeholder="Buscar" v-model="filter.nome" />

          <a href="#" class="btn btn-primary" @click="add">Adicionar</a>

          <image-modal />
        </b-col>
      </b-row>
    </base-header>

    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <b-card no-body>
            <b-card-header class="border-0">
              <h3 class="mb-0">Gerencie suas imagens aqui</h3>
            </b-card-header>

            <el-table
              class="table-responsive table"
              empty-text="Nenhum item encontrado"
              header-row-class-name="thead-light"
              :data="images.data"
              v-loading="loading"
            >
              <el-table-column
                prop="nome"
                label="Nome"
                min-width="140px"
                align="left"
              >
              </el-table-column>
              <el-table-column
                prop="data"
                label="Data"
                min-width="140px"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="hora"
                label="Hora"
                min-width="140px"
                align="center"
              >
              </el-table-column>

              <el-table-column label="Ações" min-width="140px" align="right">
                <template slot-scope="scope">
                  <a
                    href="#"
                    class="btn btn-sm btn-danger"
                    type="danger"
                    @click="remove(scope.row)"
                  >
                    Excluir
                  </a>
                </template>
              </el-table-column>
            </el-table>

            <b-row class="justify-content-between align-items-center mx-4">
              <span>{{ images.count | decimal }} itens no total</span>

              <b-pagination
                class="ml-auto pt-3"
                v-model="options.pageNumber"
                :total-rows="images.count"
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
  name: "images",

  computed: {
    ...sync("imageStore", ["images", "filter", "loading"]),

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
    ImageModal: () => import("./ImageModal.vue"),
  },

  watch: {
    params: {
      handler() {
        this.$store.dispatch("imageStore/get", this.params);
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
    add() {
      this.$store.dispatch("imageStore/add");
    },

    remove(item) {
      if (confirm(`Confirma exclusão da justificativa: ${item.nome}?`)) {
        this.$store.dispatch("imageStore/remove", item.nome);
      }
    },
  },

  mounted() {
    this.$store.dispatch("imageStore/get", this.params);
  },
};
</script>

<style>
</style>