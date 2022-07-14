<template>
    <div>
        Pruebas
        <TheLeafletComponent :location="coordsParques"></TheLeafletComponent>
        <pre>
            {{useParques.parques}}
        </pre>
    </div>
</template>

<script setup>
import TheLeafletComponent from '../components/admin/TheLeafletComponent.vue';

// -> Importaciones <- //
import { ref } from "vue";
import { useStoreParques } from "@/stores/parques";
const useParques = useStoreParques();
const coordsParques = ref([]);

// -> Funcion asincrona que recorre el array para calcular las coordenadas de cada parque y las pinta en el mapa <- //
(async () => {
  try {
    await useParques.setParques();
    for (let i = 0; i < useParques.parques.length; i++) {
      coordsParques.value.push({
        tooltip: useParques.parques[i]?.nombre??'',
        routeParams: { idDoc: useParques.parques[i].idDoc },
        routeName: "FichaParque",
        latLong:[Number(useParques.parques[i].lat),Number(useParques.parques[i].lng)],
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
