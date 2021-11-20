<template>
  <div class="w-full h-full relative">
    <canvas
      ref="canvasElm"
      class="absolute w-full h-full z-10"
      @mousemove="paint"
    ></canvas>

    <button class="absolute top-8 left-8 z-20 text-white" @click="deletePic">
      X
    </button>

    <button class="absolute bottom-8 left-8 z-20 text-white" @click="upload">
      upload
    </button>
  </div>
</template>

<script setup lang="ts">
import { canvasToBlob } from '~~/helpers/canvas';
import { onKeyUp } from '@vueuse/core';
import { drawLine, drawCircle } from '~/helpers/canvas';

const { uploadImg } = useFirestorage();

const inEditor = useState<boolean>('inEditor');

const canvasElm = ref<HTMLCanvasElement | null>(null);

watch(inEditor, async (res) => {
  if (!res) return;

  const { value: canvas } = canvasElm;
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

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.log('Could not create canvas context');
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
  const { offsetX, offsetY } = event;

  const ctx = canvasElm.value.getContext('2d');
  ctx.fillStyle = '#FF0000';
  drawCircle(ctx, offsetX, offsetY, 15);
};

const upload = async () => {
  const blob = await canvasToBlob(canvasElm.value);
  uploadImg(blob);
};
</script>
