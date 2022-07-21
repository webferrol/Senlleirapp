<template>
    <div class="component-btn-darkmode">
        <p>Modo <br>claro</p>
        <div class="switch-button">
            <input ref="toggleDark" type="checkbox" @click="toggleDarkMode()" name="switch-button" id="switch-label"
                class="switch-button__checkbox">
            <label for="switch-label" class="switch-button__label"></label>
        </div>
        <p>Modo <br>oscuro</p>
    </div>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import '@/assets/css/componente/toggle-dark-mode.css';
import { switchDarkMode} from '../../hook/darkMode.js' 

const toggleDark = ref()
onMounted(() => {
    // Coloca el boton en la posicion indicada dependiendo si el modo oscuro está activado o no
    if(localStorage.getItem('dark-mode') == 'true'){
        toggleDark.value.checked = true
    } else{
        toggleDark.value.checked = false
    }

})

const toggleDarkMode = () => {
    if(toggleDark.value.checked){
        localStorage.setItem('dark-mode', true)
        switchDarkMode()
    }else{
        localStorage.setItem('dark-mode', false)
        switchDarkMode()
    }
}





</script>