declare module '@nuxt/kit' {
  interface PublicRuntimeConfig {
    firebaseConfig: {
      apiKey: string;
      authDomain: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
      appId: string;
    };
  }
  interface PrivateRuntimeConfig {}
}

export {};
