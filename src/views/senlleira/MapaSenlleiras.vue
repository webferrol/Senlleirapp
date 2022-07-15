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
import { getDocumentsWhere } from "../../hook/firestore.hook";
import TheGoogleMaps from "../../components/TheGoogleMaps.vue";

// -> Constantes / Variables <- //
const loader = ref(false);
const arbores = ref([])
const coordsArbol = ref([]);


// -> Funcion asincrona que recorre el array para calcular las coordenadas de cada arbol y las pinta en el mapa <- //
(async () => {
  try {
     arbores.value =  await getDocumentsWhere('Arbores', 'senlleira',true);
    for (let i = 0; i < arbores.value.length; i++) {
      //console.log(arbores.value[i])
      coordsArbol.value.push({
        routeParams: { idDoc: arbores.value[i].idDoc },
        routeName: "FichaSenlleira",
        coords: {
          lat: Number(arbores.value[i].lat),
          lng: Number(arbores.value[i].lng),
        },
      });
    }
    loader.value = true;
  } catch (error) {
    // console.log(error);
  }
})();
</script>
