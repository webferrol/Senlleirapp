// importar libreria de pinia. sirve para centralizar toda la información
import { defineStore } from 'pinia';
import {addDocument,getDocuments, deleteDocument} from '@/hook/firestore.hook';


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
            this.especies = await getDocuments('Especies');
        },
        async loadEspecie(form){
            await addDocument("Especies", form);
            //this.especies.push(form);
            this.especies = [];
        },
        async borrarEspecie(ID){
            await deleteDocument("Especies", ID);
        }
    }
})

