// importar libreria de pinia. sirve para centralizar toda la información
import { defineStore } from "pinia";

import { useStoreArbores } from "./arbores";

export const useStoreGeneral = defineStore('busqueda', {
    state: () => {
        return {
            buscador: '',
            tmp:[],
            categoria: '',
        }
    },
    actions:{
        filtrar(){
            const storeArbores = useStoreArbores();
            //console.log(storeArbores.arbores);
            this.tmp = storeArbores.arbores.filter((arbor) => {
                return arbor.genero.toLowerCase().includes(this.buscador.toLowerCase()) || arbor.especie.toLowerCase().includes(this.buscador.toLowerCase()) || arbor.nombre_comun.toLowerCase().includes(this.buscador.toLowerCase()) || arbor.nombre_arbol.toLowerCase().includes(this.buscador.toLowerCase())
            })
        }
    }
})