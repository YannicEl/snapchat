import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  UpdateData,
} from 'firebase/firestore';
import { BaseDoc, Document } from './Documents';

export interface MessageDoc extends BaseDoc {
  sender: {
    id: string;
    name: string
  }
  formats: {
    png: boolean;
    avif: boolean;
    webp: boolean;
  };
}

export class Message extends Document {
  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    public sender: string
  ) {
    super('messages', id, createdAt, updatedAt);
  }

  updateDoc(data: UpdateData<Message>) {
    this.update<Message>(data);
  }
}

export const messageConverter: FirestoreDataConverter<Message> = {
  toFirestore: ({ sender, createdAt, updatedAt }) => {
    return {
      sender,
      createdAt,
      updatedAt,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<MessageDoc>) => {
    const options: SnapshotOptions = { serverTimestamps: 'estimate' };

    const { sender, createdAt, updatedAt } = snapshot.data(options);
    return new Message(
      snapshot.id,
      createdAt.toDate(),
      updatedAt.toDate(),
      sender
    );
  },
};
