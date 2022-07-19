<template>
    <div class="componente-video">
            <video class="video" autoplay muted loop>
                <source src="@/assets/video/santasusana.mp4" type="video/mp4">
            </video>
        </div>
</template>

<style scoped>

.componente-video{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: auto;
}
.video{
    margin: auto;
    width: 100%;
    max-width:1080px;
    height: 100%;
    
}
</style>