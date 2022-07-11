<template>
<h1 class="tittle-section">Catalogo Parques</h1>
    <div class="catalogo-section-component">
        <div class="arbol-catalogo-element" data-titulo="Mostrar" title="Máis info"
            v-for="(parque, index) in storeGeneral.tmp" :key="index" identificador=senlleira.id
            @click="cargarDatosFicha(parque)">
                <img  class="imagen-catalogo" alt="imagen del arbol senlleiro" :src="parque.url_google">
            <div class="arbol-info">
                <span class="arbol">
                    <icono :icon="['fa', 'leaf']"></icono>
                    <h3 class="arbol-nombre">{{ parque.nombre }}</h3>
                </span>
                <span class="lugar">
                    <icono :icon="['fa', 'location-dot']"></icono>
                    <h4 class="arbol-lugar">{{ parque.localizacion }}</h4>
                </span>
            </div>
        </div>
    </div>
     <!-- <pre>{{temPo}}</pre> -->

    <!-- <FichaParquePublica 
    v-if="mostrarFicha"
    :mostrarFicha="mostrarFicha"
    :fichaDatos="fichaDatos" 
    :imagenesFichaTecnica="imagenesFichaTecnica"></FichaParquePublica> -->
    

     
</template>

<script setup>

//Dependencias
import { ref } from "vue";
//import FichaParquePublica from "../parques/FichaParquePublica.vue";
import { useStoreParques } from "../../stores/parques";
import { useStoreGeneral } from "../../stores/general";

import "@/assets/css/catalogo/catalogo.css";

//const mostrarFicha = ref(false)
//const fichaDatos = ref(null);
//const imagenesFichaTecnica = ref([]);

const storeParques = useStoreParques();
const storeGeneral = useStoreGeneral();






// Función que sirve para limpiar el array de imagenes
// const imagenesFichaTecnicaVaciar = () => {
//     while(imagenesFichaTecnica.value.length > 0)
//     imagenesFichaTecnica.value.pop()
// }

const cargarDatosFicha = async (objeto) => {
    console.log(objeto)
    // mostrarFicha.value = true;
    // fichaDatos.value = null;
    // fichaDatos.value = objeto;
    // console.log(fichaDatos.value)
    // // Limpiamos y cargamos las imagenes de la ficha
    // imagenesFichaTecnicaVaciar()
    // await storeParques.listarImagenes('parques/' + fichaDatos.value.idDoc)
    // for (let i = 0; i < storeParques.imagenes.length; i++) {
    //     imagenesFichaTecnica.value.push(storeParques.imagenes[i])
    // }
   
}

const loadPage = async () => {
    await storeParques.setParques();
    storeGeneral.filtrarParques();
}
loadPage();
</script>
