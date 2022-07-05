<template>
  <table class="tabla_datos_administrativo">
    <tr class="header_administrativo">
      <td>Nome científico</td>
      <td>Nome en Galego</td>
      <td>Nome en Castelán</td>
      <td>Zona xeográfica</td>
      <td>Localización</td>
      <td class="tabla_administrativo_options">
        <span>
          <icono :icon="['fa', 'gears']"></icono>
        </span>
      </td>
    </tr>
    <tr
      class="catalogo_administrativo"
      v-for="(senlleira, index) in storeSenlleira.senlleiras"
      :key="index"
    >
      <td>{{ senlleira.genero }} {{ senlleira.especie }}</td>
      <td>{{ senlleira.nombre_comun }}</td>
      <td>{{ senlleira.nombre_comun_gal }}</td>
      <td>{{ senlleira.zona_geografica }}</td>
      <td>{{ senlleira.localizacion }}</td>
      <td class="tabla_administrativo_options">
        <span>
          <icono
            :icon="['fa', 'trash']"
            @click="
              handleDelete({
                id: senlleira.idDoc,
                name: `${senlleira.genero} ${senlleira.especie}`,
              })
            "
          >
          </icono>

          <button @click="editar(senlleira)">
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
        <p>Se eliminará: {{ nombre }} de manera irrevesible</p>
        <p>
          !Todas las senlleiras que contentan esta especie se verán afectadas!
        </p>
      </span>
      <span class="borrar_btn">
        <button @click="borrarSenlleira">Eliminar</button>
        <button @click="mostrar = false">Cancelar</button>
      </span>
    </div>
  </div>

  <!-- Modulo para editar senlleira -->
  <form
    id="senlleiras"
    @submit.prevent="cambiarDatos(`${senlleira.idDoc}`)"
    v-if="senlleira"
  >
    <icono
      class="close-form"
      :icon="['fa', 'xmark']"
      @click="senlleira = null"
    ></icono>
    <h2>Editar Senlleiras</h2>
    <fieldset class="data_especies">
      <legend>Datos senlleira</legend>

      <label for="genero"> Xénero</label>
      <input
        type="text"
        v-model="senlleira.genero"
        id="genero"
        placeholder="Género"
      />
      <label for="especie"> Especie</label>
      <input
        type="text"
        v-model="senlleira.especie"
        id="especie"
        placeholder="Especie"
      />
      <label for="nombre_comun"> Nome común (Castelán)</label>
      <input
        type="text"
        v-model="senlleira.nombre_comun"
        id="nombre_comun"
        placeholder="Nome en Castelán"
      />
      <label for="nombre_comun_gal"> Nome común (Galego)</label>
      <input
        type="text"
        v-model="senlleira.nombre_comun_gal"
        id="nombre_comun_gal"
        placeholder="Nome en Galego"
      />
      <label for="nombre_arbol"> Nome da árbore</label>
      <input
        type="text"
        v-model="senlleira.nombre_arbol"
        id="nombre_arbol"
        placeholder="Nome da árbore"
      />
      <label for="altura"> Altura</label>
      <input
        type="number"
        v-model="senlleira.altura"
        id="altura"
        placeholder="Altura (metros)"
      />
      <label for="diametroTronco"> Diámetro do tronco</label>
      <input
        type="number"
        v-model="senlleira.diametroTronco"
        id="diametroTronco"
        placeholder="Diámetro do tronco (metros)"
      />
      <fieldset>
        <legend>Ubicación</legend>
        <label for="zona-geografica"> Zona xeográfica</label>
        <input
          type="text"
          v-model="senlleira.zona_geografica"
          id="zona-geografica"
          placeholder="Zona xeográfica"
        />
        <label for="localizacion"> Localización</label>
        <input
          type="text"
          v-model="senlleira.localizacion"
          id="localizacion"
          placeholder="Localización"
        />
        <label for="lat" class="form-label">Latitud</label>
        <input
          type="text"
          v-model="senlleira.lat"
          id="latitud"
          placeholder="Latitud"
        />
        <label for="lng" class="form-label">Longitud</label>
        <input
          type="text"
          v-model="senlleira.lng"
          id="lng"
          placeholder="Longitud"
        />
      </fieldset>
      <fieldset>
        <legend>Descripción</legend>
        <label for="descripcion"> Descrición</label>
        <textarea
          type="text"
          v-model="senlleira.descripcion"
          id="descripcion"
          placeholder="Descripción"
        ></textarea>
      </fieldset>

      <input
        type="submit"
        value="Editar Senlleira"
        :disabled="senlleira === null"
      />
      <div v-if="loading">Guardando...</div>
    </fieldset>
  </form>
</template>

<script setup>
import { ref } from "vue";
import "@/assets/css/admin-css/catalogoAdmin.css";
import { useStoreSenlleiras } from "../../../stores/senlleiras";
import { updateDocument } from "../../../hook/firestore.hook";

const storeSenlleira = useStoreSenlleiras();
storeSenlleira.setSenlleiras().catch((error) => console.log(error));

const nombre = ref("");
const loading = ref(false);
let itemDelete = null;

const mostrar = ref(false);

const handleDelete = ({ id, name }) => {
  itemDelete = id;
  nombre.value = name;
  mostrar.value = true;
};

const borrarSenlleira = async () => {
  if (itemDelete) {
    await storeSenlleira.borrarSenlleira(itemDelete);
  }
};

//Editar Senlleira
const senlleira = ref(null);
const editar = (sen) => {
  //console.log(par);
  senlleira.value = sen;
};
const cambiarDatos = async (id) => {
  //console.log("uid",id);
  try {
    loading.value = true;
    await updateDocument(id, "Singulares", senlleira.value);
  } catch (error) {
    console.log("aaaaah", error);
  } finally {
    loading.value = false;
  }
};
</script>