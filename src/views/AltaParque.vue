<template>
  <div class="formsenlleira" v-if="loaded">Cargando...</div>
  <form id="alta-parque" @submit.prevent="altaParques">
    <h2>Formulario Alta Parque</h2>
    <fieldset class="data-parque">
      <label for="nombre" class="form-label" required>Nombre</label>
      <input
        v-model.trim="form.nombre"
        type="text"
        required
        name="nombre"
        id="nombre"
        placeholder="Nombre"
      />
      <br />

      <label for="descripcion" class="form-label" required>Descripción</label>
      <textarea
        v-model.trim="form.descripcion"
        cols="30"
        rows="10"
        type="textarea"
        required
        name="descripcion"
        id="descripcion"
        placeholder="Descripcion"
      ></textarea>
      <br />


      <div class="data-parque">
        <theUploader @emitirFichero="cargarParque"></theUploader>
        <div v-if="error.error" class="error">
          {{ error.message }}
        </div>
      </div>
      <div v-if="spinner" class="spinner">Cargando....</div>
    </fieldset>

    <button class="btn-parque">Dar de alta parque</button>
  </form>
</template>

<script setup>
import TheUploader from "@/components/theUploader.vue";
import { useStoreParques } from "@/stores/parques";
import { reactive, ref } from "vue";

// llamada del store
const setParques = useStoreParques();

const form = reactive({
  id: null,
  nombre: "",
  descripcion: "",
  urlficha: "",
});

const loaded = ref(false);

// indica todos los errores que se presenten
const error = ref({
  error: false,
  message: "",
});

let tmpImagenes = null; //variable que al principio está vacia
const spinner = ref(false);

const reset = () => {
  form.id = null;
  form.nombre = "";
  form.descripcion = "";
  form.urlficha = "";
};

const altaParques = async () => {
  form.id = Date.now();
  form.urlficha = `parques/${form.id}/${tmpImagenes[0].name}`;
  await setParques.insertarParque(form);
  if (tmpImagenes !== null && form.id) {
    try {
      error.value = { error: false, message: "" };
      spinner.value = true;
      loaded.value = true;
      for (let i = 0, tam = tmpImagenes.length; i < tam; i++) {
        await setParques.subirParque({
          id: `${form.id}`,
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
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style> 
