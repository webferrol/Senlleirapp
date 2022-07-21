<template>
  <NavegadorVue></NavegadorVue>
  <FooterVue></FooterVue>
  <router-view />
</template>

<script setup>
// -> Importaciones <- //
import { RouterView } from "vue-router";
import NavegadorVue from "@/components/Navegador.vue";
import FooterVue from "./components/Footer.vue";
import "@/assets/css/reset.css";
import "@/assets/css/app.css";
import { comprobarDarkMode, switchDarkMode} from "./hook/darkMode";


// Modo oscuro en toda la aplicación
comprobarDarkMode()
switchDarkMode()
</script>
