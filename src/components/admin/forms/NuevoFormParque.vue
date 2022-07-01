<template>
  <div class="formsenlleira" v-if="loaded">Cargando...</div>
  <div class="form-container">
    <form id="alta-parque" @submit.prevent="handleSubmit">
      <h2>Formulario Alta Parque</h2>
      <icono class="close-form" :icon="['fa', 'xmark']" @click="$emit('cerrarForm')" :key="index"></icono>
      <fieldset class="data-parque">
          <span>
            <label for="nombre" class="form-label" required>Nome</label>
            <input class="input-parque" v-model.trim="form.nombre" type="text" required name="nombre" id="nombre"
              placeholder="Nombre" />
          </span>
          <span>
            <label for="tipoloxia" class="form-label" required>Tipoloxía</label>
            <input class="input-parque" v-model.trim="form.tipoloxia" type="text" required name="tipoloxia" id="tipoloxia"
              placeholder="Tipoloxia" />
          </span>
          <span>
            <label for="localización" class="form-label" required>Localización</label>
            <input class="input-parque" v-model.trim="form.localizacion" type="text" required name="localización"
              id="localización" placeholder="Localización" />
          </span>
          <span>
            <label for="cronoloxía" class="form-label" required>Cronoloxía</label>
            <input class="input-parque" v-model.trim="form.cronoloxía" type="text" required name="cronoloxía"
              id="cronoloxía" placeholder="Cronoloxía" />
          </span>
          <span>
            <label for="superficie" class="form-label" required>Superficie</label>
            <input class="input-parque" v-model.number="form.superficie" type="number" required name="superficie"
              id="superficie" placeholder="Superficie" />
          </span>
          <label for="descripcion" class="form-label" required>Descripción</label>
          <textarea class="input-parque" v-model.trim="form.descripcion" cols="30" rows="10" type="textarea" required
            name="descripcion" id="descripcion" placeholder="Descripcion"></textarea>
        <theUploader @emitirFichero="cargarParque"></theUploader>
        <div v-if="error.error" class="error">{{ error.message }}</div>
        <div v-if="spinner" class="spinner">Cargando....</div>
      </fieldset>
      <input type="submit" class="btn-parque" value="Añadir Parque">
    </form>
  </div>
</template>
<script setup>
import TheUploader from "@/components/theUploader.vue";
import { reactive, ref } from 'vue';
import { useStoreParques } from '@/stores/parques';
import '@/assets/css/admin-css/cargarEspecies.css';

//Llamada al store
const setParques = useStoreParques();
let tmpImagenes = null;


const form = reactive({
  id: null,
  nombre: "",
  tipoloxia: "",
  localizacion: "",
  cronoloxía: "",
  superficie: "",
  descripcion: "",
  urlficha: "",
});

const error = ref({
  error: false,
  message: "",
});

const spinner = ref(false);

const loaded = ref(false);

const reset = () => {
  form.tipoloxia = "";
  form.localizacion = "";
  form.cronoloxía = "";
  form.superficie = "";
  form.id = null;
  form.nombre = "";
  form.descripcion = "";
  form.urlficha = "";
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

const handleSubmit = async () => {
  //Se comprueban errores antes de enviar nada
  //Enviar
  if (setParques.parques.length) {
    form.id = Date.now();
    form.urlficha = `parques/${form.id}/${tmpImagenes[0].name}`
    await setParques.insertarParque(form);
    if (tmpImagenes !== null && form.id) {
      try {
        error.value = { error: false, message: '', }
        spinner.value = true;
        loaded.value = true;
        for (let i = 0, tam = tmpImagenes.length; i < tam; i++) {
          await setParques.subirParque({
            ref: `parques/${form.id}`,
            file: tmpImagenes[i],
          });
        }
        spinner.value = false;
        reset();
      } catch (e) {
        error.value.error = true;
        error.value.message = e.message;
      } finally {
        loaded.value = false;
      }
    }
  }
};



</script>