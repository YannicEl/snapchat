<template>
  <button @click="addMsg">add</button>
</template>

<script setup lang="ts">
import { Message, messageConverter } from '~~/types/Message';

const { add } = useFirestore<Message>('messages', messageConverter);

const addMsg = async () => {
  add({ sender: 'yannic' });
};
</script>
