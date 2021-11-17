let videoElm: HTMLVideoElement;

export const useCamera = () => {
  const setVideoElm = (elm: HTMLVideoElement) => {
    videoElm = elm;
  };

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
    const mediaProvider = videoElm?.srcObject;
    if (!(mediaProvider instanceof MediaStream)) return;

    mediaProvider.getVideoTracks().forEach((track) => track.stop());
  };

  return {
    isSupported,
    setVideoElm,
    getVideoStream,
    stopVideoStream,
    videoElm,
  };
};
