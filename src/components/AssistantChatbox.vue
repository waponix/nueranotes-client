<script setup lang="ts">
import { nextTick, onMounted, ref, type Ref, type ComputedRef, computed } from 'vue'
import router from '@/router'

import Request from '@/components/api/Request.vue'
import Convo from '@/components/Convo.vue'

import InputMultiAction from '@/components/fields/InputMultiAction.vue'

import SendIcon from '@/components/icons/SendIcon.vue'
import SweepIcon from '@/components/icons/SweepIcon.vue'

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
        noteStore.tabs[id].convo = tabConvo
        convo.value = tabConvo
        // @ts-ignore
        noteStore.tabs[id].token = response.data.token 
    } else {
        // @ts-ignore
        noteStore.generalConvo.push({
            role: 'assistant',
            content: response.data.answer,
        })

        convo.value = noteStore.generalConvo

        noteStore.generalToken = response.data.token
    }
    
    
    showConvoLoader.value = false
    setTimeout(() => {
        userInput.value = ''
        scrollToBottom()
    }, 250)
}

const failedResponse = async(response: any) => {
    const id = getNoteId()

    if (id !== null) {
        // @ts-ignore
        let tabConvo = noteStore.tabs[id]?.convo || []
        // @ts-ignore
        tabConvo.push({
            role: 'assistant',
            content: 'Sorry, I am unable to make a response at this moment, please try again.',
        })
        // @ts-ignore
        noteStore.tabs[id].convo = tabConvo
        convo.value = tabConvo
    } else {
        // @ts-ignore
        noteStore.generalConvo.push({
            role: 'assistant',
            content: 'Sorry, I am unable to make a response at this moment, please try again.',
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
        noteStore.tabs[id].convo = tabConvo
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
        noteStore.tabs[id].convo = []
        // @ts-ignore
        noteStore.tabs[id].token = null
    } else {
        noteStore.clearGeneralConvo()
    }

    convo.value = [];
    
    setTimeout(() => {
        scrollToTop()
    }, 250)
}

const convo: Ref<any> = ref([])

onMounted(async() => {
    await nextTick()
    scrollToBottom()

    const id = getNoteId()
    if (getNoteId() !== null) {
        // @ts-ignore
        convo.value = noteStore.tabs[id].convo || [];
    } else {
        convo.value = noteStore.generalConvo;
    }
})

</script>
<template>
<div class="flex flex-col w-[30vw] pl-[25px] pr-[10px] my-[25px] border-l-[1px] border-normal">
    <div class="flex-1"></div>
    <!-- AI chatbox -->
    <PerfectScrollbar 
    id="app-ai-convo" 
    class="flex-initial max-h-[76vh] flex flex-col text-[14px] pr-[15px] overflow-x-hidden">
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
        token: noteStore.generalToken,
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