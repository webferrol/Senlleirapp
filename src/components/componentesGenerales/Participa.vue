<template>
    <div class="container-participa">
    <img class="logo-santiago" src="@/assets/img/Logo_ConcelloSTGO_Blanco.png" alt="logotipo de santiago">
            <transition name="slide">
                <div class="call-to-action-senlleira">
                    <h1>Involúcrate</h1>
                    <p>¿Queres publicar a túa árbore favorita de Santiago?</p>
                </div>
            </transition>
            <router-link to="/nova-arbore">Subir árbore</router-link>  
    </div>
</template>
<script setup>
import("@/assets/css/componente/participa.css")
</script>