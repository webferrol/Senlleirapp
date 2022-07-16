import { db } from "./firebase";
import { collection, addDoc, getDocs, getDoc, deleteDoc, doc, updateDoc, query, where,orderBy } from "firebase/firestore";

/**
 *
 * @param {*} uid ruta en firestore donde quiero que se manden los datos.
 * @param {Object} data objeto en el que estan almacenados los datos del formulario: Ejemplo: {nombre: "",descripcion_breve: "",descripcion: "",fecha: Timestamp}
 * @return {Object} El Objeto insertado con varias propiedades interesantes entre ello el id
 */
export const addDocument = async (uid, data) => await addDoc(collection(db, uid), data); 

/**
 *
 * @param {string} uid ruta firestore de donde quiero bajar los datos
 * @returns {array} de objetos donde estan almacenados los datos
 */
export const getDocuments = async (uid) => {
  const querySnapshot = await getDocs(collection(db, uid));
  const tmp = [];
  querySnapshot.forEach((doc) => {
    tmp.push({
      idDoc: doc.id,
      ...doc.data(), //DESTRUCTURING
    });
  });
  return tmp;
};

/**
     * @param {String} collectionName Nombre de la colección
     * @param {String} reference Referencia del documento a recuperar
     * @returns {Object} Objeto con las columnas del documento o null si no lo encuentra
     */
export const getDocument = async (collectionName,reference) => {
  const docRef = doc(db, collectionName, reference);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          return {
              idDoc: docSnap.id,
              ...docSnap.data(),
          }
      } else
        return null;
}

/**
 * @param {String} $collectionName Nombre de la colección
 * @param {String} $field Busqueda del campo que se desea buscar
 * @param {any} $value Valor buscado en la consulta
 * @returns {Array} Array de objetos con los documentos encontrados o array vacío si no encuentra nada
 */
 export const getDocumentsWhere = async ($collectionName,$field,$value) => {
  
  const tmp = [];
  const q = query(collection(db, $collectionName), where($field, "==", $value));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    tmp.push({
      idDoc: doc.id,
      ...doc.data(), //DESTRUCTURING
    });
  });
  return tmp;       
}

/**
 * @param {String} $collectionName Nombre de la colección
 * @param {String} $orderBy Campo por el que se desea ordenar la búsqueda
 * @returns {Array} Array de objetos con los documentos encontrados o array vacío si no encuentra nada
 */
 export const getDocumentsOrderBy = async ($collectionName,$orderBy) => {
  
  const tmp = [];
  const q = query(collection(db, $collectionName), orderBy($orderBy));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    tmp.push({
      idDoc: doc.id,
      ...doc.data(), //DESTRUCTURING
    });
  });
  return tmp;
}


/**
 * 
 * @param {string} collection nombre de la colección en la que se encuentra el archivo que se va a borrar
 * @param {string} uid código del documento que vamos a borrar  
 */
export const deleteDocument = async (collection, uid) => {
  await deleteDoc(doc(db,collection, uid ))
}


/**
 * Función que actualiza la información de un documento parcial o completo de firestore db
 * 
 * @param {string} uid optiene la uid del documento
 * @param {string} collection 
 * @param {Object} data
 */
 export const updateDocument = async(uid = "Qsdfa1fdfdfjdfdj", collection = "especies", data = {}) => await updateDoc(doc(db, collection, uid), data);


/**
 * 
 * @param {string} selecColec 
 * @param {string} selecDoc 
 * @param {string} buscar 
 * @returns 
 */
 export const busquedaDatos = async (selecColec, selecDoc, buscar) => {
  const arbolRef = collection(db, selecColec);

  const q = query(arbolRef, where(selecDoc, "==", buscar));
  const querySnapshot = await getDocs(q);
  const tmp = [];
  querySnapshot.forEach((doc) => {
    tmp.push({
      idDoc: doc.id,
      ...doc.data(),
    });
    // console.log(doc.id, " => ", doc.data());
  })
  return tmp;
}