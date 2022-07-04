<template>
    <section class="componente-stories">
      <span class="tittle">
      <icono :icon="['fa', 'leaf']"></icono>
        <h2>Parques</h2>
      </span>
      <div class="stories-navigator">
        <router-link to="/" class="component-arbol" v-for="(parque, index) in storeParques.parques" >
          <img :src="parque.url_google" :alt="parque.url_google">
          <p class="arbol-name"> {{parque.nombre}}</p>
        </router-link>
        <div class="borde-final"></div>
      </div>
    </section>
    <FichaStoriesVue></FichaStoriesVue>

</template>

<script setup>
import "@/assets/css/carruselStories.css"
import { ref } from "vue";
import { useStoreParques } from "@/stores/parques"; 
import FichaStoriesVue from "./FichaStories.vue";

const error = ref("");
const ruta = ref([]);

const storeParques = useStoreParques();
storeParques.setParques();
console.log(storeParques.parques)

</script>
