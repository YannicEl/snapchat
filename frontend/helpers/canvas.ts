export const canvasToBlob = async (
  canvas: HTMLCanvasElement
): Promise<Blob | null> => {
  return new Promise<Blob | null>((resolve, reject) => {
    try {
      canvas.toBlob((blob) => resolve(blob));
    } catch (err) {
      reject(err);
    }
  });
};
