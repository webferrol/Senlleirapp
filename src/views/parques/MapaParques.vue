<template>
  <div>
    <TheGoogleMaps
      v-if="loader"
      icon="src/assets/parques.png"
      :coords="coordsParques"
    ></TheGoogleMaps>
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
        id: `parques/id=${useParques.parques[i].idDoc}`,
        coords: {
          lat: Number(useParques.parques[i].lat),
          lng: Number(useParques.parques[i].lng),
        },
      });
    }

    loader.value = true;
  } catch (error) {
    //console.log(error);
  }
})();
</script>
