<template>
    <div class="stories-navigator">
      <router-link to="/" class="component-arbol" v-for="(parque, index) in storeParques.parques" >
        <img :src="parque.url_google" alt="sdsd">
        <p class="arbol-name"> {{parque.nombre}}</p>
      </router-link>    

      
    </div>

</template>

<script setup>
import "@/assets/css/carruselStories.css"
import { ref } from "vue";
import { useStoreParques } from "@/stores/parques"; 

const error = ref("");
const ruta = ref([]);



const storeParques = useStoreParques();
storeParques.setParques();
console.log(storeParques.parques)

</script>
