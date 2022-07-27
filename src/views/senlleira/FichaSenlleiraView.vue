<template>
  <div>
    

    <SkeletonCatalogoVue v-if="error.errorBool" message="Error na carga de datos. Póñase en contacto co administrador"></SkeletonCatalogoVue>
    
    <FichaSenlleiraComponente v-else
    :senlleira="senlleira"
    :images="images"
       
    ></FichaSenlleiraComponente>
  </div>
</template>

<script setup>
import FichaSenlleiraComponente from "../../components/senlleira/FichaSenlleiraComponente.vue";
import SkeletonCatalogoVue from "../../components/skeleton/SkeletonCatalogo.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { listAllUrls } from "../../hook/storage.hook";
import { getDocument} from "../../hook/firestore.hook";


const route = useRoute();
const images = ref([]);
const senlleira = ref({});
const error = ref({
  errorBool: false,
  code: 0,
  message: "",
});

/**
 * CARGAMOS LA INFORMACIÓN DE LA SENLLEIRA
 */

(async () => {
  try {
    error.value.errorBool = false;
    senlleira.value = await getDocument("Arbores", route.params.idDoc);

    if (!senlleira.value)
      throw new Error(
        `A senlleira con código ${route.params.idDoc} non existe. Ficheiro FichaSenlleiraView.vue`
      );
    //Carga de imágenes
    images.value = await listAllUrls(
      "Arbores/" + route.params.idDoc
    );
  } catch (err) {
    error.value.errorBool = true;
    error.value.code = err.code;
    error.value.message = err.message;
    console.log(err);
  }
})();
</script>

