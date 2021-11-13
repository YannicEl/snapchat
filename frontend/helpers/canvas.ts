export const canvasToBlob = async (
  canvas: HTMLCanvasElement
): Promise<Blob | null> => {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob));
  });
};
