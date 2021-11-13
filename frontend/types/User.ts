import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  UpdateData,
} from 'firebase/firestore';
import { BaseDoc, Document } from './Documents';

export interface UserDoc extends BaseDoc {
  name: string;
}

export class User extends Document {
  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    public name: string
  ) {
    super('users', id, createdAt, updatedAt);
  }

  updateDoc(data: UpdateData<User>) {
    this.update<User>(data);
  }
}

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore: ({ name, createdAt, updatedAt }) => {
    return {
      name,
      createdAt,
      updatedAt,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<UserDoc>) => {
    const options: SnapshotOptions = { serverTimestamps: 'estimate' };

    const { name, createdAt, updatedAt } = snapshot.data(options);
    return new User(snapshot.id, createdAt.toDate(), updatedAt.toDate(), name);
  },
};
