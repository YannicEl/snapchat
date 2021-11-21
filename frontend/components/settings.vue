<template>
  <div
    class="
      absolute
      left-0
      bg-gray-100
      w-full
      h-full
      flex flex-col
      z-10
      overflow-auto
    "
  >
    <div class="flex-1 flex flex-col gap-3">
      <h1 class="text-2xl font-bold">Settings</h1>
      <!-- <div>turn of notifiactions</div> -->
      <!-- <div>Install</div> -->

      <label for="aggressivePreloading">
        <span class="select-none">Aggressive Preloading</span>
        <input
          type="checkbox"
          id="aggressivePreloading"
          v-model="settings.aggressivePreloading"
        />
      </label>

      <label for="wildWasterland">
        <span class="select-none">Wild Wasterland Mode</span>
        <input
          type="checkbox"
          id="wildWasterland"
          v-model="settings.wildWasterland"
        />
      </label>

      <label for="debug">
        <span class="select-none">Debug Mode</span>
        <input type="checkbox" id="debug" v-model="settings.debug" />
      </label>

      <label for="undoLimit">
        <span class="select-none">Undo Limit</span>
        <input type="number" id="undoLimit" v-model="settings.undoLimit" />
      </label>
      <button @click="logout">logout</button>
      <div>undo depth</div>
    </div>

    <div class="flex flex-col items-center justify-center py-6">
      <logo color="text-gray-400"></logo>
      <div class="font-semibold text-sm text-gray-400 tracking-widest">
        V1.0 | 12.11.2021
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth';

const settings = useSettings();

const logout = async () => signOut(getAuth());
</script>
