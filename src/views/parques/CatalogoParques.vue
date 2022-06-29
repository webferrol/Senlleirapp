<template>
  <h1>Catalogo Parques</h1>
  {{ error }}

  <div v-for="(parque,index) in storeParques.parques" :key="index">
    <h2>{{parque.nombre}}</h2>
    <h2>{{parque.descripcion}}</h2>
    <img  alt="imagen parque" :src="parque?.url_google">
    <div class="container">
  </div>
  </div>

  
</template>

<script setup>
import { ref } from "vue";
import { listAllUrls } from "../../hook/storage.hook"; //imágenes
import { useStoreParques } from "../../stores/parques"; 

const error = ref("");
const ruta = ref([]);



const storeParques = useStoreParques();

storeParques.setParques();
</script>

<style scoped>
h1{
  font-weight: bold;
}
img {
  width: 500px;
  height: 500px;
  object-fit: contain;
}
</style>