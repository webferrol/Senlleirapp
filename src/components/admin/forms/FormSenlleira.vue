<template>
  <div class="formsenlleira" v-if="loaded">Cargando...</div>

  <div class="form-background">
    <form
      id="senlleiras"
      method="post"
      enctype="multipart/form-data"
      @submit.prevent="handleSubmit"
    >
    
      <span class="h2-background">
        <h2>Formulario senlleira</h2>
        <icono @click="cerrarForm" :icon="['fa', 'xmark']"></icono>
      </span>
      <fieldset class="data-senlleira --localizacion">
        <legend>Datos senlleira</legend>
        <div class="senlleira-nombre-cientifico">
          <label for="arbore" class="form-label">
            Nome da árbore <span data-set="Campo obligatorio"  class="required-user">*</span></label
          >
          <input
            v-model="form.nombre_arbol"
            type="text"
            name="arbore"
            id="arbore"
            placeholder="indica o nome da arbore"
            required
          />

          <label for="especie" class="form-label"
            >Nome científico <span data-set="Campo obligatorio"  class="required-user">*</span></label
          >

          <select
            @change="handleSelect"
            v-model="form.idEspecie"
            name="especie"
            id="especie"
          >
            <option></option>
            <option
              class="especie-option"
              v-for="valor in storeEspecies.especies"
              :key="valor.idDoc"
              :value="valor.idDoc"
              required
            >
              {{ valor.genero }} {{ valor.especie }}
            </option>
          </select>
          <label for="nome" class="form-label"> Nome en galego</label>
          <select
            @change="handleSelect"
            v-model="form.idEspecie"
            name="nome"
            id="nombre-gallego"
          >
            <option
              v-for="valor in storeEspecies.especies"
              :key="valor.idDoc"
              :value="valor.idDoc"
            >
              {{ valor.nombre_comun_gal }}
            </option>
          </select>
          <label for="nome" class="form-label"> Nome en castelán</label>
          <select
            @change="handleSelect"
            v-model="form.idEspecie"
            name="nome"
            id="nombre-castellano"
          >
            <option
              v-for="valor in storeEspecies.especies"
              :key="valor.idDoc"
              :value="valor.idDoc"
            >
              {{ valor.nombre_comun }}
            </option>
          </select>
          <label for="altura" class="form-label">Altura (metros)</label>
          <input
            id="altura"
            name="altura"
            v-model.number="form.altura"
            type="number"
            step="any"
            placeholder="31"
          />

          <label for="perimetroTronco" class="form-label"
            >Perímetro do tronco (metros)</label
          >
          <input
            id="perimetroTronco"
            name="perimetroTronco"
            v-model.number="form.diametro"
            type="number"
            step="any"
            placeholder="10,5"
          />
        </div>
      </fieldset>
      <fieldset class="data-senlleira">
        <legend>Ubicación</legend>
        <div class="senlleira-localizacion">
          <label for="zona" class="form-label"> Zona xeográfica </label>
          <input
            v-model="form.zona_geografica"
            type="text"
            name="zona"
            id="zona"
            placeholder="lugar de situacion"
          />
          <!-- Geolocation -->
          <TheGeolocationComponent></TheGeolocationComponent>

        </div>
      </fieldset>
      <fieldset class="data-senlleira">
        <div class="senlleira-localizacion">
          <legend>Parque</legend>
          <label for="localizacion" class="form-label"> Ubicación parque</label>
          <select
            @change="
              form.ubicacion_parque =
                $event.target.options[$event.target.selectedIndex].text
            "
            v-model="form.idParque"
            name="localizacion"
            id="localizacion"
          >
            <option value=""></option>
            <option
              v-for="valor in storeParques.parques"
              :key="valor.idDoc"
              :value="valor.idDoc"
            >
              {{ valor.nombre }}
            </option>
          </select>

          <input type="hidden" v-model="form.ubicacion_parque" />
        </div>
      </fieldset>
      <fieldset class="data-senlleira">
        <legend>Descripción</legend>
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
      <fieldset class="data-senlleira">
        <legend>Esta árbore é</legend>
        <div class="senlleira-arbore">
          <input
            type="checkbox"
            v-model="form.senlleira"
            name="senlleira"
            id="senlleira"
          />&nbsp;
          <label class="form-label" for="senlleira">Senlleira</label>
          <input
            type="checkbox"
            v-model="form.propuesta_senlleira"
            name="propSenlleira"
            id="propSenlleira"
          />&nbsp;
          <label class="form-label" for="propSenlleira"
            >Proposta de senlleira</label
          >
        </div>
      </fieldset>
      <div class="senlleira-arbore">
        <input
              type="checkbox"
              v-model="form.publicado"
              name="pubicado"
              id="publicado"
            />&nbsp;
            <label class="form-label" for="publicado">Publicado</label>
      </div>
      <fieldset>
        <legend>Imaxe</legend>
        <div class="data-senlleira">
          <TheUploader
            :required="true"
            @emitirFichero="gestionFoto"
          ></TheUploader>
          <div
            style="
              color: white;
              background-color: red;
              font-weight: bold;
              font-size: large;"
            v-if="error.error" class="error">
            {{ error.message }}
          </div>
        </div>
        <div v-if="spinner" class="spinner">Cargando....</div>
      </fieldset>
      <button :disabled="disabled" class="btn-form" >Publicar Arbol</button>
    </form>
    
  </div>
