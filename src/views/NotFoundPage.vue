<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-info py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="6" class="px-5">
              <h1 class="text-light">Ooops!</h1>
              <p class="text-lead text-white">
                Parece que a página que você solicitou não existe ou está fora
                do ar.
              </p>

              <router-link
                to="/dashboard"
                class="font-weight-bold text-white mt-5"
                >Voltar para o início</router-link
              >
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

    <section class="py-6">
      <b-container>
        <b-row align-v="center" class="row-grid">
          <b-col md="6">
            <b-img src="img/theme/landing-2.png" fluid />
          </b-col>
          <b-col md="6">
            <div class="pr-md-5">
              <h1 class="text-light">Reportar erro</h1>
              <p class="text-light">
                Caso você ache que isso é um erro e que a página que você
                solicitou deveria existir, por favor nos reporte esse erro para
                que possamos verificar o que aconteceu :D
              </p>
              <router-link to="/user" class="font-weight-bold text-warning mt-5"
                >Reportar</router-link
              >
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  name: "not-found",
};
</script>
