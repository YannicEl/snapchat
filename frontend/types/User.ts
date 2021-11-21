import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  UpdateData,
} from 'firebase/firestore';
import { BaseDoc, Document } from './Documents';

export interface Settings {
  aggressivePreloading?: boolean;
  wildWasterland?: boolean;
  undoLimit?: number;
  debug?: boolean;
}

export interface UserDoc extends BaseDoc {
  username: string;
  settings: Settings;
}

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
