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

    <FichaParquePublica 
    v-if="mostrarFicha"
    :mostrarFicha="mostrarFicha"
    :fichaDatos="fichaDatos" 
    :imagenesFichaTecnica="imagenesFichaTecnica"></FichaParquePublica>

    
</template>

<script setup>
import "@/assets/css/carruselStories.css"
import { ref } from "vue";
import { useStoreParques } from "@/stores/parques"; 
import FichaParquePublica from "./FichaParquePublica.vue";


// Imagenes del navegador
const storeParques = useStoreParques();
storeParques.setParques();


const fichaDatos = ref(null);
const imagenesFichaTecnica = ref([]);
const mostrarFicha = ref(false)

// Función que sirve para limpiar el array de imagenes
const imagenesFichaTecnicaVaciar = () => {
    while(imagenesFichaTecnica.value.length > 0)
    imagenesFichaTecnica.value.pop()
}

// Funcion para cargar datos de la ficha y sus respectivas imágenes
const cargarDatosFicha = async (objeto) => {
  console
    mostrarFicha.value = true;
    // Limpiamos y cargamos los datos tecnicos de la ficha
    // const parque = storeParques.parques.find(el=>objeto.idDoc===el.idDoc);
    fichaDatos.value = null;
    // fichaDatos.value= {...objeto,...parque};
    fichaDatos.value = objeto
    console.log(fichaDatos.value)
    // Limpiamos y cargamos las imagenes de la ficha
    imagenesFichaTecnicaVaciar()
    await storeParques.listarImagenes('parques/' + fichaDatos.value.idDoc)
    for (let i = 0; i < storeParques.imagenes.length; i++) {
        imagenesFichaTecnica.value.push(storeParques.imagenes[i])
    }
}

</script>
