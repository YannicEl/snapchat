import { region } from 'firebase-functions';
import { ENV } from '../environment.js';
import { handler as optimizeImg } from './optimizeImgs.js';

export const trigger = {
  optimizeImg: region(ENV.function.region)
    .storage.object()
    .onFinalize(optimizeImg),
};
