<template>
    <section class="componente-stories">
      <span class="tittle">
      <icono :icon="['fa', 'leaf']"></icono>
        <h2>Parques</h2>
      </span>
      <div class="stories-navigator">
        <article class="component-arbol" @click="cargarDatosFicha(parque)" v-for="(parque, index) in storeParques.parques" >
          <img :src="parque.url_google" :alt="parque.url_google">
          <p class="arbol-name"> {{parque.nombre}}</p>
        </article>
      </div>
    </section>
   
    <FichaTecnicaVue v-if="mostrarFicha"></FichaTecnicaVue>

</template>

<script setup>
import "@/assets/css/carruselStories.css"
import { ref } from "vue";
import { useStoreParques } from "@/stores/parques"; 
import FichaTecnicaVue from "../catalogo/FichaTecnica.vue";
// Imagenes del navegador
const storeParques = useStoreParques();
storeParques.setParques();

// Cargar datos al hacer click
const mostrarFicha = ref(false)
const fichaDatos = ref(null);
const imagenesFichaTecnica = ref([]);

// Función que sirve para limpiar el array de imagenes
const imagenesFichaTecnicaVaciar = () => {
    while(imagenesFichaTecnica.value.length > 0)
    imagenesFichaTecnica.value.pop()
}

// Funcion para cargar datos de la ficha y sus respectivas imágenes
const cargarDatosFicha = async (objeto) => {
    mostrarFicha.value = true;
    // Limpiamos y cargamos los datos tecnicos de la ficha
    const parque = storeParques.Parques.find(el=>el.id,objeto.idEspecie);
    fichaDatos.value = null;
    fichaDatos.value= {...objeto,...parque};
    console.log(fichaDatos)
    // Limpiamos y cargamos las imagenes de la ficha
    imagenesFichaTecnicaVaciar()
    // await storeSenlleira.setImagenes('senlleiras/' + objeto.idDoc)
    // for (let i = 0; i < storeSenlleira.imagenes.length; i++) {
    //     imagenesFichaTecnica.value.push(storeSenlleira.imagenes[i])
    // }
    // await storeEspecies.setEspecies()
}

</script>
