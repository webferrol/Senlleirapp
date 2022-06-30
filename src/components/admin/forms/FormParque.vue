<template>
  <div class="formsenlleira" v-if="loaded">Cargando...</div>
  <form id="alta-parque" @submit.prevent="handleSubmit">
    <h2>Formulario Alta Parque</h2>
    <icono
      class="close-form"
      :icon="['fa', 'xmark']"
      @click="$emit('cerrarForm')"
      :key="index"
      
    ></icono>

    <fieldset class="data-parque">
      <div class="contain-form-parque">
        <label for="nombre" class="form-label" required>Nome</label>
        <input
          class="input-parque"
          v-model.trim="form.nombre"
          type="text"
          required
          name="nombre"
          id="nombre"
          placeholder="Nombre"
        />

        <label for="tipoloxia" class="form-label" required>Tipoloxía</label>
        <input
          class="input-parque"
          v-model.trim="form.tipoloxia"
          type="text"
          required
          name="tipoloxia"
          id="tipoloxia"
          placeholder="Tipoloxia"
        />

        <label for="localización" class="form-label" required
          >Localización</label
        >
        <input
          class="input-parque"
          v-model.trim="form.localizacion"
          type="text"
          required
          name="localización"
          id="localización"
          placeholder="Localización"
        />

        <label for="cronoloxía" class="form-label" required>Cronoloxía</label>
        <input
          class="input-parque"
          v-model.trim="form.cronoloxía"
          type="text"
          required
          name="cronoloxía"
          id="cronoloxía"
          placeholder="Cronoloxía"
        />

        <label for="superficie" class="form-label" required>Superficie</label>
        <input
          class="input-parque"
          v-model.number="form.superficie"
          type="number"
          required
          name="superficie"
          id="superficie"
          placeholder="Superficie"
        />

        <label for="descripcion" class="form-label" required>Descripción</label>
        <textarea
          class="input-parque"
          v-model.trim="form.descripcion"
          cols="30"
          rows="10"
          type="textarea"
          required
          name="descripcion"
          id="descripcion"
          placeholder="Descripcion"
        ></textarea>
      </div>

      <theUploader @emitirFichero="cargarParque"></theUploader>

      <div v-if="error.error" class="error">{{ error.message }}</div>
      <div v-if="spinner" class="spinner">Cargando....</div>
    </fieldset>

    <button class="btn-parque">{{ buttonText }}</button>
  </form>
</template>
<script setup>
import TheUploader from "@/components/theUploader.vue";
import { inject } from "vue";

const props = defineProps({
  buttonText: {
    type: String,
    default: "Insertar Parque",
  },
});

//Inyectando formulario que esta fuera

let tmpImagenes = null;
const form = inject("form");
const error = inject("error");
const spinner = inject("spinner");
const loaded = inject("loaded");

const emits = defineEmits(["manipularFormulario"]);

const handleSubmit = () => {
  emits("manipularFormulario", tmpImagenes);
};

const cargarParque = async (imagenes) => {
  try {
    error.value = { error: false, message: "" };
    tmpImagenes = imagenes;
    //await store.subirFoto(imagen);
  } catch (e) {
    error.value.error = true;
    error.value.message = e.message;
  }
};
</script>

<style scoped>
h2 {
  font-weight: bolder;
}

#alta-parque {
  padding: 0.5rem;
  margin: 1rem auto;
  width: 50%;
}

.contain-form-parque {
  display: grid;
  grid-template-columns: auto;
  gap: 0.4rem;
  padding-top: 15px;
  padding-bottom: 15px;
}

.btn-parque {
  margin: auto;
  display: flex;
  margin-top: 20px;
  padding: 12px;
  border-radius: 5px;
  border: none;
  background-color: black;
  color: white;
}
</style> 
