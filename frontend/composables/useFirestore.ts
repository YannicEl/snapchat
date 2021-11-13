import {
  getFirestore,
  collection as _collection,
  doc as _doc,
  getDoc as _getDoc,
  getDocs,
  addDoc as _addDoc,
  onSnapshot,
  FirestoreDataConverter,
  DocumentReference,
  serverTimestamp,
} from 'firebase/firestore';
import { Document } from '../types/Documents';
import { Ref } from 'vue';

export const useFirestore = <T extends Document>(
  path: string,
  converter: FirestoreDataConverter<T>
) => {
  const collection = _collection(getFirestore(), path).withConverter(converter);

  const add = <X>(
    body: Partial<Omit<X, 'id'>>
  ): Promise<DocumentReference<T>> => {
    return _addDoc<T>(collection, {
      ...body,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    } as any);
  };

  const get = async (id: string): Promise<T | undefined> => {
    return _getDoc(getDoc(id)).then((e) => e.data());
  };

  const getRef = (id: string): Ref<T | undefined> => {
    const docData = ref<T>();
    onSnapshot(getDoc(id), (doc) => {
      docData.value = doc.data();
    });
    return docData;
  };

  const list = (): Promise<T[]> => {
    return getDocs(collection).then((e) => e.docs.map((e) => e.data()));
  };

  const listRef = (): Ref<T[] | undefined> => {
    const collectionData = ref<T[]>();
    onSnapshot(collection, (docs) => {
      collectionData.value = docs.docs.map((e) => e.data());
    });
    return collectionData;
  };

  const getDoc = (id: string): DocumentReference<T> => {
    return _doc(collection, id);
  };

  return {
    add,
    get,
    getRef,
    list,
    listRef,
  };
};
