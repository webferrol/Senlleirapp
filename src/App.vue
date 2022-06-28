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


// (async() =>{
//   await store.onAuthState();
//   app.mount('#app');
// })()

</script>
