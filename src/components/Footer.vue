<template>
   <footer class="main-footer">
        <nav class="menu-principal" :class="{'red':userStore.user}">
            <ul class="menu-elements">
                <li>
                    <router-link class="menu-catalogo" to="/catalogo">
                        <icono :icon="['fa', 'images']"></icono>
                        <p>Catálogo</p>
                    </router-link>
                </li>
                <li>
                    <router-link class="menu-inicio" to="/">
                        <icono :icon="['fa', 'home']"></icono>
                        <p>Inicio</p>
              </router-link>
                </li>
                <li>
              <router-link class="mapa" to="/mapaSenlleiras">
                        <icono :icon="['fa', 'map']"></icono>
                        <p>Mapa</p>
                    </router-link>
                </li>
            </ul>
        </nav>
    </footer>
</template>

<script setup>
import '../assets/css/footer.css'
import { useStoreUsers } from '../stores/users'

const userStore = useStoreUsers();
</script>

<style>
.menu-principal.red{
  background-color: red;
}</style>
