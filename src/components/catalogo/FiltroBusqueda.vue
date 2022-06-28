<template>
  <div class="menu-busqueda-container">
    <div class="menu-busqueda">
        <span class="buscador">
            <icono :icon="['fa', 'magnifying-glass']"></icono>
            <input type="text" name="buscar" id="buscar" placeholder="Buscar" @keyup="filtrar" v-model.trim="search.text">
        </span>
    </div>
  </div>


</template>

<script setup>
import { reactive } from 'vue';



const search = reactive({
  text: ""
})

const filtrar = () => {

}

</script>

<style scoped>
.menu-busqueda-container{
    width: 100%;
    height: 40px;
}
.menu-busqueda{
    position: fixed;
    display: flex;
    gap: .5rem;
    padding: 0 .5rem;
    align-items: center;
    height: 40px;
    width: 100%;
    background-color: gray;
    z-index: 1;
}
.buscador{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    width: 75%;
    min-width: 300px;
}
.menu-busqueda svg{
    font-size: 1.2rem;
    color: white;
}
  #buscar{
    width: 100%;
    border: none;
    font-size: 1rem;
    padding: .25rem;
    border-radius: 3px;
    height: fit-content;
  }  

</style>