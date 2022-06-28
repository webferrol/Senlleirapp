<template>
  <div v-if="loaded" class="especies_alert especies_loaded">Cargando...</div>
  <div v-if="errores.error" class="especies_alert especies_error">{{errores.message}}</div>
  <form id="especies" @submit.prevent="subirDatos">
    <fieldset class="data_especies">

      <h2>Cargar Especie</h2>

      <input v-model.trim="form.genero" type="text" id="genero" placeholder="Género" required>
      <input v-model.trim="form.especie" type="text" id="especie" placeholder="Especie" required>
      <span class="label_nombre">
        <label for="nombre_comun">Nombre común - Castellano</label>
        <input v-model="form.nombre_comun" type="text" id="nombre_comun" name="nombre_comun" placeholder="(Castellano)"
          required>
      </span>
      <span class="label_nombre">
        <label for="nombre_comun_gal">Nombre común - Gallego</label>
        <input v-model="form.nombre_comun_gal" type="text" name="nombre_comun_gal" id="nombre_comun_gal"
          placeholder="(Gallego)" required>
      </span>
        <textarea v-model="form.origen_descripcion" name="origen" id="origen_descripcion" cols="30" rows="10" placeholder="Origen y descripción"></textarea>
        <textarea v-model="form.usos" name="usos" id="usos" cols="30" rows="10" placeholder="usos"></textarea>
        <textarea v-model="form.curiosidades" name="curiosidades" id="curisosidades" cols="30" rows="10" placeholder="Curiosidades"></textarea>

      <input type="submit" value="Cargar Especie">
    </fieldset>
  </form>
</template>

<script setup>
import { useStoreEspecies } from '@/stores/especies';
import { reactive,ref } from 'vue';
import '@/assets/css/admin-css/cargarEspecies.css';

const store = useStoreEspecies();

const form = reactive({
  genero: "",
  especie: "",
  nombre_comun: "",
  nombre_comun_gal: "",
  origen_descripcion: "",
  usos: "",
  curiosidades: "",
  localizacion: []
})
// Alertas de usuario
const loaded = ref(false);
const errores = ref({
  error: false,
  message: 'erroooorr',
})

const reset = () => {
  form.genero = "";
  form.especie = "";
  form.nombre_comun = "";
  form.nombre_comun_gal = "";
  form.origen_descripcion = "";
  form.usos = "";
  form.curiosidades = "";
  form.localizacion = [];
}

// Sube los datos del formulario a la base de datos, en caso de errores se muestra por pantalla
const subirDatos = async () => {
  try {
    errores.value={error: false, message: '',};
    loaded.value=true;
    await store.loadEspecie(form);
    reset();
  } catch (error) {
    errores.value.error=true;
    errores.value.message=error.message;
  } finally{
    loaded.value=false;
  }
}
</script>
