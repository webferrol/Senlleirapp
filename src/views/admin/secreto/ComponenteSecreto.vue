<template>
    <div class="secreto-background">
        <div class="secreto-container">
        <h3>Grupo sansus 2021 - 2022</h3>
        <img src="./NADIR.JPG" alt="supersecreto">

        <p>Somos os alumnos traballadores do Obradoiro Santitago Sustentable 2021 - 2022 (sansus)</p>
        <p>!Acabas de atopar unha ficha supersecreta!</p>
        <router-link class="btn-back" to="/">Volver</router-link>
        </div>
    </div>


</template>
<script setup>

</script>
<style scoped>
.secreto-background{
    width: 100%;
    height:calc(100vh - 40px);
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
        padding:  1rem .5rem;
        display: grid;
        gap: .5rem;
        background-color: white;
        border-radius:5px;
        box-shadow: 0px 0px 10px rgb(126, 103, 0);
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
        margin: 2rem auto auto auto;
        border-radius: 5px;
        padding: .5rem;
        background-color: rgb(250, 208, 21);
        color: black;
        box-shadow: 0px 0px 6px rgb(126, 103, 0)
    }

</style>