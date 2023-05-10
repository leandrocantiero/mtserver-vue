<template>
  <card>
    <b-row align-v="center" slot="header">
      <b-col class="text-center">
        <b-btn class="btn-warning btn-sm" @click="reset">Limpar</b-btn>
        <b-btn class="btn-info btn-sm" v-if="configIsEmpty" @click="loadConfig">
          Carregar
        </b-btn>
        <b-btn class="btn-info btn-sm" @click="create">Criar</b-btn>
        <b-btn class="btn-success btn-sm" @click="save">Salvar</b-btn>
      </b-col>
    </b-row>

    <b-form @submit.prevent="updateProfile" v-loading="loading">
      <h6 class="heading-small text-muted mb-4">Conexão com a base de dados</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col xs="12" md="6">
            <base-input
              type="text"
              label="Endereço servidor"
              placeholder="localhost"
              v-model="config.host"
            >
            </base-input>
          </b-col>
          <b-col xs="12" md="6">
            <base-input
              type="text"
              label="Nome da base"
              placeholder="database-1"
              v-model="config.databaseName"
            >
            </base-input>
          </b-col>
          <!-- <b-col xs="12" md="4">
            <base-input
              type="number"
              label="Porta"
              placeholder="3306"
              v-model="config.port"
            >
            </base-input>
          </b-col> -->
          <b-col xs="12" md="6">
            <base-input
              type="text"
              label="Usuário"
              placeholder="user"
              v-model="config.user"
            >
            </base-input>
          </b-col>
          <b-col xs="12" md="6">
            <base-input
              type="password"
              label="Senha"
              placeholder="root"
              v-model="config.password"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>

      <div v-if="!simplified">
        <hr class="my-4" />

        <h6 class="heading-small text-muted mb-4">
          Importação/Exportação automática
        </h6>

        <div class="pl-lg-4">
          <b-row>
            <b-col md="12">
              <base-input
                type="text"
                label="Pasta de leitura"
                placeholder="C:/Microton/MTServer/sync"
                v-model="config.address"
              >
              </base-input>
            </b-col>

            <b-col md="12">
              <base-input
                type="text"
                label="Endpoint do ERP"
                placeholder="https://meuerp.com.br/gravar-dados"
                v-model="config.address"
              >
              </base-input>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-form>
  </card>
</template>

<script>
import { sync } from "vuex-pathify";
import { showError } from "@/util/helpers";

export default {
  computed: {
    ...sync("databaseStore", ["loading"]),

    computedConfig: {
      get() {
        return this.config;
      },
      set(newValue) {
        this.$emit("configChanged", newValue);
      },
    },

    configIsEmpty() {
      return Object.keys(this.config).length === 0;
    },
  },

  props: {
    simplified: {
      type: Boolean,
      default: false,
    },

    config: {
      type: Object,
      default: {},
    },
  },

  methods: {
    reset() {
      this.computedConfig = {};
    },

    loadConfig() {
      this.$store.dispatch("databaseStore/get");
    },

    validate() {
      if (!this.config.host) {
        showError("Informe o endereço do servidor");
        return false;
      }

      if (!this.config.databaseName) {
        showError("Informe o nome da base de dados");
        return false;
      }

      if (!this.config.user) {
        showError("Informe o usuário para acesso");
        return false;
      }

      return true;
    },

    save() {
      if (!this.validate()) return;

      this.$store.dispatch("databaseStore/save", this.config);
    },

    create() {
      if (!this.validate()) return;

      this.$store.dispatch("databaseStore/create", this.config);
    },
  },

  mounted() {},
};
</script>