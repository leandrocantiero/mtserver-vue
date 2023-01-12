<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <b-row class="text-center">
        <b-col sm="12">
          <!-- <base-input type="text" placeholder="Buscar"> </base-input> -->
        </b-col>
      </b-row>
    </base-header>

    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <b-card no-body>
            <b-card-header class="border-0">
              <h3 class="mb-0">Gerencie os relacionamentos aqui</h3>
            </b-card-header>

            <b-card-body>
              <b-tabs content-class="mt-3" pills card fill>
                <b-tab
                  title="Valor mínimo X Condição de pgto"
                  active
                  @click="loadMinValueAndPaymentTerms"
                >
                  <min-value-and-payment-terms />
                </b-tab>

                <b-tab
                  title="Vendedor X Supervisor"
                  @click="loadSellerAndSupervisor"
                >
                  <seller-and-supervisor />
                </b-tab>

                <b-tab
                  title="Tabela de preço X Vendedor"
                  @click.prevent="loadPriceListAndSeller"
                >
                  <price-list-and-seller />
                </b-tab>

                <b-tab
                  title="Cliente X Tabela de preço"
                  @click.prevent="loadCustomerAndPriceList"
                >
                  <customer-and-price-list />
                </b-tab>

                <b-tab
                  title="Condição de pgto X Tabela de preço"
                  @click="loadPaymentTermsAndPriceList"
                >
                  <payment-terms-and-price-list />
                </b-tab>
              </b-tabs>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "relation",

  components: {
    CustomerAndPriceList: () => import("./CustomerAndPriceList.vue"),
    MinValueAndPaymentTerms: () => import("./MinValueAndPaymentTerms.vue"),
    PaymentTermsAndPriceList: () => import("./PaymentTermsAndPriceList.vue"),
    PriceListAndSeller: () => import("./PriceListAndSeller.vue"),
    SellerAndSupervisor: () => import("./SellerAndSupervisor.vue"),
  },

  methods: {
    loadMinValueAndPaymentTerms() {
      this.$store.dispatch("minValueAndPaymentTermsStore/get", {
        pageSize: 1000,
        sortBy: ["FkFilial"],
        sortDesc: [false],
      });

      this.$store.dispatch("companyStore/getCompanies", {
        pageSize: 1000,
        sortBy: ["Nome"],
        sortDesc: [false],
      });

      this.$store.dispatch("companyStore/getBranchs", {
        pageSize: 1000,
        sortBy: ["Nome"],
        sortDesc: [false],
      });

      this.$store.dispatch("paymentTermStore/get", {
        pageSize: 1000,
        sortBy: ["Descricao"],
        sortDesc: [false],
      });
    },

    loadSellerAndSupervisor() {
      this.$store.dispatch("sellerStore/get", {
        pageSize: 1000,
        sortBy: ["Nome"],
        sortDesc: [false],
      });

      this.$store.dispatch("sellerStore/get", {
        supervisorsOnly: true,
        pageSize: 1000,
        sortBy: ["Nome"],
        sortDesc: [false],
      });
    },

    loadPriceListAndSeller() {
      this.$store.dispatch("priceListAndSellerStore/get", {
        pageSize: 1000,
        sortBy: ["FkVendedor"],
        sortDesc: [false],
      });
      this.$store.dispatch("sellerStore/get", {
        pageSize: 1000,
        sortBy: ["Nome"],
        sortDesc: [false],
      });
      this.$store.dispatch("companyStore/getCompanies", {
        pageSize: 1000,
        sortBy: ["Nome"],
        sortDesc: [false],
      });
      this.$store.dispatch("priceListStore/get", {
        pageSize: 1000,
        sortBy: ["Descricao"],
        sortDesc: [false],
      });
    },

    loadCustomerAndPriceList() {
      this.$store.dispatch("customerAndPriceListStore/get", {
        pageSize: 1000,
        sortBy: ["FkClienteCpfCnpj"],
        sortDesc: [false],
      });
      this.$store.dispatch("customerStore/get", {
        pageSize: 1000,
        sortBy: ["RazaoSocial"],
        sortDesc: [false],
      });
      this.$store.dispatch("companyStore/getCompanies", {
        pageSize: 1000,
        sortBy: ["Nome"],
        sortDesc: [false],
      });
      this.$store.dispatch("companyStore/getBranchs", {
        pageSize: 1000,
        sortBy: ["Nome"],
        sortDesc: [false],
      });
      this.$store.dispatch("priceListStore/get", {
        pageSize: 1000,
        sortBy: ["Descricao"],
        sortDesc: [false],
      });
    },

    loadPaymentTermsAndPriceList() {
      this.$store.dispatch("paymentTermsAndPriceListStore/get", {
        pageSize: 1000,
        sortBy: ["FkCondicaoPagamento"],
        sortDesc: [false],
      });

      this.$store.dispatch("customerStore/get", {
        pageSize: 1000,
        sortBy: ["RazaoSocial"],
        sortDesc: [false],
      });

      this.$store.dispatch("sellerStore/get", {
        pageSize: 1000,
        sortBy: ["Nome"],
        sortDesc: [false],
      });

      this.$store.dispatch("companyStore/getCompanies", {
        pageSize: 1000,
        sortBy: ["Nome"],
        sortDesc: [false],
      });

      this.$store.dispatch("companyStore/getBranchs", {
        pageSize: 1000,
        sortBy: ["Nome"],
        sortDesc: [false],
      });

      this.$store.dispatch("priceListStore/get", {
        pageSize: 1000,
        sortBy: ["Descricao"],
        sortDesc: [false],
      });

      this.$store.dispatch("paymentTermStore/get", {
        pageSize: 1000,
        sortBy: ["Descricao"],
        sortDesc: [false],
      });
    },
  },

  mounted() {
    this.loadMinValueAndPaymentTerms();
  },
};
</script>

<style>
</style>