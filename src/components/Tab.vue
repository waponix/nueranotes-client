<script lang="ts" setup>
import { computed, type ComputedRef } from 'vue'
import { RouterLink } from 'vue-router'
import { useNoteStore } from '@/stores/notes'

import HomeIcon from './icons/HomeIcon.vue'

import TabConvexRight from './graphic/TabConvexRight.vue'
import TabConvexLeft from './graphic/TabConvexLeft.vue'
import CloseIconSm from './icons/CloseIconSm.vue'
import router from '@/router'

const props = defineProps<{
    active: boolean,
    name: string,
    id: string,
    url: string,
}>()

const noteStore = useNoteStore()

const classes: ComputedRef<string[]> = computed(() => {
    let classes = []

    if (props.active === true) {
        classes.push('active')
    } else {
        classes.push(...['border-r-1 border-dark'])
    }

    if (props.id === '--home') {
        classes.push(...[
            'rounded-tr-[10px]',
            'min-w-[100px]',
            'flex-initial',
        ])
    } else {
        classes.push(...[
            'rounded-t-[10px]',
            'flex-auto',
            'pl-[15px]',
        ])
    }

    return classes
})

const closeTab = (id: any) => {
    noteStore.closeTab(id)
    const tabCount = noteStore.openedTabs.length

    if (props.active) {
        let url = '/'
        if (tabCount > 0) {
            // @ts-ignore
            url = noteStore.openedTabs[tabCount - 1].url
        }
        router.push(url)
    }
}
</script>
<template>
<label 
:for="`app-tab-link-${id}`" 
:class="classes"
class="app-tab block h-full relative text-[12px] text-hazy-light z-1 pr-[5px]">
    <TabConvexLeft 
    v-if="active" 
    color="dark"
    class="absolute left-[-11px] bottom-[-1px] z-2"/>
    <TabConvexRight 
    v-if="active" 
    color="dark"
    class="absolute right-[-10px] bottom-[-1px] z-2"/>
    <RouterLink 
    :id="`app-tab-link-${id}`" 
    :to="url"
    class="relative flex items-center justify-center h-full z-1">
        <div v-if="id === '--home'"
        class="flex justify-center"
        >
            <HomeIcon />
        </div>
        <span v-else>{{ name }}</span>
        <a
        class="hover:bg-dark rounded-[10px] ml-[10px]" 
        @click.prevent="closeTab(id)" v-if="id !== '--home'" 
        href="">
            <CloseIconSm />
        </a>
    </RouterLink>
</label>
</template>
<style scoped>
.app-tab.active {
    background-color: var(--c-dark)
}
</style>