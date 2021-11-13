import {
  DocumentReference,
  deleteDoc,
  updateDoc,
  doc as _doc,
  getFirestore,
  UpdateData,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';

export abstract class Document {
  readonly doc: DocumentReference;

  constructor(
    readonly path: string,
    readonly id: string,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {
    this.doc = _doc(getFirestore(), this.path, id);
  }

  delete = async () => {
    return deleteDoc(this.doc);
  };

  protected update<T extends Document>(data: UpdateData<T>) {
    return updateDoc(this.doc, { ...data, updatedAt: serverTimestamp() });
  }
}

export interface BaseDoc {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
