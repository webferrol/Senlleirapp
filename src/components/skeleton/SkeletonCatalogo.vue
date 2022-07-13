<template>
<div class="container-galeria">

<div class="skeleton-ficha-tecnica" v-for="ficha in 6">
    <div class="skeleton-title"></div>
    <div class="skeleton-square"></div>

    <span class="ficha-descripcion">
    <div class="skeleton-icon"></div>
    <div class="skeleton-h2"></div>
    </span>

    <span class="ficha-descripcion">
    <div class="skeleton-icon"></div>
    <div class="skeleton-h2"></div>
    </span>
</div>
</div>
</template>

<script setup>

import("@/assets/css/skeleton/skeleton-catalogo.css");
import("@/assets/css/skeleton/skeleton-elements.css")
</script>