import { Unsubscribe } from '@firebase/util';
import {
  getFirestore,
  collection as _collection,
  doc as _doc,
  getDoc as _getDoc,
  setDoc as _setDoc,
  onSnapshot,
  FirestoreDataConverter,
  DocumentReference,
} from 'firebase/firestore';
import { Document } from '../types/Documents';

export function useFirestore<T extends Document>(
  path: string,
  converter: FirestoreDataConverter<T>
) {
  const collection = _collection(getFirestore(), path).withConverter(converter);

  const docData = ref<T>();
  const collectionData = ref<T[]>();

  const add = async (obj: T): Promise<void> => {
    return _setDoc(getCityDoc(obj.id), obj);
  };

  const get = async (id: string): Promise<T | undefined> => {
    return await _getDoc(getCityDoc(id)).then((e) => e.data());
  };

  const snapshotDoc = (id: string): Unsubscribe => {
    return onSnapshot(getCityDoc(id), (doc) => {
      docData.value = doc.data();
    });
  };

  const snapshotCollection = (): Unsubscribe => {
    return onSnapshot(collection, (docs) => {
      collectionData.value = docs.docs.map((e) => e.data());
    });
  };

  const getCityDoc = (id: string): DocumentReference<T> => {
    return _doc(collection, id);
  };

  return {
    add,
    get,
    snapshotDoc,
    docData,
    snapshotCollection,
    collectionData,
  };
}
