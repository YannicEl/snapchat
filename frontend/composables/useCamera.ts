let videoElm: HTMLVideoElement;

export const useCamera = () => {
  let mediaDevices: MediaDeviceInfo[] = [];
  const setVideoElm = (elm: HTMLVideoElement) => {
    videoElm = elm;
  };

  const isSupported = async () => {
    await setupSupport();
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
        width: { ideal: 4096 },
        height: { ideal: 2160 },
        deviceId: mediaDevices[index].deviceId,
      },
    };

    return navigator.mediaDevices.getUserMedia(constraints);
  };

  const setupSupport = async () => {
    mediaDevices = [];
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
    videoElm,
  };
};
