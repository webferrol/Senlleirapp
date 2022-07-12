<template>
  <div>
    {{ $route.params.idDoc }}

    <div class="erro" v-if="error.errorBool">
      ({{ error.code }}) {{ error.message }}
    </div>
    <div v-else>
      <pre>{{ parque }}</pre>
      <FichaParquePublica
        :mostrarFicha="true"
        :fichaDatos="parque"
        :imagenesFichaTecnica="imagenesFichaTecnica"
      >
      </FichaParquePublica>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { listAllUrls } from "../../hook/storage.hook";
import { getDocument, busquedaDatos } from "../../hook/firestore.hook";
import FichaParquePublica from "@/components/parques/FichaParquePublica.vue";
const route = useRoute();
const parque = ref({});
const error = ref({
  errorBool: false,
  code: 0,
  message: "",
});

const imagenesFichaTecnica = ref([]);

/**
 * CARGAMOS LA IMFORMACIÓN DEL PARQUE
 */
(async () => {
  try {
    error.value.errorBool = false;
    parque.value = await getDocument("Parques", route.params.idDoc);
    if (!parque.value)
      throw new Error(
        `El parque con código ${route.params.idDoc} no existe. Fichero FichaParqueView.vue`
      );
    //Carga de imágenes

    imagenesFichaTecnica.value = await listAllUrls(
      "parques/" + route.params.idDoc
    );
  } catch (err) {
    error.value.errorBool = true;
    error.value.code = err.code;
    error.value.message = err.message;
  }
})();
</script>