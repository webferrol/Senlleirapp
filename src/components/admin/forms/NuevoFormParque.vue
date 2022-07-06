<template>
  <div class="especies_alert" v-if="loaded">Cargando...</div>
  <div class="form-container">
    <form id="alta-parque" @submit.prevent="handleSubmit">
      <h2>Formulario Alta Parque</h2>
      <icono
        class="close-form"
        :icon="['fa', 'xmark']"
        @click="cerrarForm"
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
          <label for="tipoloxia" class="form-label">Tipoloxía</label>
          <input
            class="input-parque"
            v-model.trim="form.tipoloxia"
            type="text"
            required
            name="tipoloxia"
            id="tipoloxia"
            placeholder="Tipoloxia"
          />
          <label for="localización" class="form-label">Localización</label>
          <input
            class="input-parque"
            v-model.trim="form.localizacion"
            type="text"
            required
            name="localización"
            id="localización"
            placeholder="Localización"
          />

          <label for="lat" class="form-label">Latitud</label>
          <input
            class="input-parque"
            v-model.number="form.lat"
            step="any"
            type="number"
            required
            name="lat"
            id="lat"
            placeholder="Latitud"
          />
          <br>
          <label for="lng" class="form-label">Longitud</label>
          <input
            class="input-parque"
            v-model.number="form.lng"
            step="any"
            type="number"
            required
            name="lng"
            id="lng"
            placeholder="Longitud"
          />
          <br>
          <label for="cronoloxía" class="form-label">Cronoloxía</label>
          <input
            class="input-parque"
            v-model.trim="form.cronoloxia"
            type="text"
            required
            name="cronoloxía"
            id="cronoloxía"
            placeholder="Cronoloxía"
          />
          <label for="superficie" class="form-label">Superficie</label>
          <input
            class="input-parque"
            v-model.number="form.superficie"
            type="number"
            required
            name="superficie"
            id="superficie"
            placeholder="Superficie"
          />
          <br />
          <label for="descripcion" class="form-label">Descripción</label>
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
        <TheUploader @emitirFichero="cargarParque"></TheUploader>
        <div v-if="error.error" class="error">{{ error.message }}</div>
        <div v-if="spinner" class="spinner">Cargando....</div>
      </fieldset>
      <input type="submit" value="Cargar Parque" />
    </form>
  </div>
</template>
<script setup>
import TheUploader from "@/components/theUploader.vue";
import { reactive, ref } from "vue";
import { updateDocument } from "../../../hook/firestore.hook";
import { useStoreParques } from "@/stores/parques";
import "@/assets/css/admin-css/cargarEspecies.css";
//
const emits = defineEmits(["cerrarForm"]);

const cerrarForm = () => {
  emits("cerrarForm");
};

//Llamada al store
const store = useStoreParques();
let tmpImagenes = null;

const form = reactive({
  nombre: "",
  tipoloxia: "",
  localizacion: "",
  lat: "",
  lng: "",
  cronoloxia: "",
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
  form.lat = "";
  form.lng="";
  form.cronoloxia = "";
  form.superficie = "";
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

  //form.urlficha = `parques/${form.id}/${tmpImagenes[0].name}`
  const docRef = await store.insertarParque(form);
  if (tmpImagenes !== null && docRef.id) {
    const urlficha = `parques/${docRef.id}/${tmpImagenes[0].name}`;
    await updateDocument(docRef.id, "Parques", { urlficha: urlficha });
    try {
      error.value = { error: false, message: "" };
      spinner.value = true;
      loaded.value = true;
      for (let i = 0, tam = tmpImagenes.length; i < tam; i++) {
        await store.subirParque({
          ref: `parques/${docRef.id}`,
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
};
</script>