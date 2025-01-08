<script setup lang="ts">
import { nextTick, onMounted, ref, type Ref, type ComputedRef, computed } from 'vue'
import router from '@/router'

import Request from '@/components/api/Request.vue'
import Convo from '@/components/Convo.vue'

import InputMultiAction from '@/components/fields/InputMultiAction.vue'

import SendIcon from '@/components/icons/SendIcon.vue'
import SweepIcon from '@/components/icons/SweepIcon.vue'
import MascotIcon from './icons/MascotIcon.vue'

import WriteLoaderAnimatedIcon from '@/components/icons/WriteLoaderAnimatedIcon.vue'

import { useNoteStore } from '@/stores/notes'

const props = defineProps<{
    placeholder: string,
    sharedNote?: string,
    role: number,
}>()

const noteStore = useNoteStore()

const userInput: Ref<string> = ref('')

const getNoteId = () => {
    return router.currentRoute.value.params?.id ?? null;
}

const parseResponse = (response: any) => {
    const id = getNoteId()
    if (id !== null) {
        // @ts-ignore
        let tabConvo = noteStore.tabs[id].convo || []
        // @ts-ignore
        tabConvo.push({
            role: 'assistant',
            content: response.data.answer,
        })
        // @ts-ignore
        noteStore.updateTabContent(id, {
            convo: tabConvo,
            token: response.data.token,
        })
        convo.value = tabConvo
    } else if (router.currentRoute.value.name === 'create_note') {
        // @ts-ignore
        let tabConvo = noteStore.tabs[untitled].convo || []
        // @ts-ignore
        tabConvo.push({
            role: 'assistant',
            content: response.data.answer,
        })
        noteStore.updateTabContent(untitled, {
            convo: tabConvo,
            token: response.data.token,
        })
        convo.value = tabConvo
    } else {
        // @ts-ignore
        noteStore.generalConvo.push({
            role: 'assistant',
            content: response.data.answer,
        })

        convo.value = noteStore.generalConvo

        noteStore.generalToken = response.data.token
    }

    convoToken.value = response.data.token
    
    showConvoLoader.value = false
    setTimeout(() => {
        userInput.value = ''
        scrollToBottom()
    }, 250)
}

const failedResponse = async(response: any) => {
    const id = getNoteId()
    const sorryMessage: string = 'Sorry, I am unable to make a response at this moment, please try again.'

    if (id !== null) {
        // @ts-ignore
        let tabConvo = noteStore.tabs[id]?.convo || []
        // @ts-ignore
        tabConvo.push({
            role: 'assistant',
            content: sorryMessage,
        })
        // @ts-ignore
        noteStore.updateTabContent(id, {convo: tabConvo})
        convo.value = tabConvo
    } else if (router.currentRoute.value.name === 'create_note') {
        // @ts-ignore
        let tabConvo = noteStore.tabs[untitled]?.convo || []
        // @ts-ignore
        tabConvo.push({
            role: 'assistant',
            content: sorryMessage,
        })
        // @ts-ignore
        noteStore.updateTabContent(untitled, {convo: tabConvo})
        convo.value = tabConvo
    } else {
        // @ts-ignore
        noteStore.generalConvo.push({
            role: 'assistant',
            content: sorryMessage,
        });
        convo.value = noteStore.generalConvo
    }
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
    

    const id = getNoteId()
    if (id !== null) {
        // @ts-ignore
        let tabConvo = noteStore.tabs[id]?.convo || []
        // @ts-ignore
        tabConvo.push({
            role: 'user',
            content: userInput.value,
        })
        // @ts-ignore
        noteStore.updateTabContent(id, {convo: tabConvo})
        convo.value = tabConvo
    } else if (router.currentRoute.value.name === 'create_note') {
        // @ts-ignore
        let tabConvo = noteStore.tabs[untitled]?.convo || []
        // @ts-ignore
        tabConvo.push({
            role: 'user',
            content: userInput.value,
        })
        // @ts-ignore
        noteStore.updateTabContent(untitled, {convo: tabConvo})
        convo.value = tabConvo
    } else {
        // @ts-ignore
        noteStore.generalConvo.push({
            role: 'user',
            content: userInput.value,
        })
        convo.value = noteStore.generalConvo
    }

    field.clear()
}

const clearConvo = () => {
    const id = getNoteId()
    if (id !== null) {
        // @ts-ignore
        noteStore.updateTabContent(id, {
            convo: [],
            token: null,
        })
    }  else if (router.currentRoute.value.name === 'create_note') {
        // @ts-ignore
        noteStore.updateTabContent(untitled, {
            convo: [],
            token: null,
        })
    } else {
        noteStore.clearGeneralConvo()
    }

    convo.value = [];
    convoToken.value = null;
    
    setTimeout(() => {
        scrollToTop()
    }, 250)
}

const convo: Ref<any> = ref([])
const convoToken: Ref<null|string> = ref(null)

const untitled: string = 'untitled'

onMounted(async() => {
    await nextTick()
    scrollToBottom()

    const id = getNoteId()
    if (getNoteId() !== null) {
        // @ts-ignore
        convo.value = noteStore.tabs[id].convo || [];
        // @ts-ignore
        convoToken.value = noteStore.tabs[id].token || null;
    } else if (router.currentRoute.value.name === 'create_note') {
        // @ts-ignore
        convo.value = noteStore.tabs[untitled].convo || [];
        // @ts-ignore
        convoToken.value = noteStore.tabs[untitled].token || null;
    } else {
        convo.value = noteStore.generalConvo;
        convoToken.value = noteStore.generalToken;
    }
})

</script>
<template>
<div class="relative flex flex-col w-[30vw] pl-[25px] pr-[10px] my-[25px] border-l-[1px] border-normal z-1">
    <div v-if="!convo.length" class="absolute opacity-[20%] top-0 left-0 w-full h-[80vh] flex flex-col justify-center items-center">
        <MascotIcon color="light"/>
        <span class="text-light italic text-center font-thin">"Hi There! I am your AI companion<br> and I am always ready to help"</span>
    </div>
    <div class="flex-1"></div>
    <!-- AI chatbox -->
    <PerfectScrollbar 
    id="app-ai-convo" 
    class="flex-initial relative max-h-[76vh] flex flex-col pr-[15px] overflow-x-hidden">
        <Convo :data="convo" />
        <div v-if="showConvoLoader" class="pb-[20px] flex justify-center items-end text-hazy-light">
            <WriteLoaderAnimatedIcon class="mr-[5px]"/>
            <span>just a moment...</span>
        </div>

    </PerfectScrollbar>
    <Request
    @success="parseResponse"
    @error="failedResponse"
    name="assistant/notes/query"
    :data="{
        query: userInput,
        token: convoToken,
        role: role,
        note: sharedNote,
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
        :placeholder="placeholder"
        v-slot="field">
            <a
            @click.prevent.stop="clearConvo" 
            href="">
                <SweepIcon />
            </a>
            <a
            @click.prevent.stop="sendQuery(request, field)" 
            href="">
                <SendIcon />
            </a>
        </InputMultiAction>
    </Request>
</div>
</template>