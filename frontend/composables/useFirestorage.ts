import {
  getStorage,
  ref,
  uploadBytesResumable,
  getBlob,
} from 'firebase/storage';

const { supported } = useImgSupport();

export const useFirestorage = () => {
  const uploadImg = async (blob: Blob, name: string): Promise<void> => {
    const fileRef = ref(getStorage(), `uploads/${name}.png`);

    const uploadTask = uploadBytesResumable(fileRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        ({ bytesTransferred, totalBytes }) => {
          const progress = (bytesTransferred / totalBytes) * 100;
          console.log(`Upload: ${progress.toFixed(2)}%`);
        },
        (err) => {
          reject(err);
        },
        () => {
          resolve();
        }
      );
    });
  };

  const getFile = async (messageId: string): Promise<Blob> => {
    const { avif, webp } = supported.value;
    const fileType = avif ? 'avif' : webp ? 'webp' : 'jpg';
    const fileRef = ref(getStorage(), `messages/${messageId}.${fileType}`);
    return getBlob(fileRef);
  };

  return { uploadImg, getFile };
};
