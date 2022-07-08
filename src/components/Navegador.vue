<template>
  <!-- Header -->
  <header class="main-header">
    <nav class="header-nav-app" :class="{ 'administrador-active': userStore.user }">
      <!-- Boton inicio - LOGO app -->
      <router-link to="/" v-if="$route.name !== 'catalogo'" class="header-logo"><img
          src="../assets/img/logos/LOGO2_forma.png" alt="logo senlleirap" /></router-link>
      <!-- Botones area administrativa -->
      <ul class="nav-admin" v-if="userStore.user">
        <li>
          <router-link to="/catalogo-senlleira">cat-senlleira</router-link>
        </li>
        <li>
          <router-link to="/catalogo-especies">cat-especies</router-link>
        </li>
        <li>
          <router-link to="/catalogo-parque">cat-parques</router-link>
        </li>
        <li>
          <router-link to="/admin">admin</router-link>
        </li>
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
          <input type="text" name="buscar" id="buscar" placeholder="Buscar" @keyup.enter="filtrar()" v-model.trim="storeGeneral.buscador"
            @focus="animacionBuscar = true" @focusout="animacionBuscar = false">
          <label for="buscar" :class="{ animacion: animacionBuscar }">
            <icono :icon="['fa', 'magnifying-glass']" @click="filtrar()"></icono>
          </label>
        </li>
        <!-- Filtro búsqueda usuario - CATALOGO -->
        <li class="filtro" v-if="$route.name == 'catalogo'">
          <div class="icon-filter-busqueda">
            <icono :icon="['fa', 'sliders']" @click="filtrarDatos"></icono>
            <ul class="elementos-filtro" :class="{ filtroOculto: !mostrarFiltro }">
              <li>
                <router-link to="/catalogo-de-parques">
                <icono :icon="['fa', 'tree-city']"></icono>
                <p>Parques</p>
                </router-link>
              </li>
              <li>
                <router-link to="/catalogo-de-especies">
              <icono :icon="['fa', 'leaf']"></icono>
                <p>Especies</p>
                </router-link>
              </li>
              <li>
                <router-link to="/catalogo">
              <icono :icon="['fa', 'tree']"></icono>
                <p>Árbores</p>
                </router-link>
              </li>
            </ul>
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
import { useStoreGeneral } from "../stores/general";
const animacionBuscar = ref(false)

// Funcion para mostrar - ocultar filtro de busqueda
const mostrarFiltro = ref(false)
const filtrarDatos = () => {
  mostrarFiltro.value = !mostrarFiltro.value
}

const storeGeneral = useStoreGeneral();
const userStore = useStoreUsers();
const filtrar = () => {
  storeGeneral.filtrarArbores();
};
</script>

<style>
.header-nav-app.rojo {
  display: grid;
  grid-template-columns: auto 1fr auto;
  background-color: red;
}
</style>
