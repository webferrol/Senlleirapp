<template>
    <div>
        {{$route.params.idDoc}}
        
        
        <div class="erro" v-if="error.errorBool">
            ({{error.code}}) {{error.message}}
        </div>
        <div v-else>
            <pre>{{parque}}</pre>
            <FichaParquePublica 
                :mostrarFicha="true"
                :fichaDatos="parque" 
                :imagenesFichaTecnica="imagenesFichaTecnica">
            </FichaParquePublica>
        </div>
         
    </div>
</template>

<script setup>    
    import { useRoute } from 'vue-router';
    import { ref } from 'vue';
    import { listAllUrls } from '../../hook/storage.hook';
    import { getDocument } from '../../hook/firestore.hook';
    import FichaParquePublica from "@/components/parques/FichaParquePublica.vue";
    const route = useRoute();
    const parque = ref({});
    const error = ref({
        errorBool : false,
        code: 0,
        message: '',
    });

    const imagenesFichaTecnica = ref([]);

    // Función que sirve para limpiar el array de imagenes
    const imagenesFichaTecnicaVaciar = () => {
        while(imagenesFichaTecnica.value.length > 0)
        imagenesFichaTecnica.value.pop()
    }

    /**
     * CARGAMOS LA IMFORMACIÓN DEL PARQUE
     */
    (async()=>{
        try {
            parque.value = await getDocument('Parques',route.params.idDoc);
            if(!parque.value)
                throw new Error(`El parque con código ${route.params.idDoc} no existe. Fichero FichaParqueView.vue`)
            //Carga de imágenes
            // Limpiamos y cargamos las imagenes de la ficha
            imagenesFichaTecnicaVaciar()
            imagenesFichaTecnica.value =  await listAllUrls('parques/' + route.params.idDoc);
        } catch (err) {
            error.value.errorBool = true;
            error.value.code = err.code;
            error.value.message = err.message;
        }
    })()
</script>