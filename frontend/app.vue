<template>
  <div class="container mx-auto">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { initializeApp } from 'firebase/app';

const { firebaseConfig } = useRuntimeConfig();
initializeApp(firebaseConfig);
</script>
