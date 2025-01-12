<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import { useNoteStore } from '@/stores/notes'
import { useNoteCacheStore } from '@/stores/notes_cache'
import router from '@/router'
import Request from './api/Request.vue'
// @ts-ignore
import Markdown from 'vue3-markdown-it'

import EditorToolbox from './EditorToolbox.vue'

import WriteLoaderAnimatedIcon from './icons/WriteLoaderAnimatedIcon.vue'

const untitled = 'untitled'
const id: Ref<string> = ref(router.currentRoute.value.params?.id?.toString() || untitled)

const noteStore = useNoteStore()
const noteStoreCache = useNoteCacheStore()

// @ts-ignore
const title: Ref<string> = ref(noteStore.tabs[id.value]?.['name'] || 'Untitled')
const content: Ref<string> = ref('')
const displayTitle: Ref<string> = ref('')
const displayContent: Ref<string> = ref('')
const method: Ref<string> = ref('POST')

const url: Ref<string> = ref('notes')

const updateTitle = (el: Event, request: any) => {
    // @ts-ignore
    title.value = el?.target?.innerText.trim()
    // @ts-ignore
    noteStore.updateTabContent(id.value, {name: title.value || 'Untitled'})
    request.send()
    emits('update', [title.value, content.value])
    saving.value = true
}

const updateContent = (el: Event, request: any) => {
    // @ts-ignore
    content.value = el?.target?.innerText
    // @ts-ignore
    noteStore.updateTabContent(id.value, {content: content.value})
    request.send()
    emits('update', [title.value, content.value])
    saving.value = true
    toolbox.value.show = false
}

const load = (response: any) => {
    const data = response.data
    title.value = data.title
    content.value = data.content
    id.value = data.id
    showLoader.value = false
    saving.value = false

    // @ts-ignore
    noteStore.updateTabContent(id.value, {
        name: data.title,
        content: data.content,
    })
    displayTitle.value = title.value
    displayContent.value = content.value
    emits('update', [title.value, content.value])
}

const fallback = (response: any) => {
    router.push({name: 'home'})
}

const emits = defineEmits<{
    (e: 'update', value: [string, string]): void;
}>()

const save = (response: any) => {
    const data = response.data

    if (id.value === untitled) {
        // open new tab for the newly created note,
        // to replace the old one

        // @ts-ignore
        const untitledTab = noteStore.tabs[untitled]
        
        noteStore.updateTabContent(untitled, {
            convo: [], 
            token: null,
            name: 'Untitled',
            content: '',
        })
        noteStore.closeTab(id.value)
        noteStore.openTab({
            id: data.id,
            name: data.title,
            url: `/note/${data.id}`,
            convo: untitledTab.convo, 
            token: untitledTab.token,
        })

        id.value = data.id
        method.value = 'PUT'
        url.value = `notes/${id.value}`
        router.push({name: 'update_note', params: { id: data.id }})
    }

    // update the note list cache
    // @ts-ignore
    noteStoreCache.noteList[data.id] = data;

    saving.value = false
}

const saving: Ref<boolean> = ref(false)

const showLoader: Ref<boolean> = ref(false)

const sendOnMount: Ref<boolean> = ref(false)

const toggleEdit: Ref<boolean> = ref(false);

const toggleEditor = () => {
    toggleEdit.value = !toggleEdit.value
    displayContent.value = content.value
    displayTitle.value = title.value
    
    if (toggleEdit.value === false) {
        toolbox.value.show = false
        selectedText.value = ''
    }
}

const selectionRange: Ref<null|Range> = ref(null)
const toolbox: Ref<any> = ref({
    show: false,
    top: 0,
    left: 0,
})

const scrollY: Ref<number> = ref(0)
const getScrollY = (e: Event) => {
    // @ts-ignore
    scrollY.value = e.target.scrollTop
}

const selectedText: Ref<string> = ref('')

const showTool = (e: Event) => {
    const selection = window.getSelection()
    selectedText.value = selection?.toString() ?? ''
    toolbox.value.show = selectedText.value.trim() !== ''

    if (selection?.rangeCount ?? 0 > 0) {
        const range = selection?.getRangeAt(0)
        if (range && (selection?.toString() ?? '').trim() !== '') {
            selectionRange.value = range;
             // @ts-ignore
            const rect: any = e.target.getBoundingClientRect()
            // @ts-ignore
            toolbox.value.top = window.scrollY + rect.bottom
            // @ts-ignore
            toolbox.value.top = scrollY.value + 50
            toolbox.value.left = 50
            toolbox.value.show = true
        }
    }
}

