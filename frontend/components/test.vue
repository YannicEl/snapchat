<template>
  <h2 class="text-lg font-bold">Test</h2>

  <div>doc</div>
  <pre>
    {{ doc }}
  </pre>

  <div>list</div>
  <div v-for="doc in docs">
    <pre>
      {{ doc }}
    </pre>
  </div>

  <button @click="addCity">Add</button>
  <button @click="deleteDoc">Delete</button>
  <button @click="updateDoc">Update</button>
</template>

<script setup lang="ts">
import { City, cityConverter } from '~~/types/City';

const { add, getRef, listRef } = useFirestore<City>('cities', cityConverter);

const doc = getRef('Wilfersdorf');
const docs = listRef();

const addCity = async () => {
  const name = 'Wilfersdorf';
  const country = 'AT';
  const state = 'Niederösterreich';

  const ref = await add<City>({ name, country, state });
  const city = await getRef(ref.id);

  watch(city, (data) => console.log(data?.toString()));
};

const deleteDoc = () => {
  doc.value?.delete();
};

const updateDoc = async () => {
  await doc.value?.updateDoc({ country: Date.now().toFixed(0) });
};
</script>
