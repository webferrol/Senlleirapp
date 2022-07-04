<template>
    <div class="catalogo-section-component">
        <div class="arbol-catalogo-element" data-titulo="Mostrar" title="Máis info"
            v-for="(senlleira, index) in storeSenlleira.senlleiras" :key="index" identificador=senlleira.id
            @click="cargarDatosFicha(senlleira)">
            <div class="content-img">
                <img alt="imagen del arbol senlleiro" :src="senlleira.google_url">
            </div>
            <div class="arbol-info">
                <span class="arbol">
                    <icono :icon="['fa', 'leaf']"></icono>
                </span>
                <h3 class="arbol-nombre">{{ senlleira.genero }}</h3>
                <span class="lugar">
                    <icono :icon="['fa', 'location-dot']"></icono>
                </span>
                <h4 class="arbol-lugar">{{ senlleira.localizacion }}</h4>
            </div>
        </div>
    </div>
     

    <FichaTecnicaVue 
    v-if="mostrarFicha" @cerrarFicha="mostrarFicha = false"
    :nombre_arbol="fichaDatos.nombre_arbol" :images="imagenesFichaTecnica"></FichaTecnicaVue>

     
</template>

<script setup>

//Dependencias
import { ref } from "vue";
import { useStoreSenlleiras } from "@/stores/senlleiras";
import { useStoreEspecies } from "../../stores/especies";
import FichaTecnicaVue from "./FichaTecnica.vue";

import "@/assets/css/catalogo/catalogo.css";

const storeSenlleira = useStoreSenlleiras();
const storeEspecies = useStoreEspecies();
storeSenlleira.setSenlleiras();
storeEspecies.setEspecies();



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
    const especie = storeEspecies.especies.find(el=>el.id,objeto.idEspecie);
    fichaDatos.value = null;
    fichaDatos.value= {...objeto,...especie};
    // Limpiamos y cargamos las imagenes de la ficha
    imagenesFichaTecnicaVaciar()
    await storeSenlleira.setImagenes('senlleiras/' + objeto.id)
    for (let i = 0; i < storeSenlleira.imagenes.length; i++) {
        imagenesFichaTecnica.value.push(storeSenlleira.imagenes[i])
    }
    await storeEspecies.setEspecies()

    console.log("datos son  => ",fichaDatos, "imagenes son => ",imagenesFichaTecnica.value)
}
</script>
