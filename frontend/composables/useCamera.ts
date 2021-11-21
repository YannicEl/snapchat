let videoElm: HTMLVideoElement;
let mediaDevices: MediaDeviceInfo[] = [];
let currentMediaDevice = 0;

export const useCamera = () => {
  const setVideoElm = (elm: HTMLVideoElement) => {
    videoElm = elm;
  };

  const isSupported = (): boolean => {
    if (process.server) {
      return false;
    } else {
      return 'mediaDevices' in navigator;
    }
  };

  const getMediaDevices = async (): Promise<MediaDeviceInfo[]> => {
    if (!isSupported) return [];

    const tempDevices = await navigator.mediaDevices.enumerateDevices();
    mediaDevices = tempDevices.filter((e) => e.kind === 'videoinput');
    console.log('mediadevices', mediaDevices);
    return mediaDevices;
  };

  const getVideoStream = (): Promise<MediaStream> => {
    const constraints = {
      video: {
        width: { ideal: 4096 },
        height: { ideal: 2160 },
      },
    };

    return navigator.mediaDevices.getUserMedia(constraints);
  };

  const nextMediaDevice = async (): Promise<void> => {
    const constraints = {
      video: {
        width: { ideal: 4096 },
        height: { ideal: 2160 },
        deviceId: mediaDevices[currentMediaDevice++].deviceId,
      },
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElm.srcObject = stream;
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
    getMediaDevices,
    nextMediaDevice,
    videoElm,
  };
};
