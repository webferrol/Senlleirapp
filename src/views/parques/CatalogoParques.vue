<template>
  <h1>Catalogo Parques</h1>

  {{ error }}
  <div class="container">
    <img
      class="gallery"
      v-for="(ruta, index) in ruta"
      :key="index"
      :src="ruta"
      alt="No se encuentra"
    />
  </div>


  


</template>

<script setup>
import { ref } from "vue";
import { listAllUrls } from "../../hook/storage.hook";

const error = ref("");
const ruta = ref([]);

const cargarImagenes = async () => {
  try {
    error.value = "";
    ruta.value = await listAllUrls("parques");
  } catch (e) {
    error.value = e.message;
  }
};
cargarImagenes();
</script>

<style scoped>
img {
  width: 500px;
  height: 500px;
  object-fit: contain;
}
</style>