<template>
  <table class="tabla_datos_administrativo">
    <tr class="header_administrativo">
      <td>Nome</td>
      <td>Tipoloxía</td>
      <td>Localización</td>
      <td>Cronoloxía</td>
      <td>Superficie</td>
      <td>Descrición</td>
      <td class="tabla_administrativo_options">
        <span>
          <icono :icon="['fa', 'gears']"></icono>
        </span>
      </td>
    </tr>

    <tr
      class="catalogo_administrativo"
      v-for="(parque, index) in storeParques.parques"
      :key="index"
    >
      <td>{{ parque.nombre }}</td>
      <td>{{ parque.tipoloxia }}</td>
      <td>{{ parque.localizacion }}</td>
      <td>{{ parque.cronoloxia }}</td>
      <td>{{ parque.superficie }}</td>
      <td>{{ parque.descripcion }}</td>

      <td class="tabla_administrativo_options">
        <span>
          <icono
            :icon="['fa', 'trash']"
            @click="handleDelete({ id: parque.idDoc, name: parque.nombre })"
          >
          </icono>

          <button @click="editar(parque)">
            <icono :icon="['fa', 'pen']" to="/arb-:id"></icono>
          </button>
        </span>
      </td>
    </tr>
  </table>
  <!-- Alerta para eliminar parque -->
  <div v-if="mostrar" class="alerta_container">
    <div class="alerta_borrar_especie">
      <h2>Atención</h2>
      <span class="borrar_txt">
        <icono :icon="['fa', 'circle-exclamation']"></icono>
        <p>Se eliminará {{ nombre }} de manera irrevesible</p>
      </span>
      <span class="borrar_btn">
        <button @click="borrarParque">Eliminar</button>
        <button @click="mostrar = false">Cancelar</button>
      </span>
    </div>
  </div>
  <!-- Modulo para editar -->

  <form
    class="edit-form"
    id="parques"
    @submit.prevent="cambiarDatos(`${parque.idDoc}`)"
    v-if="parque"
  >
    <icono
      class="close-form"
      :icon="['fa', 'xmark']"
      @click="parque = null"
    ></icono>
    <fieldset class="data_especies">
      <h2>Editar Parques</h2>
      <label for="nombre" class="form-label" required>Nome</label>
      <input
        type="text"
        v-model="parque.nombre"
        id="nombre"
        placeholder="Nome"
      />
      <label for="tipoloxia" class="form-label">Tipoloxía</label>
      <input
        type="text"
        v-model="parque.tipoloxia"
        id="tipoloxia"
        placeholder="Tipoloxia"
      />
      <label for="localización" class="form-label">Localización</label>
      <input
        type="text"
        v-model="parque.localizacion"
        id="localizacion"
        placeholder="Localización"
      />
      <label for="lat" class="form-label">Latitud</label>
      <input
        type="number"
        step="any"
        v-model="parque.lat"
        id="latitud"
        placeholder="Latitud"
      />
      <label for="lng" class="form-label">Longitud</label>
      <input
        type="number"
        step="any"
        v-model="parque.lng"
        id="lng"
        placeholder="Longitud"
      />

      <label for="cronoloxia" class="form-label">Cronoloxía</label>
      <input
        type="text"
        v-model="parque.cronoloxia"
        id="cronoloxia"
        placeholder="Cronoloxía"
      />
      <label for="superficie" class="form-label">Superficie</label>
      <input
        type="text"
        v-model="parque.superficie"
        id="superficie"
        placeholder="Superficie"
      />
      <label for="descripcion" class="form-label">Descripción</label>
      <textarea
        type="text"
        v-model="parque.descripcion"
        id="descripcion"
        placeholder="Descripción"
      ></textarea>

      <input type="submit" value="Editar Parque" :disabled="parque === null" />
      <div v-if="loading">Guardando...</div>
    </fieldset>
  </form>
</template>

<script setup>
import { ref } from "vue";
import "@/assets/css/admin-css/catalogoAdmin.css";
import { useStoreParques } from "../../../stores/parques";
import { updateDocument } from "../../../hook/firestore.hook";

const storeParques = useStoreParques();
storeParques.setParques().catch((error) => console.log(error));

const nombre = ref("");
const loading = ref(false);
let itemDelete = null;

const mostrar = ref(false);

// FUNCION PARA ELIMINAR PARQUE
const handleDelete = ({ id, name }) => {
  itemDelete = id;
  nombre.value = name;
  mostrar.value = true;
};

const borrarParque = async () => {
  if (itemDelete) {
    await storeParques.borrarParque(itemDelete);
    mostrar.value = false;
  }
};

// FUNCION PARA EDITAR PARQUE

const parque = ref(null);
const editar = (par) => {
  console.log(par);
  parque.value = par;
};
const cambiarDatos = async (id) => {
  console.log("uid", id);
  try {
    loading.value = true;
    await updateDocument(id, "Parques", parque.value);
  } catch (error) {
    console.log("aaaaah", error);
  } finally {
    loading.value = false;
  }
};
</script>



