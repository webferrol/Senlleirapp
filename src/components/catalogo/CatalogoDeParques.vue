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
</template>

<script setup>
//Dependencias
import { useStoreParques } from "../../stores/parques";
import { useStoreGeneral } from "../../stores/general";
import "@/assets/css/catalogo/catalogo.css";

import { useRouter } from "vue-router";
const router = useRouter();


const storeParques = useStoreParques();
const storeGeneral = useStoreGeneral();

const cargarDatosFicha = async (doc) => {
     router.push({
    name: 'FichaParque',
    params:{
      idDoc:doc.idDoc
    }
  });   
}

const loadPage = async () => {
    await storeParques.setParques();
    storeGeneral.filtrarParques();
}
loadPage();
</script>