const replaceWithAnswer = (answer: string, request: any) => {
    selectionRange.value?.deleteContents()
    selectionRange.value?.insertNode(document.createTextNode(answer))
    window.getSelection()?.removeAllRanges()
    // @ts-ignore
    window.getSelection()?.addRange(selectionRange.value)
    selectionRange.value = null
    selectedText.value = ''
    toolbox.value.show = false

    displayContent.value = (document.querySelector('.app-note-editable-content')?.innerHTML ?? displayContent.value).trim()
    content.value = displayContent.value
    saving.value = true;
    noteStore.updateTabContent(id.value, {
        title: title.value,
        content: content.value,
    })
    request.send();
}

const showToolbox: ComputedRef<boolean> = computed(() => toolbox.value.show)

onMounted(async() => {
    await nextTick()
    noteStore.openTab({
        id: id.value,
        // @ts-ignore
        name: noteStore.tabs[id.value]?.name ?? title.value,
        url: `/note/${id.value}`
    })

    id.value = router.currentRoute.value.params?.id?.toString() || untitled

    if (id.value !== untitled) {
        method.value = 'PUT'
        url.value = `notes/${id.value}`
    }

    // @ts-ignore
    if (id.value !== untitled && typeof noteStore.tabs[id.value].content === 'undefined') {
        // @ts-ignore
        sendOnMount.value = true
        showLoader.value = true
    } else {
        sendOnMount.value = false
        showLoader.value = false
    }

    // @ts-ignore
    displayTitle.value = noteStore.tabs[id.value]?.name ?? title.value
    // @ts-ignore
    displayContent.value = noteStore.tabs[id.value]?.content ?? content.value

    title.value = displayTitle.value
    content.value = displayContent.value

    emits('update', [title.value, content.value])

    if (router.currentRoute.value.name === 'create_note' && displayContent.value === '') {
        toggleEdit.value = true
    }
})

</script>
<template>
    <Request
    v-if="sendOnMount"
    :name="`notes/${id}`"
    :send-on-mount="true"
    @success="load"
    @error="fallback"
    />
    <PerfectScrollbar
    @ps-scroll-y="getScrollY"
    class="flex-1 relative w-full overflow-x-hidden pr-[15px] max-h-[94vh]">
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
            class="flex flex-col app-note-paper bg-hazy-light min-h-full w-full rounded-t-[25px] px-[50px] pb-[100px] text-dark">
                <!-- Loader animation -->
                <div
                v-if="showLoader" 
                class="flex flex-1 justify-center items-center">
                    <WriteLoaderAnimatedIcon color="normal" background="hazy-light"/>
                </div>
                <!-- Note title -->
                <span
                v-if="!showLoader"
                id="app-note-title"
                class="flex-initial overflow-y-visible bg-transparent resize-none text-[30px] outline-none pb-[25px] pt-[50px] border-b-[1px] border-dark" 
                contenteditable
                style="white-space: pre-line" 
                rows="1"
                @input="(el: Event) => updateTitle(el, request)">
                    {{ displayTitle }}
                </span>
                <div v-if="!showLoader" class="sticky top-[0] bg-hazy-light pb-[25px] flex flex-row-reverse">
                    <button 
                    @click.stop="toggleEditor"
                    class="bg-dark flex-initial hover:bg-gradient-to-b from-dark to-darker text-left text-hazy-light pt-[5px] pb-[2.5px] px-[15px] min-w-[150px] rounded-b-[10px]"
                    >{{ toggleEdit ? 'Preview mode' : 'Edit mode' }}</button>
                    <div class="flex-1"></div>
                    <div v-if="saving" class="app-note-paper-status flex-initial flex items-end">
                        <WriteLoaderAnimatedIcon color="normal" background="hazy-light"/>
                        <span class="pl-[5px]">
                            Saving...
                        </span>
                    </div>
                </div>
                <!-- Note content -->
                <Markdown
                v-if="!showLoader && !toggleEdit"
                :source="content"
                class="app-note-content-preview flex-auto prose prose-editor"
                />
                <span
                v-if="!showLoader && toggleEdit"
                id="app-note-content"
                style="white-space: pre-line" 
                class="app-note-editable-content flex-auto text-dark outline-none bg-transparent resize-none"
                contenteditable
                @mouseup="showTool"
                @input="(el: Event) => updateContent(el, request)"
                @change="(el: Event) => updateContent(el, request)">
                    {{ displayContent }}
                </span>
                <form
                id="create-note-form"
                class=""
                @submit.prevent>
                </form>
            </div>
            <EditorToolbox 
            @accept="(answer: string) => replaceWithAnswer(answer, request)"
            v-if="showToolbox"
            :top="toolbox.top"
            :left="toolbox.left"
            :selection="selectedText"
            :title="title"
            :content="content"    
            />
        </Request>
    </PerfectScrollbar>
</template>
<style scoped>
.app-note-paper-status {
    animation: pulse 1.5s infinite;
    animation-timing-function: ease;
}

.app-note-paper {
    box-shadow: 4px 4px 5px var(--c-darker);
}

@keyframes pulse {
    0% {
        opacity: 10%;
    }
    50% {
        opacity: 50%;
    }
    100% {
        opacity: 10%
    }
}
</style>