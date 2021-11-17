import { region } from 'firebase-functions';
import { ENV } from '../environment.js';
import { handler as optimizeImg } from './optimizeImgs.js';

export const trigger = {
  optimizeImg: region(ENV.function.region)
    .runWith({
      memory: '4GB',
      timeoutSeconds: 60 * 5,
    })
    .storage.object()
    .onFinalize(optimizeImg),
};
