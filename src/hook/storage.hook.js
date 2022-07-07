import { storage } from "@/hook/firebase";
import { ref,uploadBytes, listAll, getDownloadURL ,deleteObject} from "firebase/storage";


// para poder subir fotos al storage
export const subirFicheros = async (file,ruta='carpeta/imagen.ext') => {
    const storageRef = ref(storage,ruta);
    // 'file' comes from the Blob or File API
    const snapshot = await uploadBytes(storageRef, file);  
}

/**para borrar fotos del storage
 * 
 * @param {string} ruta codigo de la foto
 */
export const deleteFile = async (ruta='carpeta/imagen.ext') =>{
// Create a reference to the file to delete
   const desertRef = ref(storage, ruta);
  // Delete the file  
   return await deleteObject(desertRef,);  
  
}

/**para listar las imagenes del storage
 * 
 * @param {string} uid Referencia donde estan guardadas las fotos
 * @returns devuelve la url de las imagenes que se encuentran en el storage
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

    /**para buscar las imagenes y luego eliminarlas
 * 
 * @param {string} uid Referencia donde estan guardadas las fotos
 * @returns devuelve las imagenes del storage
 */
export const listAllRef = async (uid) => {
    // create  a reference under which you want to list
        const listRef = ref(storage, uid);
    // Find all the prefixes and items.
        const res = await listAll(listRef);
        const {items} = res;
        return items.map((item)=>item._location.path_);
    
    }

/**para listar las imagenes del storage(url)
 * 
 * @param {string} uid Referencia donde estan guardadas las fotos
 */
export const getDownURL = async (uid) => await getDownloadURL(ref(storage, uid))
        
