<template>
    <div>
        Pruebas
        <TheLeafletComponent v-if="!loading" icon-url="./parques.png" :location="coordsParques"></TheLeafletComponent>
    </div>
</template>

<script setup>
import TheLeafletComponent from '../components/admin/TheLeafletComponent.vue';

// -> Importaciones <- //
import { ref } from "vue";
import { useStoreParques } from "@/stores/parques";
const useParques = useStoreParques();
const coordsParques = ref([]);
const loading = ref(false);

// -> Funcion asincrona que recorre el array para calcular las coordenadas de cada parque y las pinta en el mapa <- //
(async () => {
  try {
    loading.value = true;
    await useParques.setParques();
    for (let i = 0; i < useParques.parques.length; i++) {
      coordsParques.value.push({
        tooltip: useParques.parques[i]?.nombre??'',
        route: {name:'FichaParque',params:{ idDoc: useParques.parques[i].idDoc }},
        latLong:[Number(useParques.parques[i].lat),Number(useParques.parques[i].lng)],
        coords: {
          lat: Number(useParques.parques[i].lat),
          lng: Number(useParques.parques[i].lng),
        },
      });
    }

    loader.value = true;
  } catch (error) {
    console.log(error);
  } finally{
    loading.value = false;
  }
})();
</script>
