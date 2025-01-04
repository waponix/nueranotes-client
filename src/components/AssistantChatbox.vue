<script setup lang="ts">
import { nextTick, onMounted, ref, type Ref } from 'vue'

import Request from '@/components/api/Request.vue'
import Convo from '@/components/Convo.vue'

import InputMultiAction from '@/components/fields/InputMultiAction.vue'

import SendIcon from '@/components/icons/SendIcon.vue'
import SweepIcon from '@/components/icons/SweepIcon.vue'

import WriteLoaderAnimatedIcon from '@/components/icons/WriteLoaderAnimatedIcon.vue'

import { useNoteStore } from '@/stores/notes'

const noteStore = useNoteStore()

const searchError: Ref<null|string> = ref(null) 
const userInput: Ref<string> = ref('')

const parseResponse = (response: any) => {
    // @ts-ignore
    noteStore.generalConvo.push({
        role: 'assistant',
        content: response.data.answer,
    })

    noteStore.generalToken = response.data.token
    
    showConvoLoader.value = false
    setTimeout(() => {
        userInput.value = ''
        scrollToBottom()
    }, 250)
}

const showConvoLoader: Ref<boolean> = ref(false)

const scrollToBottom = () => {
    let convo = document.querySelector('#app-ai-convo')
    // @ts-ignore
    convo.scrollTop = convo?.scrollHeight
}

const scrollToTop = () => {
    let convo = document.querySelector('#app-ai-convo')
    // @ts-ignore
    convo.scrollTop = 0
}

const sendQuery = (request: any, field: any) => {
    request.send()
    showConvoLoader.value = true
    setTimeout(() => {
        scrollToBottom()
    }, 250)
    // @ts-ignore
    noteStore.generalConvo.push({
        role: 'user',
        content: userInput.value,
    })
    field.clear()
}

const clearConvo = () => {
    noteStore.clearGeneralConvo()
    setTimeout(() => {
        scrollToTop()
    }, 250)
}

onMounted(async() => {
    await nextTick()
    scrollToBottom()
})

</script>
<template>
<div class="flex flex-col w-[30vw] pl-[25px] pr-[10px] my-[25px] border-l-[1px] border-normal">
    <div class="flex-1"></div>
    <!-- AI chatbox -->
    <PerfectScrollbar 
    id="app-ai-convo" 
    class="flex-initial max-h-[76vh] flex flex-col text-[14px] pr-[15px] overflow-x-hidden">
        <Convo :data="noteStore.generalConvo" />
        <div v-if="showConvoLoader" class="pb-[20px] flex justify-center items-end text-hazy-light">
            <WriteLoaderAnimatedIcon class="mr-[5px]"/>
            <span>just a moment...</span>
        </div>
    </PerfectScrollbar>
    <Request
    @success="parseResponse"
    name="assistant/notes/query"
    :data="{
        query: userInput,
        token: noteStore.generalToken
    }"
    method="POST"
    v-slot="request">
        <InputMultiAction
        @value="v => {
            userInput = v
            scrollToBottom()
        }"
        id="question"
        class="flex-initial mr-[15px]"
        placeholder="Looking for something? Ask away!"
        v-slot="field">
            <a
            @click.prevent="clearConvo" 
            href="">
                <SweepIcon />
            </a>
            <a
            @click.prevent="sendQuery(request, field)" 
            href="">
                <SendIcon />
            </a>
        </InputMultiAction>
    </Request>
</div>
</template>