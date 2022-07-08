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
          <router-link to="/nova-arbore">
            <icono :icon="['fa', 'upload']"></icono>
          </router-link>
        </li>
        <li class="buscador"  v-if="$route.name == 'catalogo'">
        <icono :icon="['fa', 'magnifying-glass']" @click="filtrar()"></icono>
            <input type="text" name="buscar" id="buscar" placeholder="Buscar" @keyup.enter="filtrar()" v-model.trim="storeGeneral.buscador">
            <select v-model="storeGeneral.categoria" name="especies" id="especies">
            <option value="especie">Especie</option>
            <option value="genero">Genero</option>
            <option value="nombre_arbol">Nombre arbol</option>
            <option value="nombre_comun">Nombre común</option>
            <option value="nombre_comun_gal">Nombre común Galego</option>
            <option value="ubicacion_parque">Ubicación<nav></nav></option>
        </select>
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
import { useStoreGeneral } from "../stores/general";

const storeGeneral = useStoreGeneral();
const userStore = useStoreUsers();
storeGeneral.categoria = 'nombre_arbol';
storeGeneral.buscador = '';

const filtrar = () => {
  // console.log(enviarLetra.text,categoria.value)
  // buscador(enviarLetra.text,categoria.value);
  storeGeneral.filtrar();
};
</script>

<style>
.header-nav-app.rojo{
  display: grid;
  grid-template-columns: auto 1fr auto;
  background-color: red;
}

</style>
