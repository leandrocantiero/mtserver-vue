<template>
  <b-modal v-model="modal" title="Adicionar imagens" size="lg">
    <b-row class="mb-1">
      <b-form-file
        v-model="files"
        :state="Boolean(files)"
        multiple
        accept="image/*"
        placeholder="Clique para selecionar as imagens ou arraste-as para cá"
        drop-placeholder="Solte aqui..."
      ></b-form-file>
    </b-row>

    <template #modal-footer>
      <b-row class="justify-content-end">
        <b-button variant="danger" class="float-right" @click="modal = false">
          Cancelar
        </b-button>
        <b-button variant="primary" class="float-right" @click="save">
          Salvar
        </b-button>
      </b-row>
    </template>
  </b-modal>
</template>

<script>
import { sync } from "vuex-pathify";
import { showError } from "../../util/helpers";

export default {
  name: "image-modal",

  computed: {
    ...sync("imageStore", ["image", "modal", "loading"]),
  },

  data: () => ({
    files: [],
  }),

  methods: {
    save() {
      if (this.files.length == 0)
        showError("Informe algumas imagens para continuar");

      this.$store.dispatch("imageStore/save", this.files);
    },
  },
};
</script>