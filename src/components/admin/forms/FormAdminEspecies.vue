<template>
  <div v-if="loaded" class="especies_alert especies_loaded">Cargando...</div>
  <div v-if="error.error" class="especies_alert especies_error">{{error.message}}</div>
  <div class="form-container">
    <form id="especies" @submit.prevent="handleSubmit">
    <icono  class="close-form" :icon="['fa', 'xmark']"
    @click="$emit('cerrarFormulario')" ></icono>
      <fieldset class="data_especies">
        <h2>Cargar Especie</h2>
        <input v-model.trim="form.genero" type="text" id="genero" placeholder="Género" required >
        <input v-model.trim="form.especie" type="text" id="especie" placeholder="Especie" required >
        <span class="label_nombre">
          <label for="nombre_comun">Nombre común - Castellano</label>
          <input v-model="form.nombre_comun" type="text" id="nombre_comun" name="nombre_comun" placeholder="(Castellano)" required 
            >
        </span>
        <span class="label_nombre">
          <label for="nombre_comun_gal">Nombre común - Gallego</label>
          <input v-model="form.nombre_comun_gal" type="text" name="nombre_comun_gal" id="nombre_comun_gal"
            placeholder="(Gallego)"  >
        </span>

          <textarea v-model="form.origen_descripcion" name="origen" id="origen_descripcion" cols="30" rows="10" placeholder="Origen y descripción"></textarea>
          <textarea v-model="form.usos" name="usos" id="usos" cols="30" rows="10" placeholder="usos"></textarea>
          <textarea v-model="form.curiosidades" name="curiosidades" id="curisosidades" cols="30" rows="10" placeholder="Curiosidades"></textarea>

        <span class="label_nombre">
          <theUploader
            :required="true"
            @emitirFichero="especieFoto"
          ></theUploader>
          <div
            style="
              color: white;
              background-color: red;
              font-weight: bold;
              font-size: large;
            "
            v-if="error.error"
            class="error"
          >
            {{ error.message }}
          </div>
        </span>
        <input type="submit" value="Cargar Especie">
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import { useStoreEspecies } from '@/stores/especies';
import TheUploader from "@/components/theUploader.vue";
import { reactive,ref } from 'vue';
import '@/assets/css/admin-css/cargarEspecies.css';

const emits = defineEmits(["cerrarFormulario"]);

const cerrarForm = () => {
  emits("cerrarFormulario");
};

const storeEspecies = useStoreEspecies();

const form = reactive({
  genero: "",
  especie: "",
  nombre_comun: "",
  nombre_comun_gal: "",
  origen_descripcion: "",
  usos: "",
  curiosidades: "",
  storage_ref:"",
  google_url:"",
  
})
// Alertas de usuario
const loaded = ref(false);
const error = ref({
  error: false,
  message: 'erroooorr',
})

let tmpImagenes = null;

const reset = () => {
  form.genero = "";
  form.especie = "";
  form.nombre_comun = "";
  form.nombre_comun_gal = "";
  form.origen_descripcion = "";
  form.usos = "";
  form.curiosidades = "";
  form.google_url = "";
  form.storage_ref = "";
}

// Sube los datos del formulario a la base de datos, en caso de errores se muestra por pantalla

const especieFoto = async (imagenes) => {
    try {
    error.value = { error: false, message: "" };
    tmpImagenes = imagenes;
  } catch (e) {
    error.value.error = true;
    error.value.message = e.message;
  }

};

const handleSubmit = async () => {
  const data = await storeEspecies.loadEspecie(form, tmpImagenes[0].name);
  if (storeEspecies.especies.length) {
    try {
      if (tmpImagenes === null || !tmpImagenes.length)
        throw new Error("Falta imagen");
    } catch (e) {
      error.value.error = true;
      error.value.message = e.message;
    }
    if (tmpImagenes !== null && data.id) {
      try {
        error.value = { error: false, message: "" };
        spinner.value = true;
        loaded.value = true;
        for (let i = 0, tam = tmpImagenes.length; i < tam; i++) {
          await storeEspecies.subirFoto({
            ref: `Especies/${data.id}`,
            file: tmpImagenes[i],
          });
        }
        //Guardamos url
        const ref = `Especies/${data.id}/${tmpImagenes[0].name}`;
        await storeEspecies.google_url_save(data.id,ref);
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
  if (data) emits("cerrarFormulario");
};



















const gestionFoto = async (imagenes) => {
  try {
    error.value = { error: false, message: "" };
    tmpImagenes = imagenes;
  } catch (e) {
    error.value.error = true;
    error.value.message = e.message;
  }
};







</script>
