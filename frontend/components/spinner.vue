<template>
  <div
    class="spinner border-2"
    :class="['w-' + size, 'h-' + size, border]"
  ></div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: number;
    border?: string;
  }>(),
  { size: 10, border: 'border-5' }
);

const { size } = toRefs(props);
</script>

<style lang="scss">
.spinner {
  @apply border-gray-300 border-t-blue-500 rounded-full;

  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
