let videoElm: HTMLVideoElement = null;
let mediaDevices: MediaDeviceInfo[] = [];
let currentMediaDevice = 0;

export const useCamera = () => {
  const setVideoElm = (elm: HTMLVideoElement) => {
    videoElm = elm;
  };

  const isSupported = (): boolean => {
    return !process.server && 'mediaDevices' in navigator;
  };

  const loadMediaDevices = async (): Promise<void> => {
    const tempDevices = await navigator.mediaDevices.enumerateDevices();
    mediaDevices = tempDevices.filter((e) => e.kind === 'videoinput');
  };

  const getVideoStream = (deviceId?: string): Promise<MediaStream> => {
    const constraints: MediaStreamConstraints = {
      video: {
        width: { ideal: 4096 },
        height: { ideal: 2160 },
        deviceId,
      },
    };

    return navigator.mediaDevices.getUserMedia(constraints);
  };

  const conntectVideoStream = async (deviceId?: string): Promise<void> => {
    const stream = await getVideoStream(deviceId);
    videoElm.srcObject = stream;
  };

  const nextMediaDevice = async (): Promise<void> => {
    if (currentMediaDevice < mediaDevices.length - 1) {
      currentMediaDevice++;
    } else {
      currentMediaDevice = 0;
    }

    const { deviceId } = mediaDevices[currentMediaDevice];
    await conntectVideoStream(deviceId);
  };

  const stopVideoStream = (): void => {
    const mediaProvider = videoElm?.srcObject;
    if (!(mediaProvider instanceof MediaStream)) return;

    mediaProvider.getVideoTracks().forEach((track) => track.stop());
  };

  return {
    isSupported,
    setVideoElm,
    getVideoStream,
    stopVideoStream,
    loadMediaDevices,
    conntectVideoStream,
    nextMediaDevice,
    videoElm,
  };
};
