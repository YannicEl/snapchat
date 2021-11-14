import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

export const useFirestorage = () => {
  const uploadImg = async (blob: Blob): Promise<string> => {
    const storage = getStorage();

    const fileRef = ref(storage, 'public/mountains.jpg');

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
          resolve(
            getDownloadURL(uploadTask.snapshot.ref).then((e) => {
              console.log(e);
              return e;
            })
          );
        }
      );
    });
  };

  return { uploadImg };
};
