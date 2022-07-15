<template>
<div class="container-galeria">
    <strong :class="{message:message.length>0}">{{message}}</strong>

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

defineProps({
    message:{
        type:String,
        default: '',
    }
})

import("@/assets/css/skeleton/skeleton-catalogo.css");
import("@/assets/css/skeleton/skeleton-elements.css")
</script>

<style scoped>
.container-galeria{
    position: relative;
    height: 100vh;
}
.message{
    position: absolute;
    left: 50%;
    top: 8rem;
    z-index: 999;
    width: 80vw;
    padding: .7rem;
    background-color: rgba(250, 12, 12, 0.8);
    font-size: 3vw;
    color:   white;
    transform: translateX(-50%);
    border-radius: .4rem;
    box-shadow: 0 0 .5rem .5rem white,
    0 0 .5rem inset black;
    
}
</style>