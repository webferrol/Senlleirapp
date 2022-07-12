<template>
    <section class="componente-stories">
      <span class="tittle">
      <icono :icon="['fa', 'leaf']"></icono>
        <h2>Parques</h2>
      </span>
      <div class="stories-navigator">
        <article class="component-arbol" @click="cargarDatosFicha(parque)" v-for="(parque, index) in storeParques.parques" :key="index">
          <img :src="parque.url_google" :alt="parque.url_google" :title="parque.url_google">
          <p class="arbol-name"> {{parque.nombre}}</p>
        </article>
      </div>
    </section>    
</template>

<script setup>
import "@/assets/css/carruselStories.css"
import { useStoreParques } from "@/stores/parques"; 

import { useRouter } from "vue-router";
const router = useRouter();

// Imagenes del navegador
const storeParques = useStoreParques();
storeParques.setParques();

// Funcion para cargar datos de la ficha y sus respectivas imágenes
const cargarDatosFicha = async (doc) => {  
  router.push({
    name: 'FichaParque',
    params:{
      idDoc:doc.idDoc
    }
  });
}

</script>
