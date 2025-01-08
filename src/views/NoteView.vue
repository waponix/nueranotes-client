<script setup lang="ts">
import { computed, nextTick, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import { type TabsType } from '@/components/types'

import BaseLayout from '@/components/layouts/BaseLayout.vue'
import Tabs from '@/components/Tabs.vue'
import Editor from '@/components/Editor.vue'
import AssistantChatbox from '@/components/AssistantChatbox.vue'
import router from '@/router'

// @ts-ignore
const tabs: ComputedRef<TabsType[]> = computed(() => [
    {
        active: false,
        id: 'foo',
        name: 'User Credentials',
        url: '/',
    },
    {
        active: false,
        id: 'foo',
        name: 'My To Do\'s for the year 2025',
        url: '/',
    }
])

const scrollToBottom = () => {
    let convo = document.querySelector('#app-ai-convo')
    //@ts-ignore
    convo.scrollTop = convo?.scrollHeight
}

onMounted(async() => {
    showPageLoader.value = true
    await nextTick()
    scrollToBottom()
    showPageLoader.value = false
})

const showPageLoader: Ref<boolean> = ref(true)
const editorContent: Ref<string> = ref('')
const editorTitle: Ref<string> = ref('')

// @ts-ignore
const getContents = ([title, content]) => {
    editorContent.value = content;
    editorTitle.value = title;
}

const noteContents: ComputedRef<string> = computed(() => {
    return `[Title: ${editorTitle.value}]\n[Content: ${editorContent.value}]`
})

</script>

<template>
    <BaseLayout>
        <template v-slot:header>
            <Tabs :tabs="tabs"/>
        </template>
        <template v-slot:left-content>
            <div class="flex flex-col w-[70vw] pl-[25px] pr-[10px] mt-[25px]">
                <!-- Note Editor -->
                 <Editor
                 @update="getContents"
                 />
            </div>
        </template>
        <template v-slot:right-content>
            <AssistantChatbox
            :role="2"
            :shared-note="noteContents"
            placeholder="Send your thoughts"
            />
        </template>
    </BaseLayout>
</template>
<style scoped>
.app-note-paper {
    box-shadow: 4px 4px 5px var(--c-darker);
}
</style>
