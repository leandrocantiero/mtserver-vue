<template>
  <b-modal
    v-model="modal"
    :title="`${type == 'add' ? 'Adicionar' : 'Alterar'} meta`"
    size="lg"
  >
    <b-form @submit="save">
      <b-container fluid="xl">
        <b-row>
          <b-col sm="12" md="6">
            <base-input label="Filial" v-loading="loadingBranchs">
              <select class="form-control" v-model="goal.fkFilial">
                <option value="0">Selecione uma opção</option>

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

          <b-col sm="12" md="6">
            <base-input label="Cliente" v-loading="loadingCustomers">
              <select class="form-control" v-model="goal.fkClienteCnpjCpf">
                <option value="0">Selecione uma opção</option>

                <option
                  v-for="customer in customers.data"
                  :key="customer.cnpjCpf"
                  :value="customer.cnpjCpf"
                >
                  {{ customer.cnpjCpf }} | {{ customer.razaoSocial }}
                </option>
              </select>
            </base-input>
          </b-col>

          <b-col sm="12" md="6">
            <base-input label="Vendedor" v-loading="loadingSellers">
              <select class="form-control" v-model="goal.fkVendedor">
                <option value="0">Selecione uma opção</option>

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

          <b-col sm="12" md="6">
            <base-input label="Produto" v-loading="loadingProducts">
              <select class="form-control" v-model="goal.fkProduto">
                <option value="0">Selecione uma opção</option>

                <option
                  v-for="product in products.data"
                  :key="product.codigo"
                  :value="product.codigo"
                >
                  {{ product.descricao }}
                </option>
              </select>
            </base-input>
          </b-col>

          <b-col sm="12" md="6">
            <base-input label="Família produto" v-loading="loadingFamilies">
              <select class="form-control" v-model="goal.fkFamilia">
                <option value="0">Selecione uma opção</option>

                <option
                  v-for="family in families.data"
                  :key="family.codigo"
                  :value="family.codigo"
                >
                  {{ family.descricao }}
                </option>
              </select>
            </base-input>
          </b-col>

          <b-col sm="12" md="6">
            <base-input label="Período" prependIcon="fa fa-calendar">
              <flat-pickr
                slot-scope="{ focus, blur }"
                @on-open="focus"
                @on-close="blur"
                :config="configPickr"
                class="form-control datepicker"
                v-model="goal.periodo"
              >
              </flat-pickr>
            </base-input>
          </b-col>

          <b-col sm="12" md="6">
            <base-input
              label="Quantidade"
              type="number"
              v-model.number="goal.quantidade"
            />
          </b-col>

          <b-col sm="12" md="6">
            <base-input
              label="Valor"
              prependIcon="ni ni-money-coins"
              v-model="goal.valor"
              @blur="formatNumber('valor')"
            />
          </b-col>
        </b-row>
      </b-container>
    </b-form>

    <template #modal-footer>
      <b-row>
        <b-button variant="danger" @click="modal = false"> Cancelar </b-button>
        <b-button variant="primary" @click="save"> Salvar </b-button>
      </b-row>
    </template>
  </b-modal>
</template>

<script>
import { sync, get } from "vuex-pathify";

import { Portuguese } from "flatpickr/dist/l10n/pt";
import { formatToBRL } from "brazilian-values";
import { parseNumber } from "../../util/helpers";

export default {
  name: "goal-modal",

  computed: {
    ...sync("goalStore", ["goal", "type", "modal", "loading"]),

    ...get("sellerStore", {
      sellers: "sellers",
      loadingSellers: "loading",
    }),

    ...get("customerStore", {
      customers: "customers",
      loadingCustomers: "loading",
    }),

    ...get("productStore", {
      products: "products",
      loadingProducts: "loading",
    }),

    ...get("familyStore", {
      families: "families",
      loadingFamilies: "loading",
    }),

    ...get("companyStore", {
      branchs: "branchs",
      loadingBranchs: "loading",
    }),
  },

  watch: {
    modal() {
      if (this.modal) {
        this.formatNumber("valor");
      }
    },
  },

  data: () => ({
    configPickr: {
      locale: Portuguese,
      allowInput: true,
      minDate: "today",
      dateFormat: "m/Y",
    },
  }),

  methods: {
    formatNumber(prop) {
      this.goal[prop] = formatToBRL(this.goal[prop]);
    },

    removeFormatNumber(prop) {
      this.goal[prop] = parseNumber(this.goal[prop]);
    },

    save() {
      this.removeFormatNumber("valor");

      if (this.type == "edit") {
        this.$store.dispatch("goalStore/update", this.goal);
      } else {
        this.$store.dispatch("goalStore/create", this.goal);
      }
    },
  },
};
</script>