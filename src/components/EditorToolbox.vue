<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import InputIcon from './fields/InputIcon.vue'

import SendIcon from './icons/SendIcon.vue'
import AcceptPasteIcon from './icons/AcceptPasteIcon.vue'
import RefreshIcon from './icons/RefreshIcon.vue'
import WriteLoaderAnimatedIcon from './icons/WriteLoaderAnimatedIcon.vue'

// @ts-ignore
import Markdown from 'vue3-markdown-it'

import Request from './api/Request.vue'

const props = defineProps<{
    top: number,
    left: number,
    selection: string,
    title: string,
    content: string,
}>()

const emits = defineEmits<{
    (e: 'answer', value: string): void;
    (e: 'accept', value: string): void;
}>()

const showLoader: Ref<boolean> = ref(false)
const showAnswer: Ref<boolean> = ref(false)
const userInput: Ref<string> = ref('')
const answer: Ref<string> = ref('')
const sharedNote: Ref<string> = ref(`[Title: ${props.title}]\n[Content: ${props.content}]`)

const receiveAnswer = (response: any) => {
    answer.value = response.data.answer
    showLoader.value = false
    emits('answer', answer.value)
}

const failedToAnswer = (response: any) => {
    answer.value = props.selection
    showLoader.value = false
}

const sendQuery = (request: any) => {
    request.send()
    showLoader.value = true
    showAnswer.value = true
}
</script>
<template>
    <!-- input -->
    <Request
    @success="receiveAnswer"
    @failed="failedToAnswer"
    name="assistant/notes/query"
    :data="{
        query: `I am highlighting a part of the note content which is this text '${selection}'` + 
        `\n. I need you to strictly follow what is being instructed in this phrase '${userInput}' and apply it to the highlighted text, ` +
        `if the instruction is not clear and impossible to do you must respond back with the original text instead.` +
        `\n Focus your answer on the highlighted text.` +
        `\n Answer only with the modified or original text.`,
        token: null,
        role: 2,
        note: sharedNote,
    }"
    method="POST"
    v-slot="request"
    >
    <div
    class="app-editor-toolbox bg-dark rounded-[10px] border-[2px] border-normal absolute flex flex-col py-[20px] min-w-[300px] max-w-[1000px] z-5"
    :style="[`top: ${top}px`, `left: ${left}px`]"
    >
        <!-- preview -->
        <div class="rounded-[10px] mb-[20px] text-hazy-light">
            <p class="text-light italic mb-[10px] px-[20px]">Your selection:</p>
            <PerfectScrollbar
            @scroll.stop
            class="overflow-x-hidden max-h-[200px] align-middle pl-[20px] pr-[5px] mr-[5px]">
                <div class="bg-darker mr-[10px] rounded-[10px] p-[10px]">
                    <span
                    style="white-space: pre-line" 
                    class="opacity-[50%]">
                        {{ selection }}
                    </span>
                </div>
            </PerfectScrollbar>
         </div>
        <form action=""
        @submit.prevent="sendQuery(request)"
        >
            <InputIcon
            @value="val => userInput = val"
            id="editor-toolbox-input"
            name="editor-toolbox-input"
            placeholder="Give an instruction (e.g.: Turn a list into a table)"
            :error="null"
            class="px-[20px]"
            >
                <SendIcon></SendIcon>
            </InputIcon>
        </form>
        <div 
        v-if="showAnswer"
        class="rounded-[10px] mb-[20px] text-hazy-light mt-[20px]">
            <p class="text-light italic mb-[10px] px-[20px]">Result:</p>
            <PerfectScrollbar
            @scroll.stop
            class="overflow-x-hidden max-h-[200px] align-middle pl-[20px] pr-[5px] mr-[5px]">
                <div 
                class="bg-darker mr-[10px] rounded-[10px] p-[10px]">
                    <div
                    v-if="showLoader" 
                    class="flex justify-center align-center">
                        <WriteLoaderAnimatedIcon 
                        class="my-[50px]"
                        />
                    </div>
                    <Markdown 
                    v-else
                    :source="answer"
                    class="prose prose-assistant"
                    />
                </div>
            </PerfectScrollbar>
        </div>
        <div 
        v-if="showAnswer && !showLoader"
        class="app-note-editor-toolbox-answer-toolbox flex justify-center">
            <a 
            @click.prevent.stop="emits('accept', answer)"
            href="">
                <AcceptPasteIcon color="light"/>
            </a>
            <a
            @click.prevent.stop="sendQuery(request)"
            href="">
                <RefreshIcon color="light"/>
            </a>
        </div>
    </div>
    </Request>
</template>
<style scoped>
.app-editor-toolbox {
    box-shadow: 0px 0px 10px 5px var(--c-normal);
}
</style>