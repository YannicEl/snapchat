<template>
  <div
    class="
      absolute
      top-0
      left-0
      bg-gray-900/40
      p-2
      text-[#39FF14]
      monospace
      font-bold z-10
    "
  >
    <div>{{ fps }} fps</div>

    <div v-if="isSupported && memory">
      {{ size(memory.usedJSHeapSize) }} / {{ size(memory.totalJSHeapSize) }} MB
    </div>
  </div>
</template>

<script lang="ts" setup>
const { isSupported, memory } = useMemory();
const fps = useFps();

const size = (v: number) => {
  const mb = v / 1024 / 1024;
  return mb.toFixed(0);
};
</script>

<style>
.monospace {
  font-family: 'Courier New', Courier, monospace;
}
</style>
