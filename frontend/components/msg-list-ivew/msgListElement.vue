<template>
  <li
    class="
      flex
      justify-between
      items-center
      px-8
      py-5
      border-b border-cool-gray-200
    "
  >
    <div class="flex items-center">
      <div class="w-5 h-5 rounded-full bg-blue-600 mr-4"></div>
      <span class="text-gray-900 font-bold">{{ sender }}</span>
    </div>

    <div>{{ createdAt.valueOf() }}</div>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  sender: string;
  createdAt: Date;
}>();

const { sender, createdAt } = toRefs(props);
</script>
