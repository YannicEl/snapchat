import { FirestoreDataConverter, UpdateData } from 'firebase/firestore';
import { Document } from './Documents';

export class City extends Document {
  constructor(
    public name: string,
    public state: string,
    public country: string
  ) {
    super('cities', name);
  }

  updateDoc(data: UpdateData<City>) {
    this.update<City>(data);
  }

  toString = (): string => {
    return `${this.name}, ${this.state} ${this.country}`;
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
    return new City(name, state, country);
  },
};
