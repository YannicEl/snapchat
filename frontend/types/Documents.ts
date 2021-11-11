import {
  DocumentReference,
  deleteDoc,
  updateDoc,
  doc as _doc,
  getFirestore,
  UpdateData,
} from 'firebase/firestore';

export abstract class Document {
  private doc: DocumentReference;

  constructor(private path: string, public id: string) {
    this.doc = _doc(getFirestore(), this.path, this.id);
  }

  delete = async () => {
    return deleteDoc(this.doc);
  };

  protected update<T extends Document>(data: UpdateData<T>) {
    return updateDoc(this.doc, data);
  }
}
