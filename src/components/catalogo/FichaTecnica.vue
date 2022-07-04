<template>
<div class="container-ficha-tecnica">
    <article class="ficha-tecnica">
        <span class="head-ficha-tecnica">
            <icono  class="cerrar-ficha-tecnica" :icon="['fa', 'xmark']" @click="$emit('cerrarFicha')"></icono>
                <h2>{{nombre_arbol}}</h2>
        </span>
    <p>{{descripcion}}</p>
    <CarruselImagenesVue :images="images"></CarruselImagenesVue>
    <div class="caracteristicas-tecnicas">
        <p>Altura: <span>{{altura}} metros</span></p>
        <p>Diametro tronco: <span>{{diametro}} metros</span></p>
    </div>
    
    </article>
</div>
  
</template>

<script setup>
import CarruselImagenesVue from '../CarruselImagenes.vue';
import "@/assets/css/catalogo/ficha-tecnica.css";

const props = defineProps({
   nombre_arbol: {
    type: String,
    default: 'Título de ejemplo'
   }, 
   descripcion: {
    type: String,
    default: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos exercitationem debitis reiciendis autem, mollitia officiis vero delectus incidunt, blanditiis doloremque eius ab illo nam? Laborum odio, dolorum quo amet eveniet,'
   },
   images: {
    type: Array,
   },
   altura: {
    type: Number,
    default: 10
   },
   diametro: {
    type: Number,
    default: 4
   }

});

//props.title

</script>
