<template>
  <NuxtLayout>
    <template #left>
      <msg-list-view></msg-list-view>
    </template>

    <template #right>
      <camera v-show="!inEditor"></camera>

      <editor></editor>
    </template>
  </NuxtLayout>
</template>

<script lang="ts">
export default {
  layout: false,
};
</script>

<script setup lang="ts">
const inEditor = useState('inEditor', () => false);
</script>
