<template>
  <div class="w-full h-full relative">
    <canvas
      ref="canvasElm"
      class="absolute w-full h-full object-cover z-10"
    ></canvas>

    <button class="absolute top-8 left-8 z-20 text-white" @click="deletePic">
      X
    </button>
  </div>
</template>

<script setup lang="ts">
import { canvasToBlob } from '~~/helpers/canvas';
import { onKeyUp } from '@vueuse/core';

const { uploadImg } = useFirestorage();

const inEditor = useState<boolean>('inEditor');

const canvasElm = ref<HTMLCanvasElement | null>(null);

watch(inEditor, async (res) => {
  if (!res) return;

  const { videoElm } = useCamera();

  const { value: canvas } = canvasElm;

  if (!canvas) {
    console.log('Canvas Element not found');
    return;
  }

  if (!videoElm) {
    console.log('Video Element not found');
    inEditor.value = false;
    return;
  }

  const { videoHeight, videoWidth } = videoElm;
  canvas.width = videoWidth;
  canvas.height = videoHeight;

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.log('Could not create canvas context');
    return;
  }

  ctx.drawImage(videoElm, 0, 0, canvas.width, canvas.height);

  const blob = await canvasToBlob(canvas);

  if (blob) {
    uploadImg(blob);
  }
});

const deletePic = async () => {
  inEditor.value = false;
};

onKeyUp('Escape', deletePic);
</script>
