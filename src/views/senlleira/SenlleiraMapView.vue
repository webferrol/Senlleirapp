<template>
  <div>
    <the-leaflet-component lMapHeight="88vh" v-if="loading" :location="arbores"></the-leaflet-component>
    <nav class="nav-mapa">
      <router-link to="/mapa-senlleiras">Senlleiras</router-link>
      <router-link to="/mapa-parques">Parques</router-link>
    </nav>
  </div>
</template>

<script setup>
// -> Importaciones <- //
import { ref } from "vue";
import { getDocumentsWhere } from "../../hook/firestore.hook";
import TheLeafletComponent from "../../components/admin/TheLeafletComponent.vue";
import "@/assets/css/mapa/google-maps.css";


// -> Constantes / Variables <- //
const loading = ref(false);
const arbores = ref([]);


// -> Funcion asincrona que recorre el array para calcular las coordenadas de cada arbol y las pinta en el mapa <- //
(async () => {
  loading.value = false;
  try {
    arbores.value = await getDocumentsWhere('Arbores', 'senlleira', true);

    arbores.value = arbores.value.map(arbore => ({
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