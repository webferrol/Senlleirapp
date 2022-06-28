// importar libreria de pinia. sirve para centralizar toda la información
import { defineStore } from 'pinia';
import {cargarDatosFormulario,getDatos, deleteDatos} from '@/hook/firestore.hook';


export const useStoreEspecies = defineStore('especies', {
    state: () => {
        return {
            especies: [],
        }

    },
    actions: { 
        //funcion para cargar los datos de firestore 
        async setEspecies() {
            if (this.especies.length > 0) //Por si el array ya está cargado
                return;
            this.especies = await getDatos('Especies');
        },
        async loadEspecie(form){
            await cargarDatosFormulario("Especies", form);
            //this.especies.push(form);
            this.especies = [];
        },
        async borrarEspecie(ID){
            await deleteDatos("Especies", ID);
        }
    }
})

