import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";

// import { updateDoc } from "firebase/database";

/**
 *
 * @param {*} uid ruta en firestore donde quiero que se manden los datos.
 * @param {Object} data objeto en el que estan almacenados los datos del formulario:
 * Ejemplo: {nombre: "",
 * descripcion_breve: "",
 * descripcion: "",
 * fecha: Timestamp}
 * @return {Object} El Objetos con las propiedades de los datos insertados
 */
export const cargarDatosFormulario = async (uid, data) => await addDoc(collection(db, uid), data); 

/**
 *
 * @param {string} uid ruta firestore de donde quiero bajar los datos
 * @returns {array} de objetos donde estan almacenados los datos
 */
export const getDatos = async (uid) => {
  const querySnapshot = await getDocs(collection(db, uid));
  const tmp = [];
  querySnapshot.forEach((doc) => {
    tmp.push({
      id: doc.id,
      timeRef: Date.now(),
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
export const deleteDatos = async (collection, uid) => {
  await deleteDoc(doc(db,collection, uid ))
}


/**
 * 
 * @param {string} id optiene la uid del documento
 * @param {string} collection 
 * @param {Object} data
 */
 export const updateDocument = async(id = "Qsdfa1fdfdfjdfdj", collection = "especies", data = {}) => await updateDoc(doc(db, collection, id), data);

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