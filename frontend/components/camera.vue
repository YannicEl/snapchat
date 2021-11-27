<template>
  <div class="w-full h-full relative">
    <video
      ref="videoElm"
      class="absolute w-full h-full object-cover z-10"
      autoplay
    ></video>

    <div class="absolute bottom-0 z-20 w-full flex justify-center pb-8">
      <button class="w-16 h-16 bg-white rounded-full" @click="capture"></button>
    </div>

    <div class="absolute top-0 z-20 w-full flex justify-end pt-8 pr-8 text-2xl">
      <button
        class="w-12 h-12 bg-white rounded-full"
        @click="nextMediaDevice()"
      >
        🔄
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onKeyUp } from '@vueuse/core';

const {
  isSupported,
  loadMediaDevices,
  conntectVideoStream,
  nextMediaDevice,
  setVideoElm,
} = useCamera();

const inEditor = useState<boolean>('inEditor');
const videoElm = ref<HTMLVideoElement | null>(null);

onMounted(async () => {
  if (isSupported() && videoElm.value) {
    setVideoElm(videoElm.value);
    await loadMediaDevices();
    await conntectVideoStream();
  } else {
    console.log('Camera not supported');
  }
});

const capture = () => {
  inEditor.value = true;
};

onKeyUp([' ', 'Enter'], capture);
</script>
