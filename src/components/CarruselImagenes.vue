<template>
  <div class="carrusel">
    <!-- galeria -->
    <ul class="carrusel-images-galery">
      <li v-for="(item, index) in images" :key="index" :class="item.clases"  v-show="index === posicion">
        <img class="carrusel__image" :src="item" alt="imagen arbol senlleira" />
      </li>
    </ul>

    <!-- botones -->
    <a @click.prevent="turnLeft" href="#" class="carrusel__button carrusel__button--prev">
      <icono :icon="['fa-solid', 'angle-left']"></icono>
    </a>
    <a @click.prevent="turnRight" href="#" class="carrusel__button carrusel__button--next">
      <icono :icon="['fa-solid', 'angle-right']"></icono>
    </a>

    <!-- indicador de posicion -->
    <ul class="position">
      <li class="position__item" @click="moverCarrusel(index)" v-for="(i, index) in images" :key="index">
        <i class="fa-regular fa-circle"></i>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const posicion = ref(0)

const props = defineProps({

  images: {
    type: Array,
    default : []
  },
});

// Posiciona carrusel con click de posicion
const moverCarrusel = (index) => {
  posicion.value = index;
  return posicion
}

// Suma posicion
const turnRight = () => {
  if(posicion.value  >= props.images.length -1){
    posicion.value = 0;
  }else{
  posicion.value++
  }
}
// Resta posicion
const turnLeft = () => {
  if(posicion.value  <= 0){
    posicion.value = props.images.length -1;
  }else{
  posicion.value--
  }
}

// Cambia la imagen del carrusel cada x tiempo
const slideAutomatico = () => {
  setInterval(() => {
    if(posicion.value >= props.images.length -1){
      posicion.value = 0;
    } else{
  posicion.value++
    }
  }, 16000);
}

slideAutomatico()
</script>


<style scoped>
@import url(../assets/css/carrusel.css);
</style>