<template>
    <div class="template-ajustes">
        <section>
            <h3 class="template-title">Axustes</h3>
            <ToggleDarkModeVue></ToggleDarkModeVue>
        </section>
        <section>
        <h3 class="template-title">Entidades promotoras do proxecto</h3>
            <EntidadesPromotorasVue></EntidadesPromotorasVue>
        </section>
        <p class="version">Versión: 1.0.0</p>
    </div>

</template>

<script setup>
import ToggleDarkModeVue from '../../components/componentesGenerales/ToggleDarkMode.vue';
import EntidadesPromotorasVue from '../../components/componentesGenerales/EntidadesPromotoras.vue';
import "../../assets/css/ajustes/ajustes.css"

</script>