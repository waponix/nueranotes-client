<script setup lang="ts">
import { computed, nextTick, onMounted, ref, type ComputedRef, type Ref } from 'vue'

import BaseLayout from '@/components/layouts/BaseLayout.vue'
import Tabs from '@/components/Tabs.vue'
import AssistantChatbox from '@/components/AssistantChatbox.vue'
import Request from '@/components/api/Request.vue'
import Note from '@/components/Note.vue'
import InputIcon from '@/components/fields/InputIcon.vue'

import SearchIcon from '@/components/icons/SearchIcon.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import PinIcon from '@/components/icons/PinIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'

import WriteLoaderAnimatedIcon from '@/components/icons/WriteLoaderAnimatedIcon.vue'

import { useNoteStore } from '@/stores/notes'
import { useNoteCacheStore } from '@/stores/notes_cache'
import router from '@/router'

const noteStore = useNoteStore()
const noteCacheStore = useNoteCacheStore()

const notes: Ref<any> = ref([])

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

const loadNotes = (response: any) => {
    showLoader.value = false
    notes.value = response.data
    noteCacheStore.noteList = notes.value
}

const showLoader: Ref<boolean> = ref(false)

const classes: ComputedRef<string[]> = computed(() => {
    let classes = []

    if (showLoader.value) {
        classes.push('hidden')
    }

    return classes;
})

onMounted(async() => {
    showLoader.value = true;
    await nextTick()
    scrollToBottom()
    if (Object.keys(noteCacheStore.noteList).length > 0) {
        notes.value = noteCacheStore.noteList
        showLoader.value = false
    } else {
        showLoader.value = true
    }
})

</script>

<template>
    <BaseLayout>
        <template v-slot:header>
            <Tabs/>
        </template>
        <template v-slot:left-content>
            <div class="flex flex-col w-[70vw] pl-[25px] pr-[10px] mt-[25px] overflow-x-visible">
                <!-- search field and action buttons -->
                <div class="app-action-box flex items-center flex-initial w-full pb-[20px]">
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
                        <a @click.prevent href="">
                            <PinIcon />
                        </a>
                        <a @click.prevent href="">
                            <StarIcon />
                        </a>
                    </div>
                </div>
                <!-- loading animation -->
                <div
                v-if="showLoader"
                class="flex-auto w-full h-full flex items-center justify-center text-light">
                    <div class="flex items-end">
                        <WriteLoaderAnimatedIcon />
                        <span class="ml-[5px]">Loading your notes...</span>
                    </div>
                </div>
                 <!-- main content -->
                <PerfectScrollbar
                :class="classes"
                class="flex-initial flex max-h-[86vh] flex-wrap">
                    <Request
                    name="notes"
                    v-slot="request"
                    :send-on-mount="true"
                    @success="loadNotes"
                    />
                    <Note 
                    v-for="note of notes" 
                    :title="note.title"
                    :content="note.content"
                    :id="note.id"
                    :pinned="note.pinned"
                    :starred="note.starred"
                    :created-at="note.created_at"
                    :updated-at="note.updated_at"
                    class="flex-initial mb-[25px] mr-[25px] w-[calc(33.33%-25px)]"
                    />
                </PerfectScrollbar>
            </div>
        </template>
        <template v-slot:right-content>
            <AssistantChatbox
            :role="1"
            placeholder="Need something? Ask away!"/>
        </template>
    </BaseLayout>
</template>
