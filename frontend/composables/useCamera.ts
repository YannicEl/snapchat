import { Ref } from 'vue';

export const useCamera = (videoElm: Ref<HTMLVideoElement | null>) => {
  const isSupported = () => {
    if (process.server) {
      return false;
    } else {
      return 'mediaDevices' in navigator;
    }
  };

  const getVideoStream = (): Promise<MediaStream> => {
    const constraints = {
      video: {
        width: { ideal: 4096 },
        height: { ideal: 2160 },
        facingMode: 'user',
      },
    };

    return navigator.mediaDevices.getUserMedia(constraints);
  };

  const stopVideoStream = () => {
    const mediaProvider = videoElm?.value?.srcObject;
    if (!(mediaProvider instanceof MediaStream)) return;

    mediaProvider.getVideoTracks().forEach((track) => track.stop());
  };

  return {
    isSupported,
    getVideoStream,
    stopVideoStream,
  };
};
