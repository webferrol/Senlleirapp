<template>

  <div class="form-container">
    <div class="succes-public" v-if="exito">
      <div  class="alert-succes">
        <div v-if="loaded" class="cargando">
        <p>Cargando...</p>
        </div>
        <div class="exito" v-else="loaded">
          <p class="txt">A árbore foi publicada correctamente</p>
          <button class="btn-succes" @click="exito = false">Volver ao inicio</button>
        </div>
      </div>
    </div>

    <form id="senlleiras" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <span class="h2-background">
        <h2>Engadir nova árbore </h2>

        <router-link to="/">
          <icono :icon="['fa', 'xmark']"></icono>
        </router-link>
      </span>
      <fieldset class="data-senlleira --localizacion">
        <legend> Datos da árbore </legend>
        <div class="senlleira-nombre-cientifico">
          <label for="arbore" class="form-label"> Nome da árbore <span class="required-user"
              data-set="Campo obligatorio">*</span></label>
          <input v-model="form.nombre_arbol" type="text" name="arbore" id="arbore" placeholder="indica o nome da arbore"
            required />
          <label for="especie" class="form-label">Nome científico <span data-set="Campo obligatorio"
              class="required-user">*</span></label>
          <select @change="handleSelect" v-model="form.idEspecie" name="especie" id="especie" required>
            <option value="#"></option>
            <option class="especie-option" v-for="valor in storeEspecies.especies" :key="valor.idDoc"
              :value="valor.idDoc">
              {{ valor.genero }} {{ valor.especie }}</option>
          </select>
          <label for="nome" class="form-label"> Nome en galego</label>
          <select @change="handleSelect" v-model="form.idEspecie" name="nome" id="nombre-gallego">
            <option v-for="valor in storeEspecies.especies" :key="valor.idDoc" :value="valor.idDoc">
              {{ valor.nombre_comun_gal }}
            </option>
          </select>
          <label for="nome" class="form-label"> Nome en castelán</label>
          <select @change="handleSelect" v-model="form.idEspecie" name="nome" id="nombre-castellano">
            <option v-for="valor in storeEspecies.especies" :key="valor.idDoc" :value="valor.idDoc">
              {{ valor.nombre_comun }}
            </option>
          </select>
        </div>
      </fieldset>
      <fieldset class="data-senlleira">
        <legend>Ubicación</legend>
        <div class="senlleira-localizacion">
          <label for="zona" class="form-label"> Zona xeográfica <span data-set="Campo obligatorio"
              class="required-user">*</span></label>
          <input v-model="form.zona_geografica" type="text" name="zona" id="zona" placeholder="Lugar onde esta a arbore" />
          <label for="localizacion" class="form-label"> Ubicación <span data-set="Campo obligatorio"
              class="required-user">*</span></label>
          <select @change="form.ubicacion_parque = $event.target.options[$event.target.selectedIndex].text"
            v-model="form.idParque" name="localizacion" id="localizacion" required>
            <option value="#"></option>
            <option value="#">Outros</option>
            <option v-for="valor in storeParques.parques" :key="valor.idDoc" :value="valor.idDoc">
              {{ valor.nombre }} </option>
          </select>
          <!-- geolocalizacion -->
          <TheGeolocationComponent></TheGeolocationComponent>
        </div>
      </fieldset>
      <fieldset class="data-senlleira">
        <legend>Descrición</legend>
        <div class="senlleira-localizacion">
          <textarea
            v-model="form.descripcion"
            name="descripcion"
            id="descripcion"
            cols="30"
            rows="10"
            placeholder="breve descripción da árbore"
          ></textarea>
        </div>
      </fieldset>
      <fieldset>
        <legend> Imaxe </legend>
        <div class="data-senlleira">
          <TheUploader @emitirFichero="gestionFoto"></TheUploader>
          <div v-if="error.error" class="error"> {{ error.message }} </div>
        </div>
        <div v-if="spinner" class="spinner"> Cargando.... </div>
      </fieldset>
      <button :disabled="disabled" class="btn-form">Publicar Arbore</button>
    </form>
  </div>
