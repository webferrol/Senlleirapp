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
            @click="borrarParque()"
          >
          </icono>
          <icono :icon="['fa', 'pen']"></icono>
        </span>
      </td>
    </tr>
  </table>
</template>

<script setup>
import { getDatos } from "@/hook/firestore.hook";
import { ref } from "vue";
import "@/assets/css/admin-css/catalogoAdmin.css";
import { useStoreParques } from "../../../stores/parques";

const storeParques = useStoreParques();
console.log(storeParques);

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


const borrarParque = async () => {
  if (itemDelete) {
    await storeParques.borrarParque(itemDelete);
  }
};
</script>



