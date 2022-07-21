<template>

    <div class="component-explora">
        <h2 class="explora-titulo">Explora</h2>
        <p class="explora-descripcion">Unha guía interactiva con planos que te guiarán para localizar ata 150 especies
            arbóreas que medran nos parques da nosa cidade, fotos para poder recoñecelos e fichas de cada especie que te
            descubrirán o fascinantes que son.
        </p>
        <div class="container-explora">
            <router-link to="/catalogo-senlleiras" class="explora-senlleira">
                <img src="../../assets/gallery/senlleiras_16.jpg" alt="imagen-explora-senlleiras">
                <h3>Senlleiras</h3>
                <!-- 16 -->
            </router-link>
            <router-link to="/catalogo-de-parques" class="explora-parques">
                <img src="../../assets/gallery/senlleiras_9.jpg" alt="imagen-explora-senlleiras">
                <h3>Parques</h3>
            </router-link>
            <router-link to="/catalogo-de-especies" class="explora-especies">
                <img src="../../assets/gallery/senlleiras_1.jpg" alt="imagen-explora-senlleiras">
                <h3>Especies</h3>
            </router-link>
            <router-link to="/catalogo-propostas" class="explora-arbores">
                <img src="../../assets/gallery/senlleiras_4.jpg" alt="imagen-explora-senlleiras">
                <h3>Propostas cidadás</h3>
            </router-link>
        </div>
    </div>
</template>
<script setup>
import('@/assets/css/componente/explora.css')
</script>