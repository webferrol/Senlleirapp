import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

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
      idCollection: doc.id,
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