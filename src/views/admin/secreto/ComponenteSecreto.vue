<template>
    <div class="secreto-background">
        <div class="secreto-container">
        <h3>Grupo sansus 2021 - 2022</h3>
        <p>Acabas de atopar unha ficha supersecreta!</p>
        <img src="./nadir.jpg" alt="supersecreto">

        <p>Somos os alumnos traballadores do Obradoiro Santiago Sustentable 2021 - 2022 (sansus)</p>
        <div class="lista-alumnos">
        <p>David Antelo Noya</p>
        <p>Marta Collazo Gómez</p>
        <p>Pablo Víctor Estévez Arias</p>
        <p>Simón Facorro Pérez</p>
        <p>Martín Gago Chorén</p>
        <p>Iria Giráldez Estévez</p>
        <p>Manuel González Cao</p>
        <p>Franco Rafael Idrogo López</p>
        <p>Olesya Kanevska Suroven</p>
        <p>Damián Martínez Prado</p>
        <p>Tania Neiro Vieites</p>
        <p>Diego Otero Lodeiro</p>
        <p>Néstor Fabián Ruíz Couselo</p>
        <p>Ivonne Sánchez Sánchez</p>
        <p>Aldara Suárez Miguéns</p>

        </div>
        <router-link class="btn-back" to="/">Volver</router-link>
        </div>
    </div>


</template>
<script setup>

</script>
<style scoped>
.secreto-background{
    width: 100%;
    height:calc(100vh - 80px);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 40px;
    right: 0;
    background-color: rgb(250, 208, 21)
}
    .secreto-container{
        width:95%;
        max-width:600px;
        max-height: calc( 100vh - 100px);
        padding:  1rem .5rem;
        display: grid;
        gap: .5rem;
        background-color: white;
        border-radius:5px;
        box-shadow: 0px 0px 10px rgb(126, 103, 0);
        overflow-x: scroll;
    }
    .secreto-container h3{
        text-align: center;
        font-size: 1.2rem;
        color: black;
        font-weight:600;
        text-transform: uppercase;
    }
    .secreto-container img{
        width: 100%;
        max-width:600px
    }
    .secreto-container p{
        font-size: 1rem;
        font-weight: 500;
        text-align: center;
    }

    .btn-back{
        text-decoration: none;
        font-weight:600;
        margin: 1rem auto;
        border-radius: 5px;
        padding: .5rem;
        background-color: rgb(250, 208, 21);
        color: black;
        box-shadow: 0px 0px 6px rgb(126, 103, 0)
    }

</style>