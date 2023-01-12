<template>
  <div>
    <b-row>
      <b-col cols="12" md="6">
        <base-input label="Empresa" v-loading="loadingCompanies">
          <select
            class="form-control"
            v-model="relation.fkEmpresa"
            @change="setFilial"
          >
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

      <b-col cols="12" md="6">
        <base-input label="Filial" v-loading="loadingBranchs">
          <select class="form-control" v-model="relation.fkFilial">
            <option value="" selected>Selecione uma opção</option>

            <option
              v-for="branch in branchs.data"
              :key="branch.codigo"
              :value="branch.codigo"
            >
              {{ branch.nome }}
            </option>
          </select>
        </base-input>
      </b-col>

      <b-col cols="12" md="6">
        <base-input
          label="Condição de pagamento"
          v-loading="loadingPaymentTerms"
        >
          <select class="form-control" v-model="relation.fkCondicaoPagamento">
            <option value="" selected>Selecione uma opção</option>

            <option
              v-for="paymentTerm in paymentTerms.data"
              :key="paymentTerm.codigo"
              :value="paymentTerm.codigo"
            >
              {{ paymentTerm.descricao }}
            </option>
          </select>
        </base-input>
      </b-col>

      <b-col cols="12" md="6">
        <base-input
          label="Valor mínimo"
          type="text"
          v-model="relation.valorMin"
          @blur="formatNumber('valorMin')"
        />
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
      placeholder="Buscar"
      v-model="filter.nome"
    />

    <el-table
      class="table-responsive table"
      empty-text="Nenhum item encontrado"
      header-row-class-name="thead-light"
      :data="relations.data"
      v-loading="loading"
    >
      <el-table-column
        prop="filial"
        label="Filial"
        min-width="140px"
        align="left"
      />

      <el-table-column
        prop="condicaoPagamento"
        label="Condição de pagamento"
        min-width="140px"
        align="center"
      />

      <el-table-column
        prop="valorMin"
        label="Valor mínimo"
        min-width="140px"
        align="center"
      >
        <template v-slot="{ row }">
          <span> {{ row.valorMin | currency }} </span>
        </template>
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

import { formatToBRL } from "brazilian-values";
import { parseNumber } from "@/util/helpers";

export default {
  name: "customer-and-price-list",

  computed: {
    ...sync("minValueAndPaymentTermsStore", ["relations", "filter", "loading"]),

    ...get("companyStore", {
      companies: "companies",
      loadingCompanies: "loading",
    }),

    ...get("companyStore", {
      branchs: "branchs",
      loadingBranchs: "loading",
    }),

    ...get("paymentTermStore", {
      paymentTerms: "paymentTerms",
      loadingPaymentTerms: "loading",
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
        this.$store.dispatch("minValueAndPaymentTermsStore/get", this.params);
      },
      deep: true,
    },
  },

  data: () => ({
    relation: {},

    options: {
      pageNumber: 1,
      pageSize: 50,
      sortBy: ["Nome"],
      sortDesc: [false],
    },
  }),

  methods: {
    reset() {
      this.relation = {};
    },

    formatNumber(prop) {
      this.relation[prop] = `${formatToBRL(this.relation[prop] || 0)}`;
    },

    removeFormatNumber(prop) {
      this.relation[prop] = parseNumber(this.relation[prop] || "0,00");
    },

    setFilial() {
      if (this.branchs.count == 1) {
        this.relation["fkFilial"] = this.branchs.data[0].codigo;
      }
    },

    isValid() {
      return (
        this.relation.fkEmpresa != "" &&
        this.relation.fkFilial != "" &&
        this.relation.fkCondicaoPagamento != "" &&
        this.relation.valorMin != ""
      );
    },

    save() {
      if (!this.isValid()) return showError("Preencha os campos corretamente");

      this.removeFormatNumber("valorMin");

      this.$store
        .dispatch("minValueAndPaymentTermsStore/create", this.relation)
        .then((_) => this.reset());
    },

    remove(item) {
      if (
        confirm(
          `Confirma a exclusão do relacionamento ${item.filial} X ${item.condicaoPagamento}?`
        )
      ) {
        this.$store.dispatch("minValueAndPaymentTermsStore/remove", item);
      }
    },
  },
};
</script>

<style>
</style>