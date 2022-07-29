<template>
    <div class="component-entidades-promotoras">
        <div class="img-container">
            <img src="@/assets/img/logos-entidades/FSE.png" alt="logotipo entidad fondo social europeo">
        </div>
        <div class="img-container">
            <img src="../../assets/img/logos-entidades/concello-de-santiago-de-compostela-marca-logo.png" alt="">
        </div>
        <div class="img-container">
            <img src="../../assets/img/logos-entidades/Xunta-de-Galicia.png" alt="logotipo xunta de galicia">
        </div>
        <div class="img-container">
            <img src="../../assets/img/logos-entidades/obradoiro-de-emprego.png" alt="">
        </div>
        <div class="img-container">
            <img src="../../assets/img/logos-entidades/galicia.png" alt="">
        </div>
        <div class="img-container"><img src="../../assets/img/logos-entidades/xacobeo2122-transparente.png" alt="">
        </div>
        <div class="img-container">
        <img class="alvarellos" src="../../assets/img/logos-entidades/logo-editoria-alvarellos.png" alt="">
            <p>Cesión de planos de parques</p>
        </div>
    </div>

</template>
<script setup>
import '@/assets/css/componente/entidades-promotoras.css'
</script>

<style scoped>
.img-container{
    display: flex;
    flex-direction: column;
}
.img-container .alvarellos{
    width:75%
}
.img-container p {
    font-size: .7rem;
    line-height: .7rem;
    text-align: center;
    font-style: italic;
}

</style>