<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue'
import { useNoteStore } from '@/stores/notes'
import router from '@/router'
import Request from './api/Request.vue'

import WriteLoaderAnimatedIcon from './icons/WriteLoaderAnimatedIcon.vue'

const untitled = 'untitled'
const id: Ref<string> = ref(router.currentRoute.value.params?.id?.toString() || untitled)

const noteStore = useNoteStore()

// @ts-ignore
const title: Ref<string> = ref(noteStore.tabs[id.value]?.['name'] || 'Untitled')
const content: Ref<string> = ref('')
const method: Ref<string> = ref('POST')

const url: Ref<string> = ref('notes')

const updateTitle = (el: Event, request: any) => {
    // @ts-ignore
    title.value = el?.target?.innerText.trim()
    // @ts-ignore
    noteStore.tabs[id.value].name = title.value || 'Untitled'
    request.send()
}

const updateContent = (el: Event, request: any) => {
    // @ts-ignore
    content.value = el?.target?.innerText
    request.send()
}

const load = (response: any) => {
    const data = response.data
    title.value = data.title
    content.value = data.content
    id.value = data.id
    showLoader.value = false
    // @ts-ignore
    noteStore.tabs[id.value].name = data.title
}

const fallback = (response: any) => {
    router.push({name: 'home'})
}

const save = (response: any) => {
    if (id.value === untitled) {
        // open new tab for the newly created note,
        // to replace the old one
        const data = response.data

        noteStore.closeTab(id.value)
        noteStore.openTab({
            id: data.id,
            name: data.title,
            url: `/note/${data.id}`
        })

        id.value = data.id
        method.value = 'PUT'
        url.value = `notes/${id.value}`
        router.push({name: 'update_note', params: { id: data.id }})
    }
}

const showLoader: Ref<boolean> = ref(false)

const sendOnMount: Ref<boolean> = ref(false)

onMounted(() => {
    id.value = router.currentRoute.value.params?.id?.toString() || untitled

    if (id.value !== untitled) {
        sendOnMount.value = true
        showLoader.value = true
        method.value = 'PUT'
        url.value = `notes/${id.value}`
        // @ts-ignore
        noteStore.tabs[id.value].name = '...'
    }

    noteStore.openTab({
        id: id.value,
        name: title.value,
        url: `/note/${id.value}`
    })
})

</script>
<template>
    <!-- Loader animation -->
    <div
    v-if="showLoader" 
    class="flex flex-1 justify-center items-center">
        <WriteLoaderAnimatedIcon />
    </div>
    <Request
    v-if="sendOnMount"
    :name="`notes/${id}`"
    :send-on-mount="true"
    @success="load"
    @error="fallback"
    />
    <PerfectScrollbar
    v-if="!showLoader"
    class="flex-1 w-full overflow-x-hidden pr-[15px] max-h-[92.74vh]">
        <Request
        @success="save"
        :name="url"
        :method="method"
        :delay="5000"
        :data="{
            title,
            content,
        }"
        v-slot="request"
        >
            <div
            class="flex flex-col app-note-paper bg-normal min-h-full w-full rounded-t-[25px] px-[50px] pt-[50px] pb-[100px] text-light">
                <!-- Note title -->
                <span
                id="app-note-title"
                class="flex-initial overflow-y-visible bg-transparent resize-none text-[24px] outline-none font-thin pb-[25px] mb-[25px] border-b-[1px] border-dark" 
                contenteditable
                style="white-space: pre-line" 
                rows="1"
                @input="(el: Event) => updateTitle(el, request)">
                    {{ title }}
                </span>
                <!-- Note content -->
                <span
                id="app-note-content"
                style="white-space: pre-line" 
                class="flex-auto outline-none font-thin bg-transparent resize-none"
                contenteditable
                @input="(el: Event) => updateContent(el, request)">
                    {{ content }}
                </span>
                <form
                id="create-note-form"
                class=""
                @submit.prevent>
                </form>
            </div>
        </Request>
    </PerfectScrollbar>
</template>