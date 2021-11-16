import { config } from 'firebase-functions';

export interface Environment {
  function: {
    region: string;
  };
}

export const ENV = config() as Environment;
