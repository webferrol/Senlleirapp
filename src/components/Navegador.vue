<template>
  <!-- Header -->
  <header class="main-header">
    <nav class="header-nav-app" :class="{ 'administrador-active': userStore.user }">
      <!-- Boton inicio - LOGO app -->
      <router-link to="/" v-if="!$route.path.includes('catalogo')" class="header-logo"><img
          src="../assets/img/logos/LOGO2_forma.png" alt="logo senlleirap" /></router-link>
      <!-- Botones area administrativa -->
      <ul class="nav-admin" v-if="userStore.user">
        <li>
          <router-link to="/admin-senlleira">cat-arbores</router-link>
        </li>
        <li>
          <router-link to="/admin-especies">cat-especies</router-link>
        </li>
        <li>
          <router-link to="/admin-parque">cat-parques</router-link>
        </li>
        <li>
          <router-link to="/adpower10">admin</router-link>
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
        <li class="buscador" v-if="$route.path.includes('catalogo')">
          <input type="text"  name="buscar" id="buscar" placeholder="Buscar" @keyup.enter="filtrar()"
            v-model.trim="storeGeneral.buscador" @focus="animacionBuscar = true" @focusout="animacionBuscar = false">
          <label for="buscar" :class="{ animacion: animacionBuscar }">
            <icono :icon="['fa', 'magnifying-glass']" @click="filtrar()"></icono>
          </label>
        </li>
        <!-- Filtro búsqueda usuario - CATALOGO -->
        <li class="filtro" v-if="$route.path.includes('catalogo')">
          <div class="icon-filter-busqueda">
            <button class="btn-catalogo-filtro">
              <icono :icon="['fa', 'sliders']" @click="filtrarDatos"></icono>
            </button>
            <ul class="elementos-filtro" :class="{ filtroOculto: !mostrarFiltro }">
              <li>
                <router-link to="/catalogo-senlleiras">
                  <icono :icon="['fa', 'tree']"></icono>
                  <p>Árbores</p>
                </router-link>
              </li>
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
                <router-link to="/catalogo-propostas">
                  <icono :icon="['fa', 'user']"></icono>
                  <p>Cidadanía</p>
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
import router from '../router';
const animacionBuscar = ref(false)

// Funcion para mostrar - ocultar filtro de busqueda
const mostrarFiltro = ref(false)
const filtrarDatos = () => {
  mostrarFiltro.value = !mostrarFiltro.value
}

const storeGeneral = useStoreGeneral();
const userStore = useStoreUsers();
const filtrar = () => {
  if (router.currentRoute.value.fullPath === '/catalogo-propostas') {
    storeGeneral.filtraArboresParticipacionCidada();
    
  } else if(router.currentRoute.value.fullPath === '/catalogo-senlleiras'){
    storeGeneral.filtraArboresSenlleirasPropostas();
    if(storeGeneral.buscador === 'sansus2022'){
      router.push('/supersecretodeldesarrollador')
    }
  }
  else if (router.currentRoute.value.fullPath === '/catalogo-de-especies') {
    storeGeneral.filtrarEspecies();
  } else {
    storeGeneral.filtrarParques();
  }
};

window.addEventListener(
  "click",
  (e) => {
    if (document.querySelector(".icon-filter-busqueda") && !document.querySelector(".icon-filter-busqueda").contains(e.target)) {
      mostrarFiltro.value = false
    }
  }
);

</script>

