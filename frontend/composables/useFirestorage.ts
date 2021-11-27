import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';

export const useFirestorage = () => {
  const uploadImg = async (blob: Blob, name: string): Promise<void> => {
    const storage = getStorage();

    const fileRef = ref(storage, `uploads/${name}.png`);

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

  return { uploadImg };
};