</template>

<script setup>
import TheUploader from '@/components/TheUploader.vue';
import { useStoreArbores } from '@/stores/arbores';
import { useStoreEspecies } from '@/stores/especies';
import { useStoreParques } from '@/stores/parques';
import { reactive, ref, provide } from 'vue';
import "@/assets/css/componente/form-arbol.css";
import TheGeolocationComponent from '../../components/componentesGenerales/TheGeolocationComponent.vue';


// llamada del store
const storeEspecies = useStoreEspecies();
const storeParques = useStoreParques();
const storeArbores = useStoreArbores();

const disabled = ref(false);
storeParques.setParques();
storeArbores.setArbores();

const form = reactive({
  genero: "",
  especie: "",
  idEspecie: 0,
  idParque: 0,
  ubicacion_parque: "",
  zona_geografica: "", //Conxo por exemplo, onde está situado
  senlleira: false,
  propuesta_senlleira: false, //Si no es Senlleira ni propuesta es un árbol común
  nombre_arbol: "",
  nombre_comun: "", //Nombre castellano
  nombre_comun_gal: "",
  storage_ref: "", //es el identificador donde se guarda un fichero en el Storage Cloud
  google_url: "",
  lng: "", //longitud
  lat: "", //latitud
  diametro: 0,
  altura: 0,
  descripcion: "",
  publicado: false,
});

provide('form', form)

// indica todos los errores que se presenten
const error = ref({
  error: false,
  message: "",
});
let tmpImagenes = null;
const spinner = ref(false);
const loaded = ref(true);
const exito = ref(false);

const reset = () =>{
  form.genero = "";
  form.especie = "";
  form.idEspecie = 0;
  form.idParque= 0;
  form.ubicacion_parque=  "";
  form.zona_geografica= "", //Conxo por exemplo, onde está situado
  form.senlleira= false;
  form.propuesta_senlleira = false; //Si no es Senlleira ni propuesta es un árbol común
  form.nombre_arbol= "";
  form.nombre_comun= ""; //Nombre castellano
  form.nombre_comun_gal= "";
  form.storage_ref=  ""; //es el identificador donde se guarda un fichero en el Storage Cloud
  form.google_url= "";
  form.lng= ""; //longitud
  form.lat= ""; //latitud
  form.diametro= 0;
  form.altura= 0;
  form.descripcion= "";
  form.publicado= false;
}


// esta funcion ayuda a encuentrar dentro de un array el idDoc necesario para poder obtener los datos que necesito
const handleSelect = (e) => {
  if (storeEspecies.especies.length) {
    const especie = storeEspecies.especies.find(
      (item) => item.idDoc == e.target.value
    );
    form.genero = especie?.genero;
    form.especie = especie?.especie;
    form.nombre_comun = especie?.nombre_comun;
    form.nombre_comun_gal = especie?.nombre_comun_gal;
  }
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
const handleSubmit = async () => {
  disabled.value = true;
  const data = await storeArbores.insertarArbore(form, tmpImagenes[0].name);
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
        exito.value = true;
        for (let i = 0, tam = tmpImagenes.length; i < tam; i++) {
          await storeArbores.subirFoto({
            ref: `Arbores/${data.id}`,
            file: tmpImagenes[i],
          });
        }
        // guardamos url
        const ref = `Arbores/${data.id}/${tmpImagenes[0].name}`;
        await storeArbores.google_url_save(data.id, ref);
        spinner.value = false;
        reset();
      } catch (e) {
        error.value.error = true;
        error.value.message = e.message;
      } finally {
        loaded.value = false;
        disabled.value = false;

      }
    }
  }
};

storeEspecies
  .setEspecies()
  .then()
  .catch((e) => alert(e));
</script>

