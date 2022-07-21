// importar libreria de pinia. sirve para centralizar toda la información
import { defineStore } from 'pinia';
import { subirFicheros, listAllUrls, deleteFile, listAllRef } from '@/hook/storage.hook';
import {addDocument,getDocumentsOrderBy, deleteDocument} from '@/hook/firestore.hook';


export const useStoreEspecies = defineStore('especies', {
    state: () => {
        return {
            especies: [],
            imagenes: [],
        }

    },
    actions: { 

        async subirFoto({ ref, file }) {
            //console.log(`${ref}/${file.name}`)
            await subirFicheros(file, `${ref}/${file.name}`)
        },

        async borrarFoto(ref) {
            await deleteFile(ref);
        },


        //funcion para cargar los datos de firestore 
        async setEspecies() {
            if (this.especies.length > 0) //Por si el array ya está cargado
                return;
            this.especies = await getDocumentsOrderBy('Especies','genero');
           
        },
        async loadEspecie(form){
            const docRef = await addDocument("Especies", form);
            const data = { idDoc: docRef.id, ...form };
            this.especies.push(data)
            return docRef;

                },

        async borrarEspecie(ID){
            //Borrar fotos del storage
            const refs = await listAllRef(`especies/${ID}`);
            refs.forEach(async(ref)=>{
                await deleteFile(ref);
            });

            await deleteDocument("Especies", ID);
            const indice = this.especies.findIndex(especie => (especie.idDoc === ID));
            this.especies.splice(indice,1);
        },

        async listarImagenes(uid) {
            this.imagenes = await listAllUrls(uid)
        },
        


    }
})

