<template>
    <div class="container-galeria">
        <div class="skeleton-especie" v-for="especie in 32">
            <div class="skeleton-h2"></div>
            <div class="skeleton-p"></div>
            <div class="skeleton-p"></div>
        </div>
    </div>
</template>
<script setup>
    import("@/assets/css/skeleton/skeleton-catalogo-especies.css");
    import("@/assets/css/skeleton/skeleton-elements.css");
</script>