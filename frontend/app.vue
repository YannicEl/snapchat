<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap"
    rel="stylesheet"
  />

  <NuxtPage />
</template>

<script setup lang="ts">
import { initializeApp } from 'firebase/app';

const { firebaseConfig } = useRuntimeConfig();
initializeApp(firebaseConfig);
</script>
