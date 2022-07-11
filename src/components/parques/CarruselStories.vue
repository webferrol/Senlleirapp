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
   
    <FichaTecnicaVue v-if="mostrarFicha"
      @cerrarFicha="mostrarFicha = false"
      :data="fichaDatos"
      :images="imagenesFichaTecnica"
    >
     <template #titulo>
        <h2 class="ficha-tittle">{{fichaDatos.nombre}}</h2>
     </template>
     <template #content>
        <div class="datos-especie">
            <span>
                <h3>Tipoloxía</h3>
                <p>{{fichaDatos.tipoloxia}}</p>
            </span>
            <span>
                <h3>Localizacion</h3>
                <p>{{fichaDatos.localizacion}}</p>
            </span>
            <span>
                <h3>Superficie</h3>
                <p>{{fichaDatos.superficie}} metros cadrados</p>
            </span>
            <span>
                <h3>Cronoloxía</h3>
                <p>{{fichaDatos.cronoloxia}}</p>
            </span>

        </div>
     </template>

     <template #footer>
     <div class="descripcion">
         <h3>Descrición</h3>
         <p>{{fichaDatos.descripcion}}</p>
     </div>
     </template>
    </FichaTecnicaVue>

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
