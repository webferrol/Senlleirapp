<template>
    <div class="skeleton-container">
        <div class="skeleton-ficha-tecnica">
            <!-- titulo ficha -->
            <span class="titulo-ficha">
                <div class="skeleton-h1"></div>
                <div class="skeleton-icon"></div>
            </span>
            <!-- carrusel -->
            <div class="skeleton-square"></div>
            <!-- datos -->
            <span class="caracteristicas-ficha">
                <div class="skeleton-h1"></div>
                <!-- caracteristicas -->
                <div class="skeleton-caracteristicas" v-for="caracteristica in 4">
                    <span class="caracteristicas-titulo">
                        <div class="skeleton-icon"></div>
                        <div class="skeleton-h2"></div>
                    </span>
                    <span class="caracteristicas-txt">
                        <div class="skeleton-p"></div>
                        <div class="skeleton-p"></div>
                        <div class="skeleton-p"></div>
                    </span>

                </div>
                <!-- descripcion -->
                <div class="skeleton-h1"></div>
                <span class="skeleton-descripcion">
                    <div class="skeleton-p"></div>
                    <div class="skeleton-p"></div>
                    <div class="skeleton-p"></div>
                    <div class="skeleton-p"></div>
                    <div class="skeleton-p"></div>
                    <div class="skeleton-p"></div>
                    <div class="skeleton-p"></div>
                </span>
            </span>
        </div>

    </div>

</template>
<script setup>
import('@/assets/css/skeleton/skeleton-ficha-tecnica.css');
import('@/assets/css/skeleton/skeleton-elements.css')
</script>