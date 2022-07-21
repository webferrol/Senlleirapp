<template>
  <div  v-if="loading && coordsParques.length">
    <the-leaflet-component       
        icon-url="../../parques.png"
        lMapHeight="calc(100vh - 70px)" :location="coordsParques"></the-leaflet-component>
    <nav class="nav-mapa">
      <router-link to="/mapa-senlleiras">Senlleiras</router-link>
      <router-link to="/mapa-parques">Parques</router-link>
    </nav>
  </div>
  <skeleton-mapa v-else></skeleton-mapa>
</template>

<script setup>
// -> Importaciones <- //
import { ref } from "vue";
import { useStoreParques } from "../../stores/parques";
import TheLeafletComponent from "../../components/admin/TheLeafletComponent.vue";
import SkeletonMapa from "../../components/skeleton/SkeletonMapa.vue";
import "@/assets/css/mapa/google-maps.css";



// -> Constantes / Variables <- //
const loading = ref(false);
const useParques = useStoreParques();
const coordsParques = ref([]);

// -> Funcion asincrona que recorre el array para calcular las coordenadas de cada parque y las pinta en el mapa <- //
(async () => {
  try {
    await useParques.setParques();
    coordsParques.value = useParques.parques.map(parque => ({
      tooltip: parque?.nombre ?? '',
      route: { name: 'FichaParque', params: { idDoc: parque.idDoc } },
      latLong: [Number(parque?.lat), Number(parque?.lng)],
    }));

    loading.value = true;
  } catch (error) {
    console.log(error);
  }
})();
</script>
