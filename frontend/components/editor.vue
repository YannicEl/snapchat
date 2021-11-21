<template>
  <div class="w-full h-full relative">
    <canvas
      ref="canvasElm"
      class="absolute w-full h-full z-10"
      @mousemove="paint"
      @mousedown="mousedown = true"
      @mouseup="mousedown = false"
    ></canvas>

    <button class="absolute top-8 left-8 z-20 text-white" @click="deletePic">
      X
    </button>

    <div class="absolute bottom-8 left-8 z-20 text-white flex gap-8">
      <button @click="upload">upload</button>
      <button @click="undo">undo</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { canvasToBlob } from '~~/helpers/canvas';
import { onKeyUp } from '@vueuse/core';
import { drawLine, drawCircle } from '~/helpers/canvas';

const { uploadImg } = useFirestorage();

const settings = useSettings();

const inEditor = useState<boolean>('inEditor');

const canvasElm = ref<HTMLCanvasElement | null>(null);
const ctxRef = computed(() => canvasElm.value.getContext('2d'));

const undoQueue: ImageData[] = [];

const mousedown = ref(false);

watch(inEditor, async (res) => {
  if (!res) return;

  const { value: canvas } = canvasElm;
  const { value: ctx } = ctxRef;
  if (!canvas) {
    console.log('Canvas Element not found');
    return;
  }

  const { videoElm } = useCamera();
  if (!videoElm) {
    console.log('Video Element not found');
    inEditor.value = false;
    return;
  }

  const { videoHeight, videoWidth } = videoElm;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width;
  canvas.height = height;

  const scaledWidth = videoWidth * (canvas.height / videoHeight);
  const xOffset = (scaledWidth - canvas.width) / 2;
  ctx.drawImage(videoElm, -xOffset, 0, scaledWidth, canvas.height);

  drawGrid(ctx);

  addToQueue();
});

const deletePic = async () => {
  inEditor.value = false;
};

onKeyUp('Escape', deletePic);

const drawGrid = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = ctx.canvas;

  const cellSize = 50;
  const xSegments = width / cellSize;
  const ySegments = height / cellSize;

  ctx.font = '15px Arial';
  ctx.strokeStyle = '#ff0000';

  for (let i = 0; i < xSegments; i++) {
    const x = cellSize * i;
    drawLine(ctx, x, 0, x, height);
    ctx.strokeText(`${x}`, x + 3, 15);
  }

  for (let i = 0; i < ySegments; i++) {
    drawLine(ctx, 0, cellSize * i, width, cellSize * i);
  }

  for (let i = 0; i < xSegments; i++) {
    for (let j = 0; j < ySegments; j++) {
      const x = cellSize * i;
      const y = cellSize * j;
      ctx.strokeText(`${y}`, x + 3, y - 5);
    }
  }
};

const paint = (event: MouseEvent) => {
  if (!mousedown.value) return;

  const { offsetX, offsetY } = event;

  const ctx = ctxRef.value;
  ctx.fillStyle = '#FF0000';
  drawCircle(ctx, offsetX, offsetY, 15);
};

const upload = async () => {
  const blob = await canvasToBlob(canvasElm.value);
  uploadImg(blob);
};

const addToQueue = () => {
  const undoLimit = settings.value?.undoLimit;

  if (undoQueue.length - 1 >= undoLimit) {
    console.log('Undo Limit reached');
    undoQueue.shift();
  }

  const ctx = ctxRef.value;
  const { width, height } = ctx.canvas;
  const img = ctx.getImageData(0, 0, width, height);
  undoQueue.push(img);

  console.log(`Queue is ${undoQueue.length}`);
};

watch(mousedown, (res) => {
  if (!res) {
    addToQueue();
  }
});

const undo = () => {
  if (undoQueue.length <= 1) return;

  undoQueue.pop();
  const img = undoQueue.at(-1);

  ctxRef.value.putImageData(img, 0, 0);
};

onKeyUp('z', undo);
</script>
