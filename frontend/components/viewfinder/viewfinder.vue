<template>
  <div class="w-full h-full relative">
    <video
      v-show="showVideo"
      ref="videoElm"
      class="absolute w-full h-full object-cover z-10"
      autoplay
    ></video>

    <canvas
      v-show="showCanvas"
      ref="canvasElm"
      class="absolute w-full h-full object-cover z-10"
    ></canvas>

    <div
      v-if="!showCanvas"
      class="absolute bottom-0 z-20 w-full flex justify-center pb-8"
    >
      <button class="w-16 h-16 bg-white rounded-full" @click="capture"></button>
    </div>

    <button
      v-if="showCanvas"
      class="absolute top-8 left-8 z-20 text-white"
      @click="deletePic"
    >
      X
    </button>
  </div>
</template>

<script setup lang="ts">
import { onKeyUp } from '@vueuse/core';
import { canvasToBlob } from '~~/helpers/canvas';

const { uploadImg } = useFirestorage();

const showVideo = ref(true);
const showCanvas = ref(false);

const videoElm = ref<HTMLVideoElement | null>(null);
const canvasElm = ref<HTMLCanvasElement | null>(null);

const { isSupported, getVideoStream } = useCamera(videoElm);

watch(videoElm, async (data) => {
  if (isSupported() && data) {
    data.srcObject = await getVideoStream();
  } else {
    console.log('Camera not supported');
  }
});

const capture = async () => {
  const { value: camera } = videoElm;
  const { value: canvas } = canvasElm;

  if (!canvas) {
    console.log('Canvas Element not found');
    return;
  }

  if (!camera) {
    console.log('Video Element not found');
    return;
  }

  const { videoHeight, videoWidth } = camera;
  canvas.width = videoWidth;
  canvas.height = videoHeight;

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.log('Could not create canvas context');
    return;
  }

  ctx.drawImage(camera, 0, 0, canvas.width, canvas.height);

  // upload
  // const blob = await canvasToBlob(canvas);

  // if (blob) {
  //   await uploadImg(blob);
  // }

  showVideo.value = false;
  showCanvas.value = true;
};

onKeyUp([' ', 'Enter'], capture);

const deletePic = async () => {
  if (!showVideo.value) {
    showVideo.value = true;
    showCanvas.value = false;
  }
};

onKeyUp('Escape', deletePic);
</script>
