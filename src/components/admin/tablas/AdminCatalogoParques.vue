<template>
  <table class="tabla_datos_administrativo">
    <tr class="header_administrativo">
      <td>Nome</td>
      <td>Tipoloxía</td>
      <td>Localización</td>
      <td>Cronoloxía</td>
      <td>Superficie</td>
      <td>Descripción</td>
      <td class="tabla_administrativo_options">
        <span>
          <icono :icon="['fa', 'gears']"></icono>
        </span>
      </td>
    </tr>

    <tr v-for="(parque, index) in parque" :key="index">
      <td>{{ parque.nombre }}</td>
      <td>{{ parque.tipoloxia }}</td>
      <td>{{ parque.localizacion }}</td>
      <td>{{ parque.cronoloxía }}</td>
      <td>{{ parque.superficie }}</td>
      <td>{{ parque.descripcion }}</td>

      <td class="tabla_administrativo_options">
        <span>
          <icono
            :icon="['fa', 'trash']"
            @click="handleDelete({ id: parque.idCollection })"
          >
          </icono>
          <icono :icon="['fa', 'pen']"></icono>
        </span>
      </td>
    </tr>
  </table>
  <div v-if="mostrar" class="alerta_container">
    <div class="alerta_borrar_especie">
      <h2>Atención</h2>
      <span class="borrar_txt">
        <icono :icon="['fa', 'circle-exclamation']"></icono>
        <p>Se eliminará el parque de manera irrevesible</p>
      </span>
      <span class="borrar_btn">
        <button @click="borrarParque">Eliminar</button>
        <button @click="mostrar = false">Cancelar</button>
      </span>
    </div>
  </div>
</template>

<script setup>
import { getDatos } from "@/hook/firestore.hook";
import { ref } from "vue";
import "@/assets/css/admin-css/catalogoAdmin.css";
import { useStoreParques } from "../../../stores/parques";

const storeParques = useStoreParques();
storeParques.setParques().catch((error) => console.log(error));

const parque = ref(null);
(async () => {
  try {
    parque.value = await getDatos("Parques");
  } catch (error) {
    console.log(error);
  }
})();

const nombre = ref("");
let itemDelete = null;

const mostrar = ref(false);

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
</script>



