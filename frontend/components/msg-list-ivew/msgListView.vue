<template>
  <ol>
    <msg-list-element
      v-for="message in messages"
      :key="message.id"
      :sender="message.sender"
      :createdAt="message.createdAt"
    ></msg-list-element>
  </ol>
</template>

<script setup lang="ts">
import { Message, messageConverter } from '~~/types/Message';

const { listRef } = useFirestore<Message>('messages', messageConverter);

const messages = listRef();
</script>
