<template>
  <div>
    <ol v-if="messages?.length">
      <msg-list-element
        v-for="message in messages"
        :key="message.id"
        :sender="message.sender.name"
        :createdAt="message.createdAt"
        :loading="!message.processed"
      ></msg-list-element>
    </ol>

    <div v-else class="flex items-center justify-center mt-4">
      <spinner></spinner>
    </div>
  </div>
</template>

<script setup lang="ts">
import { orderBy } from 'firebase/firestore';
import { Message, messageConverter } from '~~/types/Message';

const { listRef } = useFirestore<Message>('messages', messageConverter);

const messages = listRef([orderBy('createdAt', 'desc')]);
</script>
