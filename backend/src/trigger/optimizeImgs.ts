import { ObjectMetadata } from 'firebase-functions/v1/storage';
import { EventContext, logger } from 'firebase-functions';
import { HttpsError } from 'firebase-functions/lib/providers/https';
import { downloadFile, uploadFile } from '../helper/storage.js';
import { convertImg } from '../helper/sharp.js';

export async function handler(object: ObjectMetadata, context: EventContext) {
  logger.log(object);

  if (!object?.contentType?.startsWith('image/')) {
    logger.error('This is not an image.');
    throw new HttpsError('invalid-argument', 'Not an Image');
  }

  const { name: filePath } = object;
  const parts = filePath?.split('/');
  const messageId = parts?.[1]?.split('.')?.[0];

  if (!filePath?.startsWith('uploads/') || parts?.length !== 2 || !messageId) {
    logger.error('Not a new message');
    throw new HttpsError('invalid-argument', 'Not a new message');
  }

  try {
    const originalBuffer = await downloadFile(filePath);

    await Promise.all(
      ['avif', 'png', 'webp'].map(async (fileType) => {
        const buffer = await convertImg(originalBuffer, fileType);
        await uploadFile(buffer, `messages/${messageId}.${fileType}`);
      })
    );

    return true;
  } catch (err) {
    logger.error(err);
    throw new HttpsError('internal', 'Internal Server Error');
  }
}
