<template>
    <div>
        <button class="admin-add" @click="añadirEspecie = true">Añadir Especie</button>
        <FormAdminEspecies v-if="añadirEspecie" @cerrarFormulario="añadirEspecie = false"></FormAdminEspecies>
        <AdminCatalogoEspecies></AdminCatalogoEspecies>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import FormAdminEspecies from "@/components/admin/forms/FormAdminEspecies.vue";
import AdminCatalogoEspecies from "@/components/admin/tablas/AdminCatalogoEspecies.vue"

const añadirEspecie = ref(false)
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