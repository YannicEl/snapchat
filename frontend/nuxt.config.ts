import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
  buildModules: ['nuxt-windicss', '@vueuse/core/nuxt'],

  publicRuntimeConfig: {
    firebaseConfig: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUHT_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
  },
});
