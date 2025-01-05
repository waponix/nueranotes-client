<script lang="ts" setup>
import {computed, type ComputedRef} from 'vue'
import router from '@/router'
import { useNoteStore } from '@/stores/notes'
import moment from 'moment-timezone'

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
    return moment(props.createdAt * 1000).format('MMM DD, Y')
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
</script>
<template>
    <a
    @click.stop.prevent="openNote"
    :href="`/note/${id}`"
    class="app-note-box bg-normal rounded-[10px] flex flex-col text-hazy-light font-thin py-[20px] border-normal border-[1px]">
        <span 
        class="flex-initial app-note-box-title mx-[20px] pb-[20px] text-nowrap overflow-x-hidden h-[44px]">
            {{ title }}
        </span>
        <span 
        class="flex-auto relative app-note-box-content px-[20px] text-[12px] h-[20vh] overflow-hidden" 
        style="white-space: pre-line" >
            {{ content }}
            <div class="note-fade-overlay absolute w-full bottom-[0px] left-[0px] h-[25px] z-[1]"></div>
        </span>
        <div class="flex-initial flex items-end app-note-box-actions pt-[10px] px-[20px]">
            <div class="flex-auto flex justify-start items-end opacity-[50%]">
                <ClockIconSm color="hazy-light" />
                <span class="text-[11px] pl-[5px]">{{ updatedAt }}</span>
            </div>
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
                <a 
                @click.prevent.stop
                href="">
                    <TrashIconThin />
                </a>
            </div>
        </div>
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