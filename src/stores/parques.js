// importar libreria de pinia. sirve para centralizar toda la información
import { defineStore } from 'pinia';
import { subirFicheros, listAllUrls, getDownURL, deleteFile, listAllRef } from '@/hook/storage.hook';
import { addDocument, getDocuments, deleteDocument } from '@/hook/firestore.hook';


export const useStoreParques = defineStore('parques', {

    state: () => {
        return {
            parques: [],
            imagenes: []
        }

    },
    actions: {
        
        //Esta funcion es para subir la imagen de los parques con ID y su extension.
        async subirParque({ ref, file, name }) {
            // const file1 = file.name;
            // const [ext, ...fileName] = file1.split('.').reverse();
            if (!name)
                await subirFicheros(file, `${ref}/${file.name}`)
            else
                await subirFicheros(file, `${ref}/${name}`)
            // console.log(ext)

        },
        //Borrar foto del storage
        async borrarFoto(ref) {
            await deleteFile(ref);
        },
        async insertarParque(datos) {
            const docRef = await addDocument("Parques", datos);
            const data = { idDoc: docRef.id, ...datos };
            this.parques.push(data)
            return docRef;
        },


        async borrarParque(ID) {
            //Borrar fotos del storage
            const refs = await listAllRef(`parques/${ID}`);
            refs.forEach(async(ref)=>{
                console.log(ref)
                await deleteFile(ref);
            });

            //Se borra la información de firestore
            await deleteDocument("Parques", ID);
            const indice = this.parques.findIndex(parque => (parque.idDoc === ID));
            this.parques.splice(indice, 1);

        },
        // -> Funcion donde introducimos los mapas de los parques y sus datos <- //
        async setParques() {
            if (this.parques.length > 0) //Por si el array ya está cargado
                return
            this.parques = await getDocuments("Parques");
            for (let i = 0; i < this.parques.length; i++) {
                {
                    try {
                        if (this.parques[i].urlficha)
                            this.parques[i].url_google = await getDownURL(this.parques[i].urlficha);
                    } catch (error) {
                        console.log(error)
                    }

                }
            }
        },
        async listarImagenes(uid) {
            this.imagenes = await listAllUrls(uid)
        },
    }
}

)