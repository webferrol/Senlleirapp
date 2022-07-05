import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, setDoc, query, where } from "firebase/firestore";

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
      idCollection: doc.id,
      ...doc.data(),
    });
    // console.log(doc.id, " => ", doc.data());
  })
  return tmp;
}