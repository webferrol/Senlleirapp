import { db } from "@/firebase";
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
   } from "@firebase/storage";


//    Paginación
export const initPage = async (collectionRef, field, pageSize) => {
  await getDocs(query(
    collection(db,collectionRef),
    orderBy(field),
    limit(pageSize)));
}

export const nextPage = async (collectionRef, field, lastDocSnap, pageSize) => {
    await getDocs(query(
        collection(db,collectionRef),
        orderBy(field),
        startAfter(lastDocSnap),
        limit(pageSize)));
}

export const previousPage = async (collectionRef,field,lastDocSnap,pageSize) => {
    await getDocs(query(
        collection(db,collectionRef),
        orderBy(field),
        endBefore(lastDocSnap),
        limitToLast(pageSize)));
}