<script lang="ts" setup>
import { type MessageType } from './types';

defineProps<{
    data: MessageType[]
}>()
</script>
<template>
    <template v-for="message in data">
        <div v-if="message.role === 'user'" class="mb-[20px] app-assistant-message">
            <span
            style="white-space: pre-line" 
            class="float-end py-[5px] px-[20px] rounded-[10px] text-hazy-light bg-darker max-w-[80%]">{{ message.content.trim() }}</span>
        </div>
        <div v-if="message.role === 'assistant'" class="mb-[20px] app-user-message">
            <span
            style="white-space: pre-line" 
            class="py-[5px] text-hazy-light max-w-[80%]">{{ message.content.trim() }}</span>
        </div>
    </template>
</template>