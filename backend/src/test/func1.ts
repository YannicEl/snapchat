import { CallableContext } from 'firebase-functions/lib/providers/https';
import { logger } from 'firebase-functions';

let lastCalled: number = 0;

export const handler = async (
  data: any,
  context: CallableContext
): Promise<any> => {
  logger.info(data);
  logger.info(`lastCalled: ${lastCalled}`);

  lastCalled = Date.now();

  return new Date(lastCalled).toISOString();
};
