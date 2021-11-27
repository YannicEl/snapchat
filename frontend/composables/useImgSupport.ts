import { Formats } from 'lib/documents/messageDoc';

const supported = ref<Formats>({
  avif: false,
  webp: false,
  jpg: true,
});

export const useImgSupport = () => {
  const checkSupport = async (): Promise<void> => {
    if (process.server) return;

    supported.value.avif = await isSupported('avif');
    supported.value.webp = await isSupported('webp');
  };

  const isSupported = async (fileType: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = img.onerror = () => resolve(img.height === 2);

      // https://github.com/leechy/imgsupport/blob/master/imgsupport.js
      switch (fileType) {
        case 'avif':
          img.src =
            'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
          break;

        case 'webp':
          img.src =
            'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
          break;

        default:
          console.log(`fileType ${fileType} not supported`);
          resolve(false);
          break;
      }
    });
  };

  return { supported, checkSupport };
};
