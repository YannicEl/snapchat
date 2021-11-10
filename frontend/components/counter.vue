<template>
  <h2>Counter</h2>
  <div>{{ count }}</div>
  <button class="p-3 hover:bg-gray-100" @click="increment(1)">+</button>
  <button class="p-3 hover:bg-gray-100" @click="increment(-1)">-</button>
</template>

<script setup lang="ts">
const { count, increment } = useCustomCounter();
</script>
