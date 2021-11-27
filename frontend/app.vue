<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap"
    rel="stylesheet"
  />

  <client-only>
    <debug v-show="settings?.debug"></debug>
  </client-only>

  <NuxtPage />
</template>

<script setup lang="ts">
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import splitbee from '@splitbee/web';
import { User, userConverter } from './types/User';

const { firebaseConfig } = useRuntimeConfig();
initializeApp(firebaseConfig);

const { get } = useFirestore<User>('users', userConverter);

const userStore = useUser();

splitbee.init();

const router = useRouter();

onAuthStateChanged(getAuth(), async (authUser) => {
  if (!authUser) {
    router.push({ path: '/login' });
    return;
  }

  const user = await get(authUser?.uid);
  userStore.value = user;
});

const settings = useSettings();
</script>
