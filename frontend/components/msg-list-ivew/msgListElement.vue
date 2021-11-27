<template>
  <NuxtLink :to="{ path: '/view/' + id }">
    <li
      class="flex justify-between items-center px-8 py-5 border-b border-cool-gray-200 hover:bg-gray-200 transition-all duration-75 cursor-pointer"
    >
      <div class="flex items-center">
        <div
          v-if="!loading"
          class="w-5 h-5 rounded-full bg-blue-600 mr-4"
        ></div>
        <spinner class="mr-4" v-else :size="5" :border="'border-3px'"></spinner>

        <span class="text-gray-900 font-bold">{{ sender }}</span>
      </div>

      <div>{{ timeAgo }}</div>
    </li>
  </NuxtLink>
</template>

<script setup lang="ts">
const { getFile } = useFirestorage();
const { addToCache, getFromCache } = useImgCache();

const props = defineProps<{
  id: string;
  sender: string;
  loading: boolean;
  createdAt: Date;
}>();

const { id, sender, loading, createdAt } = toRefs(props);

const timeAgo = computed(() => {
  const date = createdAt.value;
  const now = useTimestamp({ interval: 1000 }).value;

  const seconds = Math.floor((now - date.getTime()) / 1000);
  if (seconds <= 60) {
    return `${Math.max(seconds, 1)} sec`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes <= 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours <= 24) {
    return `${hours} h`;
  }

  const days = Math.floor(hours / 24);
  return `${days} d`;
});

onMounted(async () => {
  const { aggressivePreloading } = useSettings().value;

  if (!aggressivePreloading) return;

  let blob = getFromCache(id.value);

  if (!blob) {
    blob = await getFile(id.value);
    addToCache(id.value, blob);
  }
});
</script>
