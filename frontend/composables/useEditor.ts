import { drawCircle as _drawCircle } from '~~/helpers/canvas';

let canvas: HTMLCanvasElement = null;
let ctx: CanvasRenderingContext2D = null;
const undoQueue: ImageData[] = [];

export const useEditor = () => {
  const setCanvasElm = (elm: HTMLCanvasElement) => {
    canvas = elm;
    ctx = canvas.getContext('2d');
  };

  const drawImage = (
    source: CanvasImageSource,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    ctx.drawImage(source, x, y, width, height);
    addToQueue();
  };

  const drawCircle = (x: number, y: number, radius: number, color: string) => {
    _drawCircle(ctx, x, y, radius, color);
  };

  const addToQueue = () => {
    const { undoLimit } = useSettings().value;

    if (undoQueue.length - 1 >= undoLimit) {
      console.log('Undo Limit reached');
      undoQueue.shift();
    }

    const { width, height } = ctx.canvas;
    const img = ctx.getImageData(0, 0, width, height);
    undoQueue.push(img);

    console.log(`Undo queue: ${undoQueue.length - 1} / ${undoLimit}`);
  };

  const resetQueue = () => {
    undoQueue.splice(0, undoQueue.length);
  };

  const undo = () => {
    if (undoQueue.length <= 1) return;

    undoQueue.pop();
    const img = undoQueue.at(-1);

    ctx.putImageData(img, 0, 0);

    const { undoLimit } = useSettings().value || {};
    console.log(`Undo queue: ${undoQueue.length - 1} / ${undoLimit}`);
  };

  return { setCanvasElm, drawImage, drawCircle, addToQueue, resetQueue, undo };
};
