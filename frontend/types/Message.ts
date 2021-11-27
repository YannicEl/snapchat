import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  UpdateData,
} from 'firebase/firestore';
import { Document } from './Documents';
import { Formats, MessageDoc, Sender } from 'lib/documents/messageDoc';

export class Message extends Document {
  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    public sender: Sender,
    public formats: Formats,
    public processed: boolean
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

    const { sender, createdAt, updatedAt, formats, processed } =
      snapshot.data(options);
    return new Message(
      snapshot.id,
      createdAt.toDate(),
      updatedAt.toDate(),
      sender,
      formats,
      processed
    );
  },
};
