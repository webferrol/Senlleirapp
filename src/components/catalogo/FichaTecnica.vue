<template>
<div class="container-ficha-tecnica">
    <article class="ficha-tecnica">
        <icono  class="cerrar-ficha-tecnica" :icon="['fa', 'xmark']"></icono>
    <h2>{{title}}</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt minima, ab perspiciatis quam fugiat eveniet molestias voluptatum mollitia voluptate? Ad, in. Praesentium enim ipsam itaque amet et magnam ipsa, vel ratione! Nemo necessitatibus nam animi adipisci quidem dolor ea velit, veniam incidunt vel reprehenderit omnis ducimus voluptas veritatis ipsa provident?</p>
    <CarruselImagenesVue></CarruselImagenesVue>
    <div class="caracteristicas-tecnicas">
        <p>Altura: <span>15m</span></p>
        <p>Diametro tronco: <span>4,3m</span></p>
    </div>
    
    </article>
</div>
  
</template>

<script setup>



import CarruselImagenesVue from '../CarruselImagenes.vue';
import "@/assets/css/catalogo/ficha-tecnica.css";

const props = defineProps({
   title: {
    type: String,
    default: 'Título de ejemplo'
   }, 
});

//props.title

</script>
