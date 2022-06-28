<template>
  <NavegadorVue></NavegadorVue>
  <FooterVue></FooterVue>
  <router-view />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavegadorVue from "@/components/Navegador.vue";
import FooterVue from "./components/Footer.vue";
import { useStoreUsers } from "./stores/users";

// style
import "@/assets/css/reset.css";
import "@/assets/css/app.css";

const store = useStoreUsers();
store.userActual();
</script>
