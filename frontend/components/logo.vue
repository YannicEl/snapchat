<template>
  <div
    class="text-xl font-bold tracking-0.4em text-center -mr-0.4rem select-none"
    :class="[color, size]"
    @dblclick="easterEgg"
  >
    {{ name }}
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: string;
    size?: string;
  }>(),
  { color: 'text-gray-900', size: 'text-xl' }
);

const { color, size } = toRefs(props);

const name = ref<string>('SPITTER');

const easterEgg = () => {
  if (Math.random() < 0.5) {
    name.value = 'YANNIC';
  } else {
    name.value = 'SIMON';
  }
};
</script>
