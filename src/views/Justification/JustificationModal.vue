<template>
  <b-modal
    v-model="modal"
    :title="`${type == 'add' ? 'Adicionar' : 'Alterar'} justificativa`"
    size="lg"
  >
    <b-form @submit="save">
      <b-container fluid="xl">
        <b-row>
          <b-col sm="12" md="6">
            <label class="mt-1" for="input-with-list">Código</label>
            <b-form-input
              id="codigo"
              :disabled="type == 'edit'"
              v-model="justification.codigo"
              type="number"
              placeholder="Insira aqui um código válido (Ex: 1, 2, 3)"
            ></b-form-input>
          </b-col>

          <b-col sm="12" md="6">
            <label class="mt-1" for="input-with-list">Descrição</label>
            <b-form-input
              id="descricao"
              v-model="justification.descricao"
              placeholder="Este é um exemplo de justificativa"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-container>
    </b-form>

    <template #modal-footer>
      <b-row class="justify-content-end">
        <b-button variant="danger" class="float-right" @click="modal = false">
          Cancelar
        </b-button>
        <b-button
          variant="primary"
          class="float-right"
          @click="save"
          v-loading="loading"
          :disabled="loading"
        >
          Salvar
        </b-button>
      </b-row>
    </template>
  </b-modal>
</template>

<script>
import { sync } from "vuex-pathify";

export default {
  name: "justification-modal",

  computed: {
    ...sync("justificationStore", [
      "justification",
      "type",
      "modal",
      "loading",
    ]),
  },

  methods: {
    save() {
      if (this.type == 'edit') {
        this.$store.dispatch("justificationStore/update", this.justification);
      } else {
        this.$store.dispatch("justificationStore/create", this.justification);
      }
    },
  },
};
</script>