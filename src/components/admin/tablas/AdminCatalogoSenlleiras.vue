<template>
  <div><span class="lenda">P: Proposta para senlleira</span>. Coloca o árbore na Ficha senlleiras</div>
  <div><span class="lenda">S: Senlleira</span>. Indica que a árbore está no catálogo oficial de senlleiras</div>
  <div><span class="lenda">Pu: Publicado</span>. Se o árbore aparece en zoa pública</div>
  <table class="tabla_datos_administrativo">
    <tr class="header_administrativo">
      <td></td>
      <td>Nomes (científico,galego,castelán)</td>
      <td>Nome da árbore</td>
      <td title="Propuesta senlleira"><span class="lenda">P</span></td>
      <td title="Senlleira"><span class="lenda">S</span></td>
      <td title="Senlleira"><span class="lenda">Pu</span></td>
      <td>Ubicación parque</td>
      <td class="tabla_administrativo_options">
        <span>
          <icono :icon="['fa', 'gears']"></icono>
        </span>
      </td>
    </tr>
    <tr
      class="catalogo_administrativo"
      v-for="(arbore, index) in storeArbores.arbores"
      :key="index"
    >
      <td>{{(index+1)}}</td>
      <td>{{ arbore.genero }} {{ arbore.especie }},{{ arbore.nombre_comun }},{{ arbore.nombre_comun_gal }}</td>
      <td>{{arbore.nombre_arbol}}</td>
      <td>{{arbore?.propuesta_senlleira}}</td>
      <td>{{arbore?.senlleira}}</td>
      <td>{{arbore?.publicado}}</td>
      <td>{{ arbore.ubicacion_parque }}</td>
      <td class="tabla_administrativo_options">
        <span>
          <icono
            :icon="['fa', 'trash']"
            @click="
              handleDelete({
                id: arbore.idDoc,
                name: `${arbore.genero} ${arbore.especie}`,
              })
            "
          >
          </icono>

          <button @click="editar(arbore)">
            <icono :icon="['fa', 'pen']"></icono>
          </button>
        </span>
      </td>
    </tr>
  </table>
  <!-- Alerta para eliminar senlleira -->
  <div v-if="mostrar" class="alerta_container">
    <div class="alerta_borrar_especie">
      <h2>Atención</h2>
      <span class="borrar_txt">
        <icono :icon="['fa', 'circle-exclamation']"></icono>
        <p>Se eliminará: {{ nombre }} de maneira irrevesible</p>
        <p>
          !Todas las senlleiras que contentan esta especie se verán afectadas!
        </p>
      </span>
      <span class="borrar_btn">
        <button @click="borrarArbore">Eliminar</button>
        <button @click="mostrar = false">Cancelar</button>
      </span>
    </div>
  </div>

  <!-- Modulo para editar senlleira -->
  <div class="form-container" v-if="arbore">
    <form id="senlleiras" @submit.prevent="cambiarDatos(`${arbore.idDoc}`)">
      <icono
        class="close-form"
        :icon="['fa', 'xmark']"
        @click="arbore = null"
      ></icono>
      <h2>Editar Senlleiras</h2>
      <fieldset class="data_especies">
        <legend>Datos senlleira</legend>
        <label for="genero"> Xénero</label>
        <input
          type="text"
          v-model="arbore.genero"
          id="genero"
          placeholder="Género"
        />
        <label for="especie"> Especie</label>
        <input
          type="text"
          v-model="arbore.especie"
          id="especie"
          placeholder="Especie"
        />
        <label for="nombre_comun"> Nome común (Castelán)</label>
        <input
          type="text"
          v-model="arbore.nombre_comun"
          id="nombre_comun"
          placeholder="Nome en Castelán"
        />
        <label for="nombre_comun_gal"> Nome común (Galego)</label>
        <input
          type="text"
          v-model="arbore.nombre_comun_gal"
          id="nombre_comun_gal"
          placeholder="Nome en Galego"
        />
        <label for="nombre_arbol"> Nome da árbore</label>
        <input
          type="text"
          v-model="arbore.nombre_arbol"
          id="nombre_arbol"
          placeholder="Nome da árbore"
        />
        <label for="altura"> Altura</label>
        <input
          type="number"
          v-model="arbore.altura"
          id="altura"
          step="any"
          placeholder="Altura (metros)"
        />
        <label for="diametroTronco"> Diámetro do tronco</label>
        <input
          type="number"
          step="any"
          v-model="arbore.diametro"
          id="diametroTronco"
          placeholder="Diámetro do tronco (metros)"
        />
        <fieldset>
          <legend>Ubicación</legend>
          <label for="zona-geografica"> Zona xeográfica</label>
          <input
            type="text"
            v-model="arbore.zona_geografica"
            id="zona-geografica"
            placeholder="Lugar donde se sitúa"
          />
          <label for="localizacion" class="form-label"> Ubicación parque</label>
          <select
            @change="
            arbore.ubicacion_parque =
            $event.target.options[$event.target.selectedIndex].text
            " v-model="arbore.idParque" name="localizacion" id="localizacion">
            <option value=""></option>
            <option v-for="valor in storeParques.parques" :key="valor.idDoc" :value="valor.
            idDoc">                
              {{ valor.nombre }}
            </option>
          </select>

          <label for="numero-mapa">Número en el mapa</label>
          <input
            type="number"
            v-model.number="arbore.numero_mapa"
            id="numero-mapa"
            placeholder="Número en el mapa"
          />
          <label for="lat" class="form-label">Latitud</label>
          <input
            type="number"
            v-model.number="arbore.lat"
            step="any"
            id="latitud"
            placeholder="Latitud"
          />
          <label for="lng" class="form-label">Longitud</label>
          <input
            type="number"
            step="any"
            v-model.number="arbore.lng"
            id="lng"
            placeholder="Longitud"
          />
        </fieldset>
        <fieldset>
          <legend>Descripción</legend>
          <label for="descripcion"> Descrición</label>
          <textarea
            rows="10"
            v-model="arbore.descripcion"
            id="descripcion"
            placeholder="Descripción"
          ></textarea>
        </fieldset>
        <fieldset class="data-senlleira">
        <legend>Esta árbore é</legend>
        <div class="senlleira-arbore" style="display: flex;gap: .1rem;">
          <input
            type="checkbox"
            v-model="arbore.senlleira"
            name="senlleira"
            id="senlleira"
          />&nbsp;
          <label class="form-label" for="senlleira">Senlleira</label>
        </div>
        <div class="senlleira-arbore" style="display: flex;gap: .1rem;">
          <input
            type="checkbox"
            v-model="arbore.propuesta_senlleira"
            name="propSenlleira"
            id="propSenlleira"
          />&nbsp;
          <label class="form-label" for="propSenlleira"
            >Proposta de senlleira</label
          >
        </div>
      </fieldset>
       <div class="senlleira-arbore" style="display: flex;gap: .1rem;">
        <input
              type="checkbox"
              v-model="arbore.publicado"
              name="pubicado"
              id="publicado"
            />
            <label class="form-label" for="publicado">Publicado</label>
      </div>
        <fieldset class="editar-images">
          <div class="images" v-for="image of images" :key="image.ref">
            <img class="image" :src="image.src" alt="" />
            <button class="btn-eliminar" @click="deleteImage(image.ref)">
              Eliminar
            </button>
          </div>
        </fieldset>
        <theUploader @emitirFichero="gestionFoto"></theUploader>

        <input
          type="submit"
          value="Editar Senlleira"
          :disabled="arbore === null"
        />
        <div v-if="loading">Guardando...</div>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import "@/assets/css/admin-css/catalogoAdmin.css";
