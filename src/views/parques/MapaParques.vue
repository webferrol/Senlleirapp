<template>
  <div >
  <TheGoogleMaps v-if="loader" icon="src/assets/parque.png" :coords="coordsParques"></TheGoogleMaps>
  </div>
  
</template>

<script setup>
// -> Importaciones <- //
import { ref } from "vue";
import { useStoreParques } from "../../stores/parques";
import TheGoogleMaps from "../../components/TheGoogleMaps.vue";

// -> Constantes / Variables <- //
const loader = ref(false);
const useParques = useStoreParques();
const coordsParques = ref([]);

// -> Funcion asincrona que recorre el array para calcular las coordenadas de cada parque y las pinta en el mapa <- //
(async () => {
  try {
    await useParques.setParques();
    for (let i = 0; i < useParques.parques.length; i++) {
      coordsParques.value.push({
        lat: useParques.parques[i].lat,
        lng: useParques.parques[i].lng,
      });
    }
    loader.value = true;
  } catch (error) {
    //console.log(error);
  }
})();
</script>
