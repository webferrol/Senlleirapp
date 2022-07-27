<template>
  <div>
    <strong v-if="error.errorBool">{{error.message}}</strong> 
    <FichaEspecieComponenteVue
    :especie="especie" 
    :images="imagenesFichaTecnica"
    
    ></FichaEspecieComponenteVue>
  </div>

</template>

<script setup >

import { useRoute } from "vue-router";
import { ref } from "vue";
import { listAllUrls } from "../../hook/storage.hook";
import { getDocument } from "../../hook/firestore.hook";
import FichaEspecieComponenteVue from '../../components/especies/FichaEspecieComponente.vue';

const route = useRoute();
const especie = ref({});
const error = ref({
  errorBool: false,
  code: 0,
  message: "",
});
const imagenesFichaTecnica = ref([]);

/**
 * CARGAMOS LA IMFORMACIÓN DE LA ESPECIE
 */
(async () => {
  try {
    error.value.errorBool = false;
    especie.value = await getDocument("Especies", route.params.idDoc);
    //console.log(parque.value)
    
    //console.log(arbores.value)
    if (!especie.value)
      throw new Error(
        `A especie con código ${route.params.idDoc} non existe. Fichero FichaEspecieView.vue`
      );
    //Carga de imágenes

    imagenesFichaTecnica.value = await listAllUrls("especies/" + route.params.idDoc);
    
   // console.log(mapas.value)
  } catch (err) {
    error.value.errorBool = true;
    error.value.code = err.code;
    error.value.message = err.message;
    console.log("FichaEspecieView--->",err)
  }
})();




</script>

