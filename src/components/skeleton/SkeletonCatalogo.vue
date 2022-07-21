<template>
<div class="container-galeria">
    <strong :class="{message:message.length>0}">{{message}}</strong>

<div class="skeleton-ficha-tecnica" v-for="ficha in 9">
    
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
strong{
    position: fixed;
    left: 50%;
    top: 10rem;
    z-index: 999;
    transform: translate(-50%, -50%);
}
.message{
    width: fit-content;
    padding: .7rem;
    background-color: rgba(250, 12, 12, 0.8);
    font-size: 1.5rem;
    text-align: center;
    color:   white;
    border-radius: .4rem;
    box-shadow: 0 0 .5rem .5rem white,
    0 0 .5rem inset black;
}

@media screen and (max-width: 900px) {
    .message{
        top: calc(50% - 40px)
    }
}
</style>