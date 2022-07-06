<template>
  <!-- Header -->
  <header class="main-header">
    <nav class="header-nav-app" :class="{'rojo':userStore.user}">
      <router-link to="/" class="header-logo"
        ><img src="../assets/img/logotipo-app.png" alt="logo senlleirap"
      /></router-link>
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
      <li class="header-upload" v-if="$route.name == 'inicio'">
<<<<<<< HEAD
          <router-link to="/nuevo-arbol">
=======
          <router-link to="/nova-arbore">
>>>>>>> 730d1c3ea65b4e30550fa7defd2f1b831043ac72
            <icono :icon="['fa', 'upload']"></icono>
          </router-link>
        </li>
        <li class="buscador"  v-if="$route.name == 'catalogo'">
        <icono :icon="['fa', 'magnifying-glass']"></icono>
            <input type="text" name="buscar" id="buscar" placeholder="Buscar" @keyup="filtrar">
        </li>
        
      </ul>
    </nav>
  </header>

  <!-- Footer -->
</template>

<script setup>
//Dependencias


import "@/assets/css/navegador.css";

import { useStoreUsers } from "../stores/users";

const userStore = useStoreUsers();
</script>

<style>
.header-nav-app.rojo{
  display: grid;
  grid-template-columns: auto 1fr auto;
  background-color: red;
}

</style>
