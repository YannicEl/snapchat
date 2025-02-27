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
      <button @click="send">send</button>
      <button @click="undo">undo</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onKeyUp } from '@vueuse/core';
import { canvasToBlob } from '~~/helpers/canvas';
import { Message, messageConverter } from '~~/types/Message';

const userStore = useUser();

const { add } = useFirestore<Message>('messages', messageConverter);
const { uploadImg } = useFirestorage();

const inEditor = useState<boolean>('inEditor');

const canvasElm = ref<HTMLCanvasElement | null>(null);

const { setCanvasElm, drawImage, drawCircle, addToQueue, resetQueue, undo } =
  useEditor();

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

  setCanvasElm(canvas);

  const { videoHeight, videoWidth } = videoElm;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width;
  canvas.height = height;

  const scaledWidth = videoWidth * (canvas.height / videoHeight);
  const xOffset = (scaledWidth - canvas.width) / 2;
  drawImage(videoElm, -xOffset, 0, scaledWidth, canvas.height);
});

const deletePic = async () => {
  resetQueue();
  inEditor.value = false;
};
onKeyUp('Escape', deletePic);

const send = async () => {
  const { id, username } = userStore.value;
  const doc = await add({
    sender: {
      id,
      name: username,
    },
  });
  const blob = await canvasToBlob(canvasElm.value);
  uploadImg(blob, doc.id);
};

const paint = (e: MouseEvent | TouchEvent) => {
  let x = 0;
  let y = 0;

  if (e instanceof MouseEvent) {
    if (!mousedown.value) return;
    x = e.offsetX;
    y = e.offsetY;
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