</template>

<script setup>
import { provide, reactive, ref } from "vue";
import TheUploader from "@/components/TheUploader.vue";
import { useStoreArbores } from "@/stores/arbores";
import { useStoreParques } from "@/stores/parques";
import { useStoreEspecies } from "@/stores/especies";
import TheGeolocationComponent from "../../componentesGenerales/TheGeolocationComponent.vue";

import "@/assets/css/formularioSenlleira.css";

const emits = defineEmits(["cerrarForm"]);

const disabled = ref(false);

const cerrarForm = () => {
  emits("cerrarForm");
};

const form = reactive({
  genero: "",
  especie: "",
  idEspecie: 0,
  ubicacion_parque: "",
   zona_geografica: "", //Conxo por exemplo, onde está situado
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
  senlleira: false,
  propuesta_senlleira: false, //Si no es Senlleira ni propuesta es un árbol común
  publicado:true,
});

provide('form',form)

// llamada del store
const storeArbores = useStoreArbores();
const storeEspecies = useStoreEspecies();
const storeParques = useStoreParques();
const loaded = ref(false);

// indica todos los errores que se presenten
const error = ref({
  error: false,
  message: "",
});

//Cargamos parques
storeParques.setParques();

let tmpImagenes = null; //variable que al principio está vacia
const spinner = ref(false);

const reset = () => {
  form.genero = "";
  form.especie = "";
  form.idEspecie = 0;
  form.ubicacion_parque = "";
  form.zona_geografica = ""; //Conxo por exemplo, onde está situado
  form.nombre_arbol = "";
  form.nombre_comun = ""; //Nombre castellano
  form.nombre_comun_gal = "";
  form.storage_ref = ""; //es el identificador donde se guarda un fichero en el Storage Cloud
  form.google_url = "";
  form.lat = "";
  form.lng = "";
  form.altura = "";
  form.diametro = "";
  form.descripcion = "";
  form.senlleira = false;
  form.propuesta_senlleira = false;
  form.publicado = true;
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

// esta funcion encuentra dentro del array de espacies el id necesario para poder obtener los
//  datos que necesito para la base de datos de senlleira
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
        loaded.value = true;
        for (let i = 0, tam = tmpImagenes.length; i < tam; i++) {
          await storeArbores.subirFoto({
            ref: `Arbores/${data.id}`,
            file: tmpImagenes[i],
          });
        }
        //Guardamos url
        const ref = `Arbores/${data.id}/${tmpImagenes[0].name}`;
        await storeArbores.google_url_save(data.id,ref);
        spinner.value = false;
        reset();
      } catch (e) {
        error.value.error = true;
        error.value.message = e.message;
      } finally {
        loaded.value = false;
        disabled.value=false;
      }
    }
  }
  if (data) emits("cerrarForm");
};

storeEspecies
  .setEspecies()
  .then()
  .catch((e) => alert(e));
</script>

