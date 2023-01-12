<template>
  <b-card no-body class="card-profile" alt="Image placeholder" img-top>
    <b-row class="justify-content-center">
      <b-col lg="3" class="order-lg-2">
        <div class="card-profile-image">
          <a href="#">
            <b-img src="img/theme/team-4.jpg" rounded="circle" />
          </a>
        </div>
      </b-col>
    </b-row>

    <b-card-body class="pt-6">
      <b-row>
        <b-col>
          <div class="card-profile-stats d-flex justify-content-center mt-md-5">
            <div>
              <span class="heading">22</span>
              <span class="description">Pedidos</span>
            </div>
            <div>
              <span class="heading">10</span>
              <span class="description">Clientes</span>
            </div>
            <div>
              <span class="heading">89</span>
              <span class="description">Contatos</span>
            </div>
          </div>
        </b-col>
      </b-row>
      <div class="text-center">
        <h5 class="h3">
          {{ currentUser.nome
          }}<span class="font-weight-light"
            >, {{ currentUser.email || "email não cadastrado" }}</span
          >
        </h5>

        <div class="h5 font-weight-300">
          <i class="ni location_pin mr-2"></i
          >{{ currentUser.tipo == "0" ? "Vendedor" : "Supervisor" }}
        </div>

        <a href="#" class="btn btn-danger mt-5">Cancelar Conta</a>
      </div>
    </b-card-body>
  </b-card>
</template>
<script>
import { sync } from "vuex-pathify";

export default {
  computed: {
    ...sync("app", ["currentUser"]),
  },
};
</script>
<style></style>
