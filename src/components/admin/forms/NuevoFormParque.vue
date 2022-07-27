<template>
  <div class="especies_alert" v-if="loaded">Cargando...</div>
  <div class="form-container">
    <form id="alta-parque" @submit.prevent="handleSubmit">
      <icono
        class="close-form"
        :icon="['fa', 'xmark']"
        @click="cerrarForm"
      ></icono>
      <fieldset class="data-parque">
        <h2>Formulario Alta Parque</h2>

        <label for="nombre" class="form-label">Nome<span data-set="Campo obligatorio"  class="required-user">*</span></label>
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
          name="tipoloxia"
          id="tipoloxia"
          placeholder="Tipoloxia"
        />
        <label for="localización" class="form-label">Localización</label>
        <input
          class="input-parque"
          v-model.trim="form.localizacion"
          type="text"
          name="localización"
          id="localización"
          placeholder="Localización"
        />


        <TheGeolocationComponent></TheGeolocationComponent>

        <label for="carballeira" class="form-label">Carballeira</label>
        <input
          class="input-parque"
          v-model="form.carballeira"
          type="checkbox"
          name="carballeira"
          id="carballeira"
          
        />

        <label for="cronoloxía" class="form-label">Cronoloxía</label>
        <input
          class="input-parque"
          v-model.trim="form.cronoloxia"
          type="text"
          name="cronoloxía"
          id="cronoloxía"
          placeholder="Cronoloxía"
        />
        <label for="superficie" class="form-label">Superficie</label>
        <input
          class="input-parque"
          v-model.trim="form.superficie"
          type="text"
          name="superficie"
          id="superficie"
          placeholder="Superficie"
        />

        <label for="descripcion" class="form-label">Descripción</label>
        <textarea
          class="input-parque"
          v-model.trim="form.descripcion"
          cols="30"
          rows="10"
          type="textarea"
          name="descripcion"
          id="descripcion"
          placeholder="Descripcion"
        ></textarea>
        <div>Fotos del parque</div>
        <TheUploader :required="true"   @emitirFichero="fotosParques"></TheUploader>
        <div>Mapa del parque</div>
        <TheUploader :required="true"   @emitirFichero="fotoMapa"></TheUploader>

        <div v-if="error.error" class="error">{{ error.message }}</div>
        <div v-if="spinner" class="spinner">Cargando....</div>
      </fieldset>
      <input type="submit" value="Cargar Parque" />
    </form>
  </div>
</template>
<script setup>
import TheUploader from "@/components/theUploader.vue";
import { provide, reactive, ref } from "vue";
import { updateDocument } from "../../../hook/firestore.hook";
import { useStoreParques } from "@/stores/parques";
import TheGeolocationComponent from "../../componentesGenerales/TheGeolocationComponent.vue";
import "@/assets/css/admin-css/cargarEspecies.css";

//
const emits = defineEmits(["cerrarForm"]);

const cerrarForm = () => {
  emits("cerrarForm");
};

//Llamada al store
const store = useStoreParques();
const loaded = ref(false);
const spinner = ref(false);
const error = ref({
  error: false,
  message: "",
});
let tmpImagenes = null;
let tmpMapa = null;

const form = reactive({
  nombre: "",
  tipoloxia: "",
  localizacion: "",
  lat: "",
  lng: "",
  orden:0,
  cronoloxia: "",
  carballeira: false,
  superficie: "",
  descripcion: "",
  urlficha: "", //La ruta de la primera foto del parque
  urlmapa: "", //La ruta de la foto del mapa
});

//Importar componente de geolocalizacion
provide ('form', form)

const reset = () => {
  form.tipoloxia = "";
  form.localizacion = "";
  form.lat = "";
  form.lng = "";
  form.cronoloxia = "";
  form.carballeira = false;
  form.superficie = "";
  form.nombre = "";
  form.descripcion = "";
  form.urlficha = "";
  form.urlmapa = "";
  form.orden = 0;
};

//Funcion para cargar fotos de los parques
const fotosParques = async (imagenes) => {
  try {
    error.value = { error: false, message: "" };
    tmpImagenes = imagenes;
    //await store.subirFoto(imagen);
  } catch (e) {
    error.value.error = true;
    error.value.message = e.message;
  }
};

//Funcion para cargar mapa del parque

const fotoMapa = async (imagen) => {
  try {
    error.value = { error: false, message: "" };
    tmpMapa = imagen;
    //await store.subirFoto(imagen);
  } catch (e) {
    error.value.error = true;
    error.value.message = e.message;
  }
};

const subidaImagen = async (imagenes, id, collection='parques') => {
  //Subida al Store
  try {
    error.value = { error: false, message: "" };
    spinner.value = true;
    loaded.value = true;
    for (let i = 0, tam = imagenes.length; i < tam; i++) {
      await store.subirParque({
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
  const docRef = await store.insertarParque(form);

  if (tmpImagenes !== null && docRef.id) {
    //Firestore
    const urlficha = `parques/${docRef.id}/${tmpImagenes[0].name}`;
    // console.log(urlficha);
    await updateDocument(docRef.id, "Parques", { urlficha: urlficha });
    await subidaImagen(tmpImagenes, docRef.id);
  }

  if (tmpMapa !== null && docRef.id) {
    //Firestore
    const urlMapa = `parquesficha/${docRef.id}/${tmpMapa[0].name}`;
    // console.log(urlMapa)
    //await updateDocument(docRef.id, "Parques", { urlmapa: urlMapa }); Si hace falta una ficha por defecto descomenta esta línea
    await subidaImagen(tmpMapa, docRef.id,'parquesficha');
    // }
    if (docRef) emits("cerrarForm");
  }
};
</script>