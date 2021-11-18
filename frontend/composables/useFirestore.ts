import {
  getFirestore,
  collection as _collection,
  doc as _doc,
  getDoc as _getDoc,
  getDocs,
  addDoc as _addDoc,
  setDoc as _setDoc,
  onSnapshot,
  FirestoreDataConverter,
  DocumentReference,
  serverTimestamp,
  query,
  QueryConstraint,
} from 'firebase/firestore';
import { Document } from '../types/Documents';
import { Ref } from 'vue';

export type Collections = 'messages' | 'users';

export const useFirestore = <T extends Document>(
  path: Collections,
  converter: FirestoreDataConverter<T>
) => {
  const collection = _collection(getFirestore(), path).withConverter(converter);

  const set = (body: Partial<T> & Pick<T, 'id'>): Promise<void> => {
    const { id, ...rest } = body;

    return _setDoc(getDoc(id), {
      ...rest,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    } as any);
  };

  const add = (body: Partial<Omit<T, 'id'>>): Promise<DocumentReference<T>> => {
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

  const listRef = (
    constraints: QueryConstraint[] = []
  ): Ref<T[] | undefined> => {
    const collectionData = ref<T[]>();
    const q = query(collection, ...constraints);
    onSnapshot(q, (docs) => {
      collectionData.value = docs.docs.map((e) => e.data());
    });
    return collectionData;
  };

  const getDoc = (id: string): DocumentReference<T> => {
    return _doc(collection, id);
  };

  return {
    add,
    set,
    get,
    getRef,
    list,
    listRef,
  };
};
