import { region } from 'firebase-functions/v1';
import { handler as func1 } from './func1.js';

export const test = {
  func1: region('europe-west1').https.onCall(func1),
};
