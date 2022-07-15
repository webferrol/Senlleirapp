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

        async subirFoto({ ref, file }) {
            //console.log(`${ref}/${file.name}`)
            await subirFicheros(file, `${ref}/${file.name}`)
        },

        //funcion para cargar los datos de firestore 
        async setEspecies() {
            if (this.especies.length > 0) //Por si el array ya está cargado
                return;
            this.especies = await getDocuments('Especies');
        },
        async loadEspecie(form){
            const data = await addDocument("Especies", form);
            const docRef = {idDoc: docRef.id, ...form};
            this.especies.push(docRef)
            if (data.id && fileName.length) {
                const storage_ref = `Especies/${data.id}/${fileName}`;
                await updateDocument(data.id, "Especies", {'storage_ref': storage_ref });//creado la referencia
            } 
            return data;
            //this.especies.push(form);
            // this.especies = [];

        
        },

        async google_url_save(id,storage_ref){
            //console.log(storage_ref)
            const url = await getDownURL(storage_ref);
            //console.log(url)
            await updateDocument(id, "Especies", {'google_url': url });//creado la referencia
        },
        async borrarEspecie(ID){
            await deleteDocument("Especies", ID);
            const indice = this.especies.findIndex(especie => (especie.idDoc === ID));
            this.especies.splice(indice,1);
        }
    }
})

