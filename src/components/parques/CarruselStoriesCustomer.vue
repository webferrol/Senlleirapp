<template>
    <section class="componente-stories">
      <div class="stories-navigator">
        <article class="component-arbol"  v-for="(item, index) in images" :key="index">
          <img :src="item" alt="">
        </article>
      </div>
    </section>    
</template>

<script setup>
import "@/assets/css/carruselStories.css"

defineProps({
    images: {
        type: Array,
    }
})


</script>
