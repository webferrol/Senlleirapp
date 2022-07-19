<template>
    <div class="component-btn-darkmode">
        <p>Modo <br>claro</p>
        <div class="switch-button">
            <input ref="checkbox" type="checkbox" @click="toggleDarkMode" name="switch-button" id="switch-label"
                class="switch-button__checkbox">
            <label for="switch-label" class="switch-button__label"></label>
        </div>
        <p>Modo <br>oscuro</p>
    </div>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import '@/assets/css/componente/toggle-dark-mode.css';

const body = document.querySelector("body");
// Comprueba si está activado el modo oscuro y posiciona el botón en ON/OFF
onMounted(() => {
    const toggleDark = document.querySelector("#switch-label")
    if (body.classList.contains('dark-mode')) {
        toggleDark.checked = true
    } else {
        toggleDark.checked = false
    }
})
// Cuando el usuario hace click activa desativa el modo oscuro
const toggleDarkMode = () => {
    const toggleDark = document.querySelector("#switch-label")

    if (toggleDark.checked) {
        body.classList.add('dark-mode')
    }
    else {
        body.classList.remove('dark-mode');
    }
}

</script>