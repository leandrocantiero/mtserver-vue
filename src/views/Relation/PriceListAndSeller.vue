<template>
  <div>
    <b-row>
      <b-col cols="12" md="4">
        <base-input label="Empresa" v-loading="loadingCompanies">
          <select class="form-control" v-model="relation.fkEmpresa">
            <option value="" selected>Selecione uma opção</option>

            <option
              v-for="company in companies.data"
              :key="company.codigo"
              :value="company.codigo"
            >
              {{ company.nome }}
            </option>
          </select>
        </base-input>
      </b-col>

      <b-col cols="12" md="4"
        ><base-input label="Vendedor" v-loading="loadingSellers">
          <select class="form-control" v-model="relation.fkVendedor">
            <option value="" selected>Selecione uma opção</option>

            <option
              v-for="seller in sellers.data"
              :key="seller.codigo"
              :value="seller.codigo"
            >
              {{ seller.nome }}
            </option>
          </select>
        </base-input>
      </b-col>

      <b-col cols="12" md="4">
        <base-input label="Tabela de preço" v-loading="loadingPrices">
          <select class="form-control" v-model="relation.fkTabelaPreco">
            <option value="" selected>Selecione uma opção</option>

            <option
              v-for="price in priceLists.data"
              :key="price.codigo"
              :value="price.codigo"
            >
              {{ price.descricao }}
            </option>
          </select>
        </base-input>
      </b-col>

      <b-col cols="12" class="text-center">
        <b-btn class="btn-info" @click="reset"> Limpar </b-btn>
        <b-btn class="btn-success" @click="save"> Salvar </b-btn>
      </b-col>
    </b-row>

    <hr />

    <base-input
      class="mb-3"
      type="text"
      placeholder="Buscar por vendedor"
      v-model="filter.vendedor"
    />

    <el-table
      class="table-responsive table"
      empty-text="Nenhum item encontrado"
      header-row-class-name="thead-light"
      :data="relations.data"
      v-loading="loading"
    >
      <el-table-column
        prop="empresa"
        label="Empresa"
        min-width="140px"
        align="left"
      />

      <el-table-column
        prop="vendedor"
        label="Vendedor"
        min-width="140px"
        align="center"
      />

      <el-table-column
        prop="tabelaPreco"
        label="Tabela de preço"
        min-width="140px"
        align="center"
      />

      <el-table-column label="Ações" min-width="140px" align="right">
        <template slot-scope="scope">
          <b-btn class="btn-sm btn-danger" @click="remove(scope.row)">
            Excluir
          </b-btn>
        </template>
      </el-table-column>
    </el-table>

    <b-row class="justify-content-between align-items-center mx-4">
      <span>{{ relations.count | decimal }} itens no total</span>

      <b-pagination
        class="ml-auto pt-3"
        v-model="options.pageNumber"
        :total-rows="relations.count"
        :per-page="options.pageSize"
        first-number
      ></b-pagination>
    </b-row>
  </div>
</template>

<script>
import { Table, TableColumn } from "element-ui";
import { sync, get } from "vuex-pathify";
import { showError } from "../../util/helpers";

export default {
  name: "customer-and-price-list",

  computed: {
    ...sync("priceListAndSellerStore", ["relations", "filter", "loading"]),

    ...get("companyStore", {
      companies: "companies",
      loadingCompanies: "loading",
    }),

    ...get("sellerStore", {
      sellers: "sellers",
      loadingSellers: "loading",
    }),

    ...get("priceListStore", {
      priceLists: "priceLists",
      loadingPrices: "loading",
    }),

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
        this.$store.dispatch("priceListAndSellerStore/get", this.params);
      },
      deep: true,
    },
  },

  data: () => ({
    relation: {},

    options: {
      pageNumber: 1,
      pageSize: 50,
      sortBy: ["FkVendedor"],
      sortDesc: [false],
    },
  }),

  methods: {
    reset() {
      this.relation = {};
    },

    isValid() {
      return (
        this.relation.fkEmpresa != "" &&
        this.relation.fkVendedor != "" &&
        this.relation.fkTabelaPreco != ""
      );
    },

    save() {
      if (!this.isValid()) return showError("Preencha os campos corretamente");

      this.$store
        .dispatch("priceListAndSellerStore/create", this.relation)
        .then((_) => this.reset());
    },

    remove(item) {
      if (
        confirm(
          `Confirma a exclusão do relacionamento ${item.vendedor} X ${item.tabelaPreco}?`
        )
      ) {
        this.$store.dispatch("priceListAndSellerStore/remove", item);
      }
    },
  },
};
</script>

<style>
</style>