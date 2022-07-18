<template>
  <div  v-if="loading && store.arbores.length">
    <the-leaflet-component lMapHeight="calc(100vh - 70px)" :location="store.arbores"></the-leaflet-component>
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
import { useStoreArbores } from "../../stores/arbores";
import TheLeafletComponent from "../../components/admin/TheLeafletComponent.vue";
import SkeletonMapa from "../../components/skeleton/SkeletonMapa.vue";
import "@/assets/css/mapa/google-maps.css";


// -> Constantes / Variables <- //
const loading = ref(false);
const store = useStoreArbores();


// -> Funcion asincrona que recorre el array para calcular las coordenadas de cada arbol y las pinta en el mapa <- //
(async () => {
  loading.value = false;
  try {
    await store.setSenlleirasPropostas();

    store.arbores = store.arboresSenlleirasPropostas.map(arbore => ({
      tooltip: arbore?.nombre_comun ?? '',
      route: { name: 'FichaSenlleira', params: { idDoc: arbore.idDoc } },
      latLong: [Number(arbore?.lat), Number(arbore?.lng)],
    }))
    loading.value = true;
  } catch (error) {
    console.log(error);
  }
})();
</script>