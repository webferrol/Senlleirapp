<template>
  <table class="tabla_datos_administrativo">
    <tr class="header_administrativo">
      <td>Nome científico</td>
      <td>Nome en Galego</td>
      <td>Nome en Castelán</td>
      <td>Zona xeográfica</td>
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
      <td>{{ arbore.genero }} {{ arbore.especie }}</td>
      <td>{{ arbore.nombre_comun }}</td>
      <td>{{ arbore.nombre_comun_gal }}</td>
      <td>{{ arbore.zona_geografica }}</td>
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
  <form
    id="senlleiras"
    @submit.prevent="cambiarDatos(`${arbore.idDoc}`)"
    v-if="arbore"
  >
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
        placeholder="Altura (metros)"
      />
      <label for="diametroTronco"> Diámetro do tronco</label>
      <input
        type="number"
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
        <label for="localizacion">Ubicación parque</label>
        <input
          type="text"
          v-model="arbore.ubicacion_parque"
          id="localizacion"
          placeholder="parque"
        />
        <label for="numero-mapa">Número en el mapa</label>
        <input
          type="number"
          v-model.number="arbore.numero_mapa"
          id="numero-mapa"
          placeholder="Número en el mapa"
        />




        <label for="lat" class="form-label">Latitud</label>
        <input
          type="text"
          v-model="arbore.lat"
          id="latitud"
          placeholder="Latitud"
        />
        <label for="lng" class="form-label">Longitud</label>
        <input
          type="text"
          v-model="arbore.lng"
          id="lng"
          placeholder="Longitud"
        />
      </fieldset>
      <fieldset>
        <legend>Descripción</legend>
        <label for="descripcion"> Descrición</label>
        <textarea
          type="text"
          v-model="arbore.descripcion"
          id="descripcion"
          placeholder="Descripción"
        ></textarea>
      </fieldset>

      <input
        type="submit"
        value="Editar Senlleira"
        :disabled="arbore === null"
      />
      <div v-if="loading">Guardando...</div>
    </fieldset>
  </form>
</template>

<script setup>
import { ref } from "vue";
import "@/assets/css/admin-css/catalogoAdmin.css";
import { useStoreArbores } from "../../../stores/arbores";
import { updateDocument } from "../../../hook/firestore.hook";

const storeArbores = useStoreArbores();
storeArbores.setArbores().catch((error) => console.log(error));

const nombre = ref("");
const loading = ref(false);
let itemDelete = null;

const mostrar = ref(false);

const handleDelete = ({ id, name }) => {
  itemDelete = id;
  nombre.value = name;
  mostrar.value = true;
};

const borrarArbore = async () => {
  if (itemDelete) {
    console.log(itemDelete)
    //await storeArbores.borrarArbore(itemDelete);
  }
};

//Editar Senlleira
const arbore = ref(null);
const editar = (sen) => {
  //console.log(par);
  arbore.value = sen;
};
const cambiarDatos = async (id) => {
  //console.log("uid",id);
  try {
    loading.value = true;
    await updateDocument(id, "Arbores", arbore.value);
  } catch (error) {
    console.log("aaaaah", error);
  } finally {
    loading.value = false;
  }
};
</script>