import "@/assets/css/admin-css/cargarEspecies.css";
import TheUploader from "@/components/theUploader.vue";
import { useStoreArbores } from "../../../stores/arbores";
import { useStoreParques } from "@/stores/parques";
import { updateDocument } from "../../../hook/firestore.hook";
import { listAllRef, getDownURL } from "../../../hook/storage.hook";

const storeArbores = useStoreArbores();
const storeParques = useStoreParques();
storeArbores.setArbores().catch((error) => console.log(error));
storeParques.setParques();

const nombre = ref("");
const loading = ref(false);
let itemDelete = null;

const mostrar = ref(false);
const images = ref([]);

const handleDelete = ({ id, name }) => {
  itemDelete = id;
  nombre.value = name;
  mostrar.value = true;
};

const borrarArbore = async () => {
  if (itemDelete) {
    await storeArbores.borrarArbore(itemDelete);
    mostrar.value = false;
  }
};

const deleteImage = (ref) => {
  const texto = prompt(`para eliminar la foto comnfirme la referencia:  ${ref}`);
  if (texto === ref) {
    storeArbores.borrarFoto(ref);
  }
};

//Editar Senlleira
const arbore = ref(null);
const editar = async (sen) => {
  const refs = await listAllRef(`Arbores/${sen.idDoc}`);
  images.value = [];
  refs.forEach(async (ref) => {
    images.value.push({
      ref,
      src: await getDownURL(ref),
    });
  });
  arbore.value = sen;
};

const cambiarDatos = async (id) => {
  try {
    loading.value = true;
    await updateDocument(id, "Arbores", arbore.value);
  } catch (error) {
    console.log("aaaaah", error);
  } finally {
    loading.value = false;
  }
  arbore.value = null;
};

// subir fotos en la edicion
const error = ref(false);

const gestionFoto = async (file) => {
  if (file) {
    const imagen = file[0];
    try {
      error.value = "";
      await storeArbores.subirFoto({
        ref: `Arbores/${arbore.value.idDoc}`,
        file: imagen,
      });
    } catch (e) {
      console.log(e);
      error.value = e.mensage;
    }
  }
};

const cargarFotos = async () => {
  try {
    error.value = "";
    images.value = await setImagenes("Arbores");
  } catch (e) {
    error.value = e;
  }
};
cargarFotos();
</script>

<style scoped>
.lenda{
  background-color: red;
  color: white;
  font-weight: bold;
}
.catalogo_administrativo{
  font-size: .8rem
}
.editar-images {
  display: grid;
  grid-template-columns: auto auto auto;
}
.images {
  display: flex;
  flex-direction: column;
}
.image {
  width: 10vw;
}

.btn-eliminar {
  width: 70px;
  height: 20px;
  margin-top: 0.2em;
}
</style>