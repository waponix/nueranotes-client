<script lang="ts" setup>
import {computed, type ComputedRef} from 'vue'
import router from '@/router'
import { useNoteStore } from '@/stores/notes'
import { useNoteCacheStore } from '@/stores/notes_cache'
import moment from 'moment-timezone'
// @ts-ignore
import Markdown from 'vue3-markdown-it'

import Request from './api/Request.vue'

import PinIconThin from './icons/PinIconThin.vue'
import StarIconThin from './icons/StarIconThin.vue'
import TrashIconThin from './icons/TrashIconThin.vue'
import ClockIconSm from './icons/ClockIconSm.vue'


const props = defineProps<{
    title: string,
    content: string,
    id: string,
    starred: boolean,
    pinned: boolean,
    createdAt: number,
    updatedAt: number,
}>()

const updatedAt: ComputedRef<string> = computed(() => {
    return moment(props.updatedAt * 1000).format('MMM DD, YY HH:mm')
})

const openNote = () => {
    const noteStore = useNoteStore()
    noteStore.openTab({
        id: props.id,
        name: props.title,
        url: `/note/${props.id}`,
    })
    router.push({name: 'forward', query: {to: `/note/${props.id}`}})
}

const clearNoteData = () => {
    const noteStore = useNoteStore()
    const noteCacheStore = useNoteCacheStore()

    // TODO: The user's ID is required at this point
    // @ts-ignore
    delete noteCacheStore.noteList[props.id]
    noteStore.closeTab(props.id, true)
}

</script>
<template>
    <a
    @click.stop.prevent="openNote"
    :href="`/note/${id}`"
    class="relative app-note-box bg-normal rounded-[25px] flex flex-col text-hazy-light font-thin py-[20px] border-normal border-[1px]">
        <span 
        class="flex-initial text-light text-[20px] app-note-box-title mx-[20px] pb-[20px] text-nowrap overflow-hidden">
            {{ title }}
        </span>
        <!-- Content container -->
        <Markdown 
        :source="content"
        class="prose prose-assistant flex-auto relative app-note-box-content px-[20px] text-[16px] h-[20vh] overflow-hidden"
        />
        <div class="flex-initial flex items-end app-note-box-actions pt-[10px] px-[20px]">
            <div class="flex-initial grid gap-2 grid-cols-3">
                <a
                @click.prevent.stop
                href="">
                    <PinIconThin />
                </a>
                <a 
                @click.prevent.stop
                href="">
                    <StarIconThin />
                </a>
                
                <Request
                :name="`notes/${id}`"
                method="DELETE"
                @success="clearNoteData"
                v-slot="request"
                >
                <a 
                @click.prevent.stop="request.send()"
                href="">
                    <TrashIconThin />
                </a>
                </Request>
            </div>
            <div class="flex-auto flex justify-end items-center opacity-[80%]">
                <ClockIconSm color="hazy-light" />
                <span class="text-[14px] pl-[5px]">{{ updatedAt }}</span>
            </div>
        </div>
        <div class="note-fade-overlay absolute w-full bottom-[50px] left-[0px] h-[40%] z-[1]"></div>
    </a>
</template>
<style scoped>
.app-note-box {
    box-shadow: 4px 4px 5px var(--c-darker);
}

.app-note-box .note-fade-overlay {
    background-image: linear-gradient(180deg, rgba(30, 42, 36, 0), var(--c-normal), var(--c-normal));
}
</style>