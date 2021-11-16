import { logger } from 'firebase-functions';
import { getStorage } from './firebase.js';

const storage = getStorage();
const bucket = storage.bucket();

export const downloadFile = async (filePath: string): Promise<Buffer> => {
  try {
    const [buffer] = await bucket.file(filePath).download();
    logger.log(`downloaded file: ${filePath}`);
    return buffer;
  } catch (err) {
    logger.error(err);
    throw new Error(`error downloading file: ${filePath}`);
  }
};

export const uploadFile = async (
  buffer: Buffer,
  filePath: string
): Promise<void> => {
  logger.info(filePath.split('/').at(-1));
  const file = await bucket.file(filePath);
  await file.save(buffer);
  await file.setMetadata({
    contentDisposition: `attachment; filename=${filePath.split('/').at(-1)}`,
  });
};
