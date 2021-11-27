<template>
  <div class="w-screen h-screen grid place-items-center">
    <div
      class="h-95vh w-full max-w-screen-2xl bg-white rounded-2xl shadow-xl flex items-center justify-center relative"
    >
      <NuxtLink class="absolute top-5 left-5" to="/">back</NuxtLink>

      <img v-if="src" :src="src" alt="" />
      <spinner v-else></spinner>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  layout: false,
};
</script>

<script setup lang="ts">
const { addToCache, getFromCache } = useImgCache();
const { getFile } = useFirestorage();
const { params } = useRoute();

const src = ref<string>();

onMounted(async () => {
  const id = params.id as string;

  let blob = getFromCache(id);

  if (!blob) {
    blob = await getFile(id);
    addToCache(id, blob);
  }

  src.value = URL.createObjectURL(blob);
});
</script>
