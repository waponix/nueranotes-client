<script setup lang="ts">
import { computed, nextTick, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import { type TabsType } from '@/components/types'

import BaseLayout from '@/components/layouts/BaseLayout.vue'
import Tabs from '@/components/Tabs.vue'
import Request from '@/components/api/Request.vue'
import Convo from '@/components/Convo.vue'
import Editor from '@/components/Editor.vue'
import AssistantChatbox from '@/components/AssistantChatbox.vue'

import InputIcon from '@/components/fields/InputIcon.vue'
import InputMultiAction from '@/components/fields/InputMultiAction.vue'

import SearchIcon from '@/components/icons/SearchIcon.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import PinIcon from '@/components/icons/PinIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'

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

</script>

<template>
    <BaseLayout>
        <template v-slot:header>
            <Tabs :tabs="tabs"/>
        </template>
        <template v-slot:left-content>
            <div class="flex flex-col w-[70vw] pl-[25px] pr-[10px] mt-[25px]">
                <!-- Note Editor -->
                 <Editor/>
            </div>
        </template>
        <template v-slot:right-content>
            <AssistantChatbox/>
        </template>
    </BaseLayout>
</template>
<style scoped>
.app-note-paper {
    box-shadow: 4px 4px 5px var(--c-darker);
}
</style>
