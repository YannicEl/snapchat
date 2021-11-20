export const canvasToBlob = async (
  canvas: HTMLCanvasElement
): Promise<Blob | null> => {
  return new Promise<Blob | null>((resolve, reject) => {
    try {
      canvas.toBlob((blob) => resolve(blob), 'image/png', 1);
    } catch (err) {
      reject(err);
    }
  });
};

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): void => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
): void => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fill();
};
