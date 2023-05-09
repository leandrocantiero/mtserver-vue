<template>
  <card>
    <b-row align-v="center" slot="header">
      <b-col cols="8">
        <h3 class="mb-0">Editar Perfil</h3>
      </b-col>
      <b-col cols="4" class="text-right">
        <a href="#!" class="btn btn-sm btn-primary" @click="updateProfile"
          >Salvar</a
        >
      </b-col>
    </b-row>

    <b-form @submit.prevent="updateProfile">
      <h6 class="heading-small text-muted mb-4">Informação</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
              label="Codigo"
              placeholder="Codigo"
              v-model="currentUser.codigo"
              readonly
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="text"
              label="Nome"
              placeholder="Nome"
              v-model="currentUser.nome"
            >
            </base-input>
          </b-col>
          <b-col lg="12">
            <base-input
              type="email"
              label="Email"
              placeholder="mike@email.com"
              v-model="currentUser.email"
            >
            </base-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <base-input label="Tipo de usuário">
              <select class="form-control" v-model="currentUser.tipo">
                <option value="0">Vendedor</option>
                <option value="1">Supervisor</option>
              </select>
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="password"
              label="Senha"
              placeholder="Senha de 6 caracteres"
              v-model="currentUser.senha"
            >
            </base-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <base-input
              label="Código do supervisor"
              type="text"
              v-model="currentUser.codigoSupervisor"
            >
            </base-input>
          </b-col>
          <b-col lg="6" class="my-auto">
            <b-form-checkbox
              v-model="currentUser.sysRestoreTablet"
              name="sysRestoreTablet"
              value="accepted"
              unchecked-value="not_accepted"
            >
              Restaurar dispositivo android ao sincronizar?
            </b-form-checkbox>
          </b-col>
        </b-row>
      </div>
    </b-form>
  </card>
</template>

<script>
import { sync } from "vuex-pathify";

export default {
  computed: {
    ...sync("app", ["currentUser"]),
  },

  methods: {
    updateProfile() {
      alert("Função não implementada");
      console.log(this.currentUser);
    },
  },
};
</script>
<style></style>
