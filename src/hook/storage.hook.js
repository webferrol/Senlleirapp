import { storage } from "@/hook/firebase";
import { ref,uploadBytes, listAll, getDownloadURL } from "firebase/storage";


// para poder subir fotos al storage
export const subirFicheros = async (file,ruta='carpeta/imagen.ext') => {
    const storageRef = ref(storage,ruta);
    // 'file' comes from the Blob or File API
    const snapshot = await uploadBytes(storageRef, file);  
}


/**para listar las imagenes del storage
 * 
 * @param {string} uid carpeta del storage donde estan guardadas las fotos
 * @returns devuelve las imagenes que se encuentran en el storage
 */
export const listAllUrls = async (uid) => {
    // create  a reference under which you want to list
        const listRef = ref(storage, uid);
    // Find all the prefixes and items.
        const res = await listAll(listRef);
    // All the prefixes under listRef.
    // You may call listAll() recursively on them.
        const {items} = res;
        return await Promise.all(items.map((item)=> getDownloadURL(item)))
    
    }

/**para listar las imagenes del storage
 * 
 * @param {string} uid Referencia donde estan guardadas las fotos
 */
export const getDownURL = async (uid) => await getDownloadURL(ref(storage, uid))
        
