<template>
  <div>
    <TheGoogleMaps
      v-if="loader"
      icon="src/assets/arbolito.png"
      :coords="coordsArbol"
    ></TheGoogleMaps>
  </div>
</template>

<script setup>
// -> Importaciones <- //
import { ref } from "vue";
import { useStoreArbores } from "../../stores/arbores";
import TheGoogleMaps from "../../components/TheGoogleMaps.vue";

// -> Constantes / Variables <- //
const loader = ref(false);
const useArbol = useStoreArbores();
const coordsArbol = ref([]);

// -> Funcion asincrona que recorre el array para calcular las coordenadas de cada arbol y las pinta en el mapa <- //
(async () => {
  try {
    await useArbol.setArbores();
    for (let i = 0; i < useArbol.arbores.length; i++) {
      coordsArbol.value.push(
        {
          id: `arboles/id=${useArbol.arbores[i].idDoc}`,
          coords: {
           lat: Number(useArbol.arbores[i].lat),
            lng: Number(useArbol.arbores[i].lng),
          }
      }
      );
    }
    loader.value = true;
  } catch (error) {
    // console.log(error);
  }
})();
</script>
