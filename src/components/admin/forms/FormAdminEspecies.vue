<template>
  <div v-if="loaded" class="especies_alert especies_loaded">Cargando...</div>
  <div v-if="error.error" class="especies_alert especies_error">
    {{ error.message }}
  </div>
  <div class="form-container">
    <form id="especies" @submit.prevent="handleSubmit">
      <icono  class="close-form" :icon="['fa', 'xmark']"
    @click="$emit('cerrarFormulario')" ></icono>
      <fieldset class="data_especies">
        <h2>Cargar Especie</h2>
        <input
          v-model.trim="form.genero"
          type="text"
          id="genero"
          placeholder="Género"
          required
        />
        <input
          v-model.trim="form.especie"
          type="text"
          id="especie"
          placeholder="Especie"
          required
        />
        <span class="label_nombre">
          <label for="nombre_comun">Nombre común - Castellano</label>
          <input
            v-model="form.nombre_comun"
            type="text"
            id="nombre_comun"
            name="nombre_comun"
            placeholder="(Castellano)"
            required
          />
        </span>
        <span class="label_nombre">
          <label for="nombre_comun_gal">Nombre común - Gallego</label>
          <input
            v-model="form.nombre_comun_gal"
            type="text"
            name="nombre_comun_gal"
            id="nombre_comun_gal"
            placeholder="(Gallego)"
          />
        </span>

        <textarea
          v-model="form.origen_descripcion"
          name="origen"
          id="origen_descripcion"
          cols="30"
          rows="10"
          placeholder="Origen y descripción"
        ></textarea>
        <textarea
          v-model="form.usos"
          name="usos"
          id="usos"
          cols="30"
          rows="10"
          placeholder="usos"
        ></textarea>
        <textarea
          v-model="form.curiosidades"
          name="curiosidades"
          id="curisosidades"
          cols="30"
          rows="10"
          placeholder="Curiosidades"
        ></textarea>

        <span class="label_nombre">
          <TheUploader
            :required="true"
            @emitirFichero="especieFoto"
          ></TheUploader>
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
          <div v-if="spinner" class="spinner">Cargando....</div>
            {{ error.message }}
          </div>
        </span>
        <input type="submit" value="Cargar Especie" />
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import TheUploader from "@/components/theUploader.vue";
import { reactive, ref } from "vue";
import { updateDocument } from "../../../hook/firestore.hook";
import { useStoreEspecies } from "@/stores/especies";
import "@/assets/css/admin-css/cargarEspecies.css";

const emits = defineEmits(["cerrarFormulario"]);

const cerrarForm = () => {
  emits("cerrarFormulario");
};

//Llamada al store
const store = useStoreEspecies();
const loaded = ref(false);
const spinner = ref(false);
const error = ref({
  error: false,
  message: "erroooorr",
});
let tmpImagenes = null;

const form = reactive({
  genero: "",
  especie: "",
  nombre_comun: "",
  nombre_comun_gal: "",
  origen_descripcion: "",
  usos: "",
  curiosidades: "",
  urlfotos: "",
});

const reset = () => {
  form.genero = "";
  form.especie = "";
  form.nombre_comun = "";
  form.nombre_comun_gal = "";
  form.origen_descripcion = "";
  form.usos = "";
  form.curiosidades = "";
  form.urlfotos = "";
};

//Funcion para cargar fotos de los parques

const especieFoto = async (imagenes) => {
  try {
    error.value = { error: false, message: "" };
    tmpImagenes = imagenes;
  } catch (e) {
    error.value.error = true;
    error.value.message = e.message;
  }
};

const subidaImagen = async (imagenes, id, collection = "especies") => {
  //Subida al Store
  try {
    error.value = { error: false, message: "" };
    spinner.value = true;
    loaded.value = true;
    for (let i = 0, tam = imagenes.length; i < tam; i++) {
      await store.subirFoto({
        ref: `${collection}/${id}`,
        file: imagenes[i],
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
};

const handleSubmit = async () => {
  const docRef = await store.loadEspecie(form);

  if (tmpImagenes !== null && docRef.id) {
    //Firestore
    const urlfotos = `especies/${docRef.id}/${tmpImagenes[0].name}`;
    console.log(urlfotos);
    await updateDocument(docRef.id, "Especies", { urlfotos: urlfotos });
    await subidaImagen(tmpImagenes, docRef.id);
    if (docRef) emits("cerrarFormulario");
  }
};
</script>
