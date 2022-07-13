<template>
    <section class="catalogo-especies-section">
        <h2 class="title">Árbores senlleiras</h2>
        <div class="catalogo-arboles-app">

            <div class="arboles-card animation-flip-vertical" :class="flipVertical">
                <div class="arboles-inner">
                    <router-link :to="images[0].urlFicha" class="arboles-front">
                        <img :src="images[0].url" :alt="images[0].alt">
                    </router-link>
                    <router-link :to="images[1].urlFicha" class="arboles-back">
                        <img :src="images[1].url" :alt="images[1].alt">
                    </router-link>
                </div>
            </div>

            <div class="arboles-card animation-horizontal" :class="animationHorizontal">
                <div class="arboles-inner">
                    <router-link :to="images[2].urlFicha" class="arboles-front">
                        <img :src="images[2].url" :alt="images[2].alt">
                    </router-link>
                    <router-link :to="images[3].urlFicha" class="arboles-back">
                        <img :src="images[3].url" :alt="images[3].alt">
                    </router-link>
                </div>
            </div>

            <div class="arboles-card animation-horizontal" :class="animationHorizontal">
                <div class="arboles-inner">
                    <router-link :to="images[4].urlFicha" class="arboles-front">
                        <img :src="images[4].url" :alt="images[4].alt">
                    </router-link>
                    <router-link :to="images[5].urlFicha" class="arboles-back">
                        <img :src="images[5].url" :alt="images[5].alt">
                    </router-link>
                </div>
            </div>

            <div class="arboles-card animation-vertical" :class="animationVertical">
                <div class="arboles-inner">
                    <router-link :to="images[6].urlFicha" class="arboles-front">
                        <img :src="images[6].url" :alt="images[6].alt">
                    </router-link>
                    <router-link :to="images[7].urlFicha" class="arboles-back">
                        <img :src="images[7].url" :alt="images[7].alt">
                    </router-link>
                </div>
            </div>

            <div class="arboles-card animation-flip" :class="flipHorizontal">
                <div class="arboles-inner">
                    <router-link :to="images[8].urlFicha" class="arboles-front">
                        <img :src="images[8].url" :alt="images[8].alt">
                    </router-link>
                    <router-link :to="images[9].urlFicha" class="arboles-back">
                        <img :src="images[9].url" :alt="images[9].alt">
                    </router-link>
                </div>
            </div>

            <div class="arboles-card animation-flip-vertical" :class="flipVertical">
                <div class="arboles-inner">
                    <router-link :to="images[10].urlFicha" class="arboles-front">
                        <img :src="images[10].url" :alt="images[10].alt">
                    </router-link>
                    <router-link :to="images[11].urlFicha" class="arboles-back">
                        <img :src="images[11].url" :alt="images[11].alt">
                    </router-link>
                </div>
            </div>

            <div class="arboles-card animation-vertical" :class="animationVertical">
                <div class="arboles-inner">
                    <router-link :to="images[12].urlFicha" class="arboles-front">
                        <img :src="images[12].url" :alt="images[12].alt">
                    </router-link>
                    <router-link :to="images[13].urlFicha" class="arboles-back">
                        <img :src="images[13].url" :alt="images[13].alt">
                    </router-link>
                </div>
            </div>

            <div class="arboles-card animation-flip-vertical" :class="flipVertical">
                <div class="arboles-inner">
                    <router-link :to="images[14].urlFicha" class="arboles-front">
                        <img :src="images[14].url" :alt="images[14].alt">
                    </router-link>
                    <router-link :to="images[15].urlFicha" class="arboles-back">
                        <img :src="images[15].url" :alt="images[15].alt">
                    </router-link>
                </div>
            </div>

            <div class="arboles-card animation-flip" :class="flipHorizontal">
                <div class="arboles-inner">
                    <router-link :to="images[16].urlFicha" class="arboles-front">
                        <img :src="images[16].url" :alt="images[16].alt">
                    </router-link>
                    <router-link :to="images[17].urlFicha" class="arboles-back">
                        <img :src="images[17].url" :alt="images[17].alt">
                    </router-link>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import("@/assets/css/componente/galeria.css")



const animationHorizontal = reactive({
    horizontalMovement: true,
});
const animationVertical = reactive({
    verticalMovement: true,
})
const flipVertical = reactive({
    verticalFlip: true,
})
const flipHorizontal = reactive({
    horizontalFlip: true,
})
onMounted(() => {
    setInterval(() => {
        animationHorizontal.horizontalMovement = !animationHorizontal.horizontalMovement;
    }, 7000)
    setInterval(() => { animationVertical.verticalMovement = !animationVertical.verticalMovement; }, 9000)
    setInterval(() => { flipVertical.verticalFlip = !flipVertical.verticalFlip; }, 12000)
    setInterval(() => { flipHorizontal.horizontalFlip = !flipHorizontal.horizontalFlip; }, 5000)
});
defineProps({
    images: {
        type: Array,
        default: [
            {
                url: 'src/assets/gallery/senlleiras_1.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',
            },
            {
                url: 'src/assets/gallery/senlleiras_2.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',

            },
            {
                url: 'src/assets/gallery/senlleiras_3.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',
            },
            {
                url: 'src/assets/gallery/senlleiras_4.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',

            },
            {
                url: 'src/assets/gallery/senlleiras_5.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',
            },
            {
                url: 'src/assets/gallery/senlleiras_6.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',

            },
            {
                url: 'src/assets/gallery/senlleiras_7.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',
            },
            {
                url: 'src/assets/gallery/senlleiras_8.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',

            },
            {
                url: 'src/assets/gallery/senlleiras_9.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',
            },
            {
                url: 'src/assets/gallery/senlleiras_10.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',

            },
            {
                url: 'src/assets/gallery/senlleiras_11.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',
            },
            {
                url: 'src/assets/gallery/senlleiras_12.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',

            },
            {
                url: 'src/assets/gallery/senlleiras_13.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',
            },
            {
                url: 'src/assets/gallery/senlleiras_14.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',

            },
            {
                url: 'src/assets/gallery/senlleiras_15.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',
            },
            {
                url: 'src/assets/gallery/senlleiras_16.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',

            },
            {
                url: 'src/assets/gallery/senlleiras_17.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',
            },
            {
                url: 'src/assets/gallery/senlleiras_18.jpg',
                urlFicha: '/catalogo',
                title: '',
                alt: '',

            },



        ]
    }
});

</script>
