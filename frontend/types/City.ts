import { FirestoreDataConverter, UpdateData } from 'firebase/firestore';
import { Document } from './Documents';

export class City extends Document {
  constructor(
    id: string,
    public name: string,
    public state: string,
    public country: string
  ) {
    super('cities', id);
  }

  updateDoc(data: UpdateData<City>) {
    this.update<City>(data);
  }

  toString = (): string => {
    return `${this.id}: ${this.name}, ${this.state} ${this.country}`;
  };
}

export const cityConverter: FirestoreDataConverter<City> = {
  toFirestore: ({ name, state, country }) => {
    return {
      name,
      state,
      country,
    };
  },
  fromFirestore: (snapshot, options) => {
    const { name, state, country } = snapshot.data(options);
    return new City(snapshot.id, name, state, country);
  },
};
