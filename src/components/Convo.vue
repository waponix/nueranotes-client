<script lang="ts" setup>
import { type MessageType } from './types';
// @ts-ignore
import Markdown from 'vue3-markdown-it'

defineProps<{
    data: MessageType[]
}>()

</script>
<template>
    <template v-for="message in data">
        <div v-if="message.role === 'user'" class="mb-[20px] app-user-message">
            <span
            style="white-space: pre-line" 
            class="float-end py-[5px] px-[20px] rounded-[10px] text-hazy-light bg-darker max-w-[80%]">{{ message.content.trim() }}</span>
        </div>
        <div v-if="message.role === 'assistant'" class="mb-[20px] app-assistant-message">
            <Markdown
            class="prose prose-assistant py-[5px] max-w-[80%]"
            :breaks="true"
            :source="message.content"/>
        </div>
    </template>
</template>