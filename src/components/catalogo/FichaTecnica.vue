<template>
    <div class="container-ficha-tecnica">
        <article class="ficha-tecnica">
            <span class="head-ficha-tecnica">
                <icono class="cerrar-ficha-tecnica" :icon="['fa', 'xmark']" @click="$emit('cerrarFicha')"></icono>
                <h2>{{ nombre_arbol }}</h2>
            </span>
            <CarruselImagenesVue :images="images"></CarruselImagenesVue>
            <p>{{ descripcion }}</p>

            <div class="caracteristicas-tecnicas">
                <span>
                    <h3>Especie</h3>
                    <p>{{ genero }} {{ especie }}</p>
                </span>
                <span>
                    <h3>Nombre</h3>
                    <p>{{ nombre_comun_gal }}</p>
                </span>
                <span>
                    <h3>Altura:</h3>
                    <p>{{ altura }} metros</p>
                </span>
                <span>
                    <h3>Diametro:</h3>
                    <p>{{ diametroTtronco }} metros</p>
                </span>
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
