<template>
  <div class="w-screen h-screen grid place-items-center">
    <div
      class="w-full max-w-screen-2xl bg-white rounded-2xl shadow-xl h-95vh flex flex-col items-center"
    >
      <logo class="mb-10 mt-20rem" size="text-5xl"></logo>

      <form
        class="flex flex w-1/5 border-b-2 border-b-gray-900 mr-2"
        @submit.prevent="submit"
      >
        <input
          class="w-full text-xl font-bold text-center outline-none"
          type="text"
          v-model="username"
          placeholder="Choose a username"
        />

        <button class="text-xl" style="outline: none">▶</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  layout: false,
};
</script>

<script setup lang="ts">
import { getAuth, signInAnonymously } from 'firebase/auth';
import { User, userConverter } from '~~/types/User';

const { set } = useFirestore<User>('users', userConverter);

const router = useRouter();

const username = ref<string>();

const submit = async () => {
  if (!username.value) return;

  const auth = getAuth();
  const { user } = await signInAnonymously(auth);

  await set({ username: username.value, id: user.uid });

  router.push({ path: '/' });
};
</script>
