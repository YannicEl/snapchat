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
  </div>
</template>

<script setup lang="ts">
import { onKeyUp } from '@vueuse/core';

const inEditor = useState<boolean>('inEditor');

const videoElm = ref<HTMLVideoElement | null>(null);

const { isSupported, getVideoStream, setVideoElm } = useCamera();

onMounted(async () => {
  if (isSupported() && videoElm.value) {
    videoElm.value.srcObject = await getVideoStream();
    setVideoElm(videoElm.value);
  } else {
    console.log('Camera not supported');
  }
});

const capture = async () => {
  inEditor.value = true;
};

onKeyUp([' ', 'Enter'], capture);
</script>
