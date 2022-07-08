<template>
  <!-- Header -->
  <header class="main-header">
    <nav class="header-nav-app" :class="{ 'rojo': userStore.user }">
      <!-- Boton inicio - LOGO app -->
      <router-link to="/" v-if="$route.name !== 'catalogo'" class="header-logo"><img
          src="../assets/img/logos/LOGO2_forma.png" alt="logo senlleirap" /></router-link>
      <!-- Botones area administrativa -->
      <ul class="ulbasura" v-if="userStore.user">
        <router-link to="/catalogo-senlleira">cat-senlleira</router-link>
        |
        <router-link to="/catalogo-especies">cat-especies</router-link>
        |
        <router-link to="/catalogo-parque">cat-parques</router-link>
        |
        <router-link to="/admin">admin</router-link>
      </ul>
      <ul class="header-nav-buttons">
        <!-- Botón usuario subir arbol - INICIO -->
        <li class="header-upload" v-if="$route.name == 'inicio'">
          <router-link to="/nova-arbore">
            <icono :icon="['fa', 'upload']"></icono>
          </router-link>
        </li>
        <!-- Boton de búsqueda - CATALOGO -->
        <li class="buscador" v-if="$route.name == 'catalogo'">
          <input type="text" name="buscar" id="buscar" placeholder="Buscar" @keyup="filtrar"
            @focus="animacionBuscar = true" @focusout="animacionBuscar = false">
          <label for="buscar" :class="{ animacion: animacionBuscar }">
            <icono :icon="['fa', 'magnifying-glass']"></icono>
          </label>
        </li>
        <!-- Filtro búsqueda usuario - CATALOGO -->
        <li class="filtro" v-if="$route.name == 'catalogo'">
        <div class="icon-filter-busqueda" >
          <icono  :icon="['fa', 'sliders']" @click="filtrarDatos"></icono>
          <div class="elementos-filtro" :class="{filtroOculto: !mostrarFiltro}">
            <p>Arbores</p>
            <p>Parques</p>
            <p>Senlleiras</p>
            <p>Especies</p>
          </div>
        </div>
       
        </li>

      </ul>
    </nav>
  </header>

  <!-- Footer -->
</template>

<script setup>
//Dependencias
import { ref } from 'vue'

import "@/assets/css/navegador.css";
import { useStoreUsers } from "../stores/users";
const animacionBuscar = ref(false)

// Funcion para mostrar - ocultar filtro de busqueda
const mostrarFiltro = ref(false)
const filtrarDatos = () => {
  mostrarFiltro.value = !mostrarFiltro.value
  console.log(mostrarFiltro.value)
}

const userStore = useStoreUsers();
</script>

<style>
.header-nav-app.rojo {
  display: grid;
  grid-template-columns: auto 1fr auto;
  background-color: red;
}
</style>
