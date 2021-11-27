import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  UpdateData,
} from 'firebase/firestore';
import { Document } from './Documents';
import { UserDoc } from 'lib/documents/userDoc';

export class User extends Document {
  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    public username: string
  ) {
    super('users', id, createdAt, updatedAt);
  }

  updateDoc(data: UpdateData<User>) {
    this.update<User>(data);
  }
}

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore: ({ username, createdAt, updatedAt }) => {
    return {
      username,
      createdAt,
      updatedAt,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<UserDoc>) => {
    const options: SnapshotOptions = { serverTimestamps: 'estimate' };

    const { username, createdAt, updatedAt } = snapshot.data(options);
    return new User(
      snapshot.id,
      createdAt.toDate(),
      updatedAt.toDate(),
      username
    );
  },
};
