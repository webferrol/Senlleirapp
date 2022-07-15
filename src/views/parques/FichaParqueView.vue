<template>
  <div>
     <SkeletonCatalogoVue v-if="error.errorBool" message="Error na carga de datos. Póñase en contacto co administrador"></SkeletonCatalogoVue>
    <FichaParqueComponent v-else 
    :parque="parque" 
    :images="imagenesFichaTecnica"
    :arbores="arbores" 
    :mapas="mapas" ></FichaParqueComponent>    
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { listAllUrls } from "../../hook/storage.hook";
import { getDocument,busquedaDatos } from "../../hook/firestore.hook";
import FichaParqueComponent from "../../components/parques/FichaParqueComponent.vue";
import SkeletonCatalogoVue from "../../components/skeleton/SkeletonCatalogo.vue";
const route = useRoute();
const parque = ref({});
const arbores = ref([]);
const error = ref({
  errorBool: false,
  code: 0,
  message: "",
});

const imagenesFichaTecnica = ref([]);
const mapas = ref([]);

/**
 * CARGAMOS LA IMFORMACIÓN DEL PARQUE
 */
(async () => {
  try {
    error.value.errorBool = false;
    parque.value = await getDocument("Parques", route.params.idDoc);
    arbores.value = await busquedaDatos("Arbores","idParque",route.params.idDoc);
    if (!parque.value)
      throw new Error(
        `El parque con código ${route.params.idDoc} no existe. Fichero FichaParqueView.vue`
      );
    //Carga de imágenes

    imagenesFichaTecnica.value = await listAllUrls("parques/" + route.params.idDoc);
    mapas.value = await listAllUrls("parquesficha/" + route.params.idDoc);
   // console.log(mapas.value)
  } catch (err) {
    error.value.errorBool = true;
    error.value.code = err.code;
    error.value.message = err.message;
  }
})();
</script>