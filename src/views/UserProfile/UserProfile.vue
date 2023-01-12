<template>
  <div>
    <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
      style="
        min-height: 600px;
        background-image: url(img/theme/office-1.jpg);
        background-size: cover;
        background-position: center top;
      "
    >
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center">
          <b-row>
            <b-col sm="10">
              <h1 class="display-2 text-white">Olá {{ currentUser.nome }}</h1>
              <p class="text-white mt-0 mb-5">
                Use esta página para alterar as suas informações, como nome,
                endereço, etc...
              </p>
              <a
                href="#"
                class="btn btn-info"
                @click.prevent="scrollTo('#form')"
                >Vamos lá</a
              >
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container id="form" fluid class="mt--6">
      <b-row>
        <b-col xl="4" class="order-xl-2 mb-5">
          <user-card></user-card>
        </b-col>
        <b-col xl="8" class="order-xl-1">
          <edit-profile-form></edit-profile-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { scrollTo } from "@/util/helpers.js";
import { get } from "vuex-pathify";

export default {
  computed: {
    ...get("app", ["currentUser"]),
  },

  components: {
    EditProfileForm: () => import("./EditProfileForm.vue"),
    UserCard: () => import("./UserCard.vue"),
  },

  methods: {
    scrollTo,
  },
};
</script>

<style>
</style>
