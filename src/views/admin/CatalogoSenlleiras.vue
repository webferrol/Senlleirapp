<template>
<div>
    <button class="admin-add" @click="añadirSenlleira = true"> Añadir árbore</button>
    <AdminCatalogoSenlleirasVue></AdminCatalogoSenlleirasVue>
    <FormAdminSenlleiraVue v-if="añadirSenlleira" @cerrarForm="añadirSenlleira = false"></FormAdminSenlleiraVue>
</div>

</template>

<script setup>
import {ref} from 'vue';
import AdminCatalogoSenlleirasVue from '@/components/admin/tablas/AdminCatalogoSenlleiras.vue';
import FormAdminSenlleiraVue from '@/components/admin/forms/FormSenlleira.vue';

const añadirSenlleira = ref(false)

</script>
<style scoped>
.admin-add{
    background-color: var(--colorprincipal);
    color: white;
    font-size: 1.2rem;
    margin: 1rem;
    border-radius: 5px;
    transition: transform .3s linear;
    border: 2px solid black;
}
.admin-add:hover{
    transform: scale(1.1)
}
</style>
