<template>
  <header
    class="
      flex
      justify-between
      items-center
      py-5
      border-b
      px-8
      border-cool-gray-200
    "
  >
    <button class="flex flex-col justify-between h-[22px]" @click="toggle">
      <span class="bg-gray-900 rounded-full w-7 h-1"></span>
      <span class="bg-gray-900 rounded-full w-7 h-1"></span>
      <span class="bg-gray-900 rounded-full w-7 h-1"></span>
    </button>

    {{ isOpen }}

    <div class="text-xl font-bold text-gray-900 tracking-0.5em">SPITTER</div>
  </header>
</template>

<script setup lange="ts">
const { toggle, isOpen } = useSidenav();
</script>
