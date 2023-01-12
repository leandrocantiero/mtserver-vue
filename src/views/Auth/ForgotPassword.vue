<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Esqueceu sua senha? relaxa!</h1>
              <p class="text-lead text-white">
                Utilize o formulário abaixo para realizar a recuperação de
                senha. Caso continue a ter problemas, entre em contato conosco.
              </p>
            </b-col>
          </b-row>
        </div>
      </b-container>

      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Login</small>
              </div>

              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input
                    alternative
                    class="mb-3"
                    name="Código"
                    type="number"
                    :rules="{ required: true }"
                    prepend-icon="fa fa-hashtag"
                    placeholder="Código"
                    v-model="user.codigo"
                  >
                  </base-input>

                  <small v-if="user.codigo"
                    >*Caso este código possua um email cadastrado, você receberá
                    um email com as instruções
                  </small>

                  <div class="text-center">
                    <base-button
                      type="primary"
                      native-type="submit"
                      class="my-4"
                      v-loading="loading"
                      :disabled="loading"
                      >Enviar</base-button
                    >
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/login" class="text-light"
                ><small>Lembrei minha senha</small></router-link
              >
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { sync } from "vuex-pathify";

export default {
  computed: {
    ...sync("authStore", ["loading"]),
  },

  data: () => ({
    user: {},
  }),

  methods: {
    onSubmit() {},
  },
};
</script>
