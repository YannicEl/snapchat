<template>
  <div
    class="text-xl font-bold tracking-0.4em text-center -mr-0.4rem"
    :class="color"
  >
    SPITTER
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: string;
  }>(),
  { color: 'text-gray-900' }
);

const { color } = toRefs(props);
</script>
