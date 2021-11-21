<template>
  <div class="w-full h-full relative">
    <canvas
      ref="canvasElm"
      class="absolute w-full h-full z-10"
      @mousemove="paint"
      @touchmove="paint"
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

const { uploadImg } = useFirestorage();

const inEditor = useState<boolean>('inEditor');

const canvasElm = ref<HTMLCanvasElement | null>(null);

const { setCanvas, drawImage, drawCircle, addToQueue, undo } = useEditor();

const mousedown = ref(false);

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

  setCanvas(canvas);

  const { videoHeight, videoWidth } = videoElm;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width;
  canvas.height = height;

  const scaledWidth = videoWidth * (canvas.height / videoHeight);
  const xOffset = (scaledWidth - canvas.width) / 2;
  drawImage(videoElm, -xOffset, 0, scaledWidth, canvas.height);
});

const deletePic = async () => {
  inEditor.value = false;
};
onKeyUp('Escape', deletePic);

const upload = async () => {
  const blob = await canvasToBlob(canvasElm.value);
  uploadImg(blob);
};

const paint = (e: MouseEvent | TouchEvent) => {
  let x = 0;
  let y = 0;

  if (e instanceof MouseEvent) {
    if (!mousedown.value) return;
    x = e.offsetX;
    y = e.offsetX;
  } else if (e instanceof TouchEvent) {
    const { left, top } = (
      e.target as HTMLCanvasElement
    )?.getBoundingClientRect();
    x = e.targetTouches[0].pageX - left;
    y = e.targetTouches[0].pageY - top;
  }

  drawCircle(x, y, 15, '#FF0000');
};

watch(mousedown, (res) => {
  if (!res) {
    addToQueue();
  }
});

onKeyUp('z', undo);
</script>
