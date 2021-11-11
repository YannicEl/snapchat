<template>
  <h1 class="text-2xl font-bold">Index</h1>

  <button @click="show = !show">hide</button>

  <test v-if="show"></test>
</template>

<script setup lang="ts">
const show = ref(true);
</script>
