import { getStorage, ref, uploadBytes, UploadResult } from 'firebase/storage';

export const useFirestorage = () => {
  const uploadImg = async (blob: Blob): Promise<UploadResult> => {
    const storage = getStorage();

    const fileRef = ref(storage, 'public/mountains.jpg');

    return uploadBytes(fileRef, blob);
  };

  return { uploadImg };
};
