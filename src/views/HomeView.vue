<script setup lang="ts">
import { nextTick, onMounted, ref, type Ref } from 'vue'

import BaseLayout from '@/components/layouts/BaseLayout.vue'
import Tabs from '@/components/Tabs.vue'
import AssistantChatbox from '@/components/AssistantChatbox.vue'

import InputIcon from '@/components/fields/InputIcon.vue'

import SearchIcon from '@/components/icons/SearchIcon.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import PinIcon from '@/components/icons/PinIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'

import WriteLoaderAnimatedIcon from '@/components/icons/WriteLoaderAnimatedIcon.vue'

import { useNoteStore } from '@/stores/notes'
import router from '@/router'

const noteStore = useNoteStore()

const searchError: Ref<null|string> = ref(null)

const scrollToBottom = () => {
    let convo = document.querySelector('#app-ai-convo')
    //@ts-ignore
    convo.scrollTop = convo?.scrollHeight
}

const openNewNoteTab = () => {
    noteStore.openTab({
        id: 'untitled',
        name: 'Untitled',
        url: '/note/untitled',
    })

    router.push('/note/untitled')
}

onMounted(async() => {
    await nextTick()
    scrollToBottom()
})

</script>

<template>
    <BaseLayout>
        <template v-slot:header>
            <Tabs/>
        </template>
        <template v-slot:left-content>
            <div class="flex flex-col w-[70vw] px-[25px] mt-[25px]">
                <!-- search field and action buttons -->
                <div class="app-action-box flex items-center flex-initial w-full">
                    <InputIcon
                    id="app-note-search"
                    :error="searchError"
                    class="max-w-[400px]"
                    >
                        <SearchIcon />
                    </InputIcon>
                    <div class="app-action-buttons flex flex-initial px-[25px]">
                        <a @click.prevent="openNewNoteTab" href="">
                            <PlusIcon />
                        </a>
                        <!-- <a @click.prevent href="">
                            <PinIcon />
                        </a>
                        <a @click.prevent href="">
                            <StarIcon />
                        </a> -->
                    </div>
                </div>
                 <!-- main content -->
                <div class="flex-1 grid gap-[25px] grid-cols-3 pt-[25px]">
                    
                </div>
            </div>
        </template>
        <template v-slot:right-content>
            <AssistantChatbox/>
        </template>
    </BaseLayout>
</template>
