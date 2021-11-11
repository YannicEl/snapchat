<template>
  <h2 class="text-lg font-bold">Test</h2>

  <pre>
    {{ docData }}
  </pre>

  <button @click="addCity">Add</button>
  <button @click="deleteDoc">Delete</button>
  <button @click="updateDoc">Update</button>
</template>

<script setup lang="ts">
import { City, cityConverter } from '~~/types/City';

const { add, snapshotDoc, docData } = useFirestore<City>(
  'cities',
  cityConverter
);

snapshotDoc('Wilfersdorf');

const addCity = () => {
  const city = new City('Wilfersdorf', 'Niederösterreich', 'AT');
  add(city);
};

const deleteDoc = () => {
  docData.value?.delete();
};

const updateDoc = async () => {
  await docData.value?.updateDoc({ country: Date.now().toFixed(0) });
};
</script>
