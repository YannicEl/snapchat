<template>
  <NuxtLayout>
    <template #left>
      <msg-list-view></msg-list-view>
    </template>

    <template #right>
      <viewfinder></viewfinder>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  layout: false,
};
</script>
