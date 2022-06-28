<template>
  <!-- Header -->
  <header class="main-header">
    <nav class="header-nav-app">
      <router-link to="/" class="header-logo"
        ><img src="../assets/img/logotipo-app.png" alt="logo senlleirap"
      /></router-link>
      <ul class="ulbasura" v-if="userStore.user">
        <router-link to="/especies">especies</router-link>
        |
        <router-link to="/catalogo-senlleira">cat-senlleira</router-link>
        |
        <router-link to="/catalogo-especies">cat-especies</router-link>
        |
        <router-link to="/admin">admin</router-link>
      </ul>
      <ul class="header-nav-buttons">
        <li class="header-upload">
          <router-link to="/formulario">
            <icono :icon="['fa', 'upload']"></icono>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>

  <!-- Footer -->
</template>

<script setup>
//Dependencias
import { ref } from "vue";
import "@/assets/css/navegador.css";

import { useStoreUsers } from "../stores/users";

const userStore = useStoreUsers();
</script>

<style>

</style>
