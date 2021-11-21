let videoElm: HTMLVideoElement;
import { Ref } from 'vue';

export const useCamera = async (videoElm: Ref<HTMLVideoElement | null>) => {
  /*const mediaDevices = (await navigator.mediaDevices.enumerateDevices()).filter(
    (e) => e.kind === 'videoinput'
  );*/

  const mediaDevices: MediaDeviceInfo[] = [];

export const useCamera = () => {
  const setVideoElm = (elm: HTMLVideoElement) => {
    videoElm = elm;
  };

  const isSupported = () => {
    if (process.server) {
      return false;
    } else {
      // return 'mediaDevices' in navigator;
      return !!mediaDevices.length;
    }
  };

  const getVideoStream = (index: number): Promise<MediaStream> => {
    const constraints = {
      video: {
        deviceId: mediaDevices[index].deviceId,
      },
    };

    return navigator.mediaDevices.getUserMedia(constraints);
  };

  /*const getVideoStream = (): Promise<MediaStream> => {
    const constraints = {
      video: {
        width: { ideal: 4096 },
        height: { ideal: 2160 },
        facingMode: 'user',
      },
    };

    return navigator.mediaDevices.getUserMedia(constraints);
  };*/

  const setupSupport = async () => {
    mediaDevices.push(
      ...(await navigator.mediaDevices.enumerateDevices()).filter(
        (e) => e.kind === 'videoinput'
      )
    );

    console.log('mediadevices', mediaDevices);
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
    setupSupport,
    videoElm,
  };
};
