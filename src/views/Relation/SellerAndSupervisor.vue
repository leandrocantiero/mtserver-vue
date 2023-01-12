<template>
  <div>
    <b-row>
      <b-col cols="12">
        <base-input
          label="Nome"
          :value="`${seller.codigo ? getSellerData() : ''}`"
          disabled
        />
      </b-col>

      <b-col cols="12" md="4">
        <base-input label="Supervisor" v-loading="loading">
          <select
            class="form-control"
            v-model="seller.codigoSupervisor"
          >
            <option value="" selected>Selecione uma opção</option>

            <option
              v-for="sup in supervisors.data"
              :key="sup.codigo"
              :value="sup.codigo"
            >
              {{ sup.nome }}
            </option>
          </select>
        </base-input>
      </b-col>

      <b-col cols="12" md="4">
        <base-input label="Tipo de usuário">
          <select class="form-control" v-model="seller.tipo">
            <option value="" selected>Selecione uma opção</option>
            <option value="0">Vendedor</option>
            <option value="1">Supervisor</option>
          </select>
        </base-input>
      </b-col>

      <b-col cols="12" md="4">
        <base-input label="Atualiza Saldo Flex?">
          <select class="form-control" v-model="seller.atualizaSaldoFlex">
            <option value="" selected>Selecione uma opção</option>
            <option value="N">Não</option>
            <option value="S">Sim</option>
          </select>
        </base-input>
      </b-col>

      <b-col cols="12" class="text-center">
        <b-btn
          :class="type == 'add' ? 'btn-info' : 'btn-danger'"
          @click="reset"
        >
          {{ type == "add" ? "Limpar" : "Cancelar" }}
        </b-btn>
        <b-btn v-if="type == 'edit'" class="btn-success" @click="save">
          Salvar
        </b-btn>
      </b-col>
    </b-row>

    <hr />

    <base-input
      class="mb-3"
      type="text"
      placeholder="Buscar por nome ou email"
      v-model="filter.nomeOrEmail"
    />

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
      />

      <el-table-column
        prop="nome"
        label="Nome"
        min-width="140px"
        align="center"
      />

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
        align="center"
        prop="supervisor"
        label="Supervisor"
        min-width="140px"
      >
        <template v-slot="{ row }">
          <span> {{ row.supervisor || "Sem supervisor" }} </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="atualizaSaldoFlex"
        label="Utiliza saldo flex?"
        min-width="140px"
      >
        <template v-slot="{ row }">
          <span> {{ row.atualizaSaldoFlex == "N" ? "Não" : "Sim" }} </span>
        </template>
      </el-table-column>

      <el-table-column label="Ações" min-width="140px" align="right">
        <template slot-scope="scope">
          <b-btn
            class="btn-sm btn-success"
            @click="edit(scope.row)"
            :disabled="type == 'edit'"
          >
            Editar
          </b-btn>
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
  </div>
</template>

<script>
import { Table, TableColumn } from "element-ui";
import { sync } from "vuex-pathify";

import { showError } from '@/util/helpers'

export default {
  name: "customer-and-price-list",

  computed: {
    ...sync("sellerStore", {
      sellers: "sellers",
      supervisors: "supervisors",
      loading: "loading",
      filter: "filter",
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
        this.$store.dispatch("sellerStore/get", this.params);
      },
      deep: true,
    },
  },

  data: () => ({
    type: "add",
    seller: {},

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

    getSellerData() {
      return `${this.seller.codigo} - ${this.seller.nome}`;
    },

    isValid() {
      return (
        this.seller.nome != "" &&
        this.seller.tipo != "" &&
        this.seller.atualizaSaldoFlex != ""
      );
    },

    reset() {
      this.type = "add";
      this.seller = {};
    },

    save() {
      if (!this.isValid()) return showError("Preencha os campos corretamente");

      this.$store
        .dispatch("sellerStore/update", this.seller)
        .then((_) => this.reset());
    },

    edit(item) {
      this.type = "edit";
      this.seller = { ...item };
    },
  },
};
</script>

<style>
</style>