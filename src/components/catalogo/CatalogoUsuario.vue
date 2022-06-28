<template>
    <span class="background-color"></span>
    <div class="catalogo-section-component">
        <div class="arbol-catalogo-element" data-titulo="Mostrar" title="Máis info" to="/" 
        v-for="(senlleira, index) in storeSenlleira.senlleiras" :key="index" identificador = senlleira.id>
            <div class="content-img">
                <img  alt="imagen del arbol senlleiro" :src="senlleira.google_url">
            </div>
            <div class="arbol-info">
                <span class="arbol"><icono :icon="['fa', 'leaf']"></icono></span>
                <h3 class="arbol-nombre">{{senlleira.genero}}</h3>
                <span class="lugar"><icono :icon="['fa', 'location-dot']"></icono></span>
                <h4 class="arbol-lugar">{{senlleira.localizacion}}</h4>
            </div>
        </div>
    </div>

</template>

<script setup>

//Dependencias
import "@/assets/css/catalogo/catalogo.css";
import { useStoreSenlleiras} from "@/stores/senlleiras";

const storeSenlleira = useStoreSenlleiras();
storeSenlleira.setSenlleiras();

</script>
