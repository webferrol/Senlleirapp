<template>
<div class="column is-full">
            <ThePagination @handleNext="onNextClick" @handlePrevious="onPreviousClick"
                @handlePaginationLink="onPaginationLink" :perPage="store.limit" :actualPage="store.actualPage"
                :total="store.total"></ThePagination>

        </div> 
</template>

<script>
import { useStoreArbores } from "../stores/arbores";
import { ref, reactive } from "vue";

//Variables
const loader = reactive({ 'is-active': false });
const iskeyDown = ref(false);
const reference = ref('');
const referenceError = ref('');
const errorOutput = reactive({
    error: false,
    message: ''
});
const show = ref(false);
const experience = ref(null);
//lanzamos el store
const store = useStoreArbores();
//Lanzamos la promesa
(async () => {
    try {
        loader['is-active'] = true;
        await store.setArbores();
        // await store.setExperiences();
    } catch (error) {
        console.log('Error en fichero WorkExperience.ve', error);
        errorOutput.error = true;
        errorOutput.message = error.message;

    } finally {
        loader['is-active'] = false;
    }
})()

//Paginación
const onNextClick = async () => {
    try {
        loader['is-active'] = true;
        // await store.setNextExperiences();
    } catch (error) {
        errorOutput.error = true;
        errorOutput.message = error.message;
    } finally {
        loader['is-active'] = false;
    }

}
const onPreviousClick = async () => {
    try {
        loader['is-active'] = true;
        // await store.setPreviousExperiences();
    } catch (error) {
        errorOutput.error = true;
        errorOutput.message = error.message;
    } finally {
        loader['is-active'] = false;
    }
}
const onPaginationLink = async page => {
    try {
        loader['is-active'] = true;
        await store.setPaginationExperiences(page);
    } catch (error) {
        errorOutput.error = true;
        errorOutput.message = error.message;
    } finally {
        loader['is-active'] = false;
    }
}
</script>