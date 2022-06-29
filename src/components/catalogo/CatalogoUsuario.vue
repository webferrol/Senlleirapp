<template>
    <!-- <span class="background-color"></span> -->
    <div class="catalogo-section-component">
        <div class="arbol-catalogo-element" data-titulo="Mostrar" title="Máis info"
            v-for="(senlleira, index) in storeSenlleira.senlleiras" :key="index" identificador=senlleira.id
            @click="mostrarFicha(senlleira); mostrarFichaTecnica = true">
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
    <FichaTecnicaVue v-if="mostrarFichaTecnica"></FichaTecnicaVue>
    <pre>
        {{
            senlleira
        }}
    </pre>

    <div class="ficha-tecnica">
        <h2 class="nombre-arbol">{{senlleira?.nombre_comun}}</h2>
        <CarruselImagenesVue :images="imagenesFichaTecnica"></CarruselImagenesVue>

    </div>

</template>

<script setup>

//Dependencias
import "@/assets/css/catalogo/catalogo.css";
import { useStoreSenlleiras } from "@/stores/senlleiras";
import { useStoreEspecies } from "../../stores/especies";
import { reactive, ref } from "vue";
import CarruselImagenesVue from "../CarruselImagenes.vue";
import FichaTecnicaVue from "./FichaTecnica.vue";


const storeSenlleira = useStoreSenlleiras();
const storeEspecies = useStoreEspecies();
storeSenlleira.setSenlleiras();
storeEspecies.setEspecies();

const senlleira = ref(null);

const mostrarFichaTecnica = ref(false)

// Funcion para cargar las imagenes correspondientes de la ficha tecnica
const imagenesFichaTecnica = ref([])
const mostrarFicha = async (objeto) => {
    //console.log(objeto)
    const especie = storeEspecies.especies.find(el=>el.id,objeto.idEspecie);
    senlleira.value = {...objeto,...especie};
    imagenesFichaTecnica.value = [];
    await storeSenlleira.setImagenes('senlleiras/' + objeto.id)
    for (let i = 0; i < storeSenlleira.imagenes.length; i++) {
        imagenesFichaTecnica.value.push(storeSenlleira.imagenes[i])
    }
    await storeEspecies.setEspecies()
    console.log(storeEspecies.especies)
}

const cargarInfoEspecie = () => {
    
}



</script>
