import { db } from "./firebase";
import { 
  orderBy,
  collection,
  doc,
  startAfter,
  limit,
  limitToLast,
  query,
  getDocs,
  getDoc,
  endBefore
   } from "firebase/firestore";


//    Paginación
/**
 * 
 * @param {String} collectionRef - Referencia a un colleción de firestore collection()
 * @param {String} field - Campo por el que se ordenará la consulta
 * @param {String|Object} lastDocSnap - Creates a QueryConstraint that modifies the result set to start after the provided fields relative to the order of the query. The order of the field values must match the order of the order by clauses of the query.
 * @param {Number} pageSize - Número de registros a montar 
 * @returns query - Creates a new immutable instance of Query that is extended to also include additional query constraints.
 */
export const initPage = async (collectionRef, field, pageSize) => {
    const tmp = {
        data: [],
        idDocLast: '',
        idDocFirst: ''
    };
    const querySnapshot =  await getDocs(query(
    collection(db,collectionRef),
    orderBy(field),
    limit(pageSize)));
    const tam = querySnapshot.size;
    if(tam>0){
        querySnapshot.forEach((doc) => {
            tmp.data.push({
                idDoc: doc.id,
                ...doc.data(),
            })
        })
        tmp.idDocLast = querySnapshot.docs[tam-1].id;
        tmp.idDocFirst = querySnapshot.docs[0].id;
        return tmp;
    }
    return tmp;

   
}

/**
 * 
 * @param {String} collectionRef - Referencia a un colleción de firestore collection()
 * @param {String} field - Campo por el que se ordenará la consulta
 * @param {String|Object} lastDocSnap - Creates a QueryConstraint that modifies the result set to start after the provided fields relative to the order of the query. The order of the field values must match the order of the order by clauses of the query.
 * @param {Number} pageSize - Número de registros a montar 
 * @returns query - Creates a new immutable instance of Query that is extended to also include additional query constraints.
 */
export const nextPage = async (collectionRef, field, idDoc, pageSize) => {
    const tmp = {
        data: [],
        idDocLast: '',
        idDocFirst: ''
    };
    const docRef = doc(db, collectionRef, idDoc);
    const docSnap = await getDoc(docRef);

    const querySnapshot = await getDocs(query(
        collection(db,collectionRef),
        orderBy(field),
        startAfter(docSnap),
        limit(pageSize)));
        
        const tam = querySnapshot.size;
        if(tam>0){
            querySnapshot.forEach((doc) => {
                tmp.data.push({
                    idDoc: doc.id,
                    ...doc.data(),
                })
            })
            tmp.idDocLast = querySnapshot.docs[tam-1].id;
            tmp.idDocFirst = querySnapshot.docs[0].id;
            return tmp;
        }
        return tmp;
}

/**
 * 
 * @param {String} collectionRef - Referencia a un colleción de firestore collection()
 * @param {String} field - Campo por el que se ordenará la consulta
 * @param {String|Object} lastDocSnap - Creates a QueryConstraint that modifies the result set to start after the provided fields relative to the order of the query. The order of the field values must match the order of the order by clauses of the query.
 * @param {Number} pageSize - Número de registros a montar 
 * @returns query - Creates a new immutable instance of Query that is extended to also include additional query constraints.
 */
export const previousPage = async (collectionRef,field,idDoc,pageSize) => {
    const tmp = {
        data: [],
        idDocLast: '',
        idDocFirst: ''

    };
    const docRef = doc(db, collectionRef, idDoc);
    const docSnap = await getDoc(docRef);

    const querySnapshot = await getDocs(query(
        collection(db,collectionRef),
        orderBy(field),
        endBefore(docSnap),
        limitToLast(pageSize)));
        const tam = querySnapshot.size;
        if(tam>0){
            querySnapshot.forEach((doc) => {
                tmp.data.push({
                    idDoc: doc.id,
                    ...doc.data(),
                })
            })
            tmp.idDocLast = querySnapshot.docs[tam-1].id;
            tmp.idDocFirst = querySnapshot.docs[0].id;
            return tmp;
        }
        return tmp;
}
/**
 * 
 * @param {String} collectionRef - Referencia a un colleción de firestore collection()
 * @param {String} field - Campo por el que se ordenará la consulta
 * @param {Number} end - Límite de página a donde ir 
 * @returns QuerySnapshot
 */
 export const limitPage = async (collectionRef,field,end) => 
 await getDocs(query(
     collection(db,collectionRef),
     orderBy(field),
     limit(end)));
/**
 * 
 * @param {String} collectionRef - Referencia a un colleción de firestore collection()
 * @param {Number}  - Número de registros
 */
export const totalPages = async (collectionRef) => {
    const q = query(collection(db, collectionRef));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
}

/**
 * Obtenemos un elemento (doc)
 * @param {String} collectionRef - Referencia a un colleción de firestore collection()
 * @param {Object|String}  - Referencia al coc que se quiere localizar
 */
 export const seekItemPage = async (collectionRef,docRef) => {
    return await getDoc(doc(collection(db, collectionRef), docRef));
}