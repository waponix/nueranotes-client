<script lang="ts" setup>
import { computed, type ComputedRef } from 'vue'
import { type TabsType } from './types'
import Tab from './Tab.vue'
import router from '@/router'
import { useNoteStore } from '@/stores/notes'

const noteStore = useNoteStore()

const tabs: ComputedRef<TabsType[]> = computed(() => [
    {
        active: router.currentRoute.value.name === 'home',
        id: '--home',
        url: '/',
        name: '',
    },
    // @ts-ignore
    ...noteStore.openedTabs
])

</script>
<template>
    <div 
    id="app-tabs"
    class="flex items-center">
        <Tab 
        v-for="tab of tabs" 
        :active="tab.active"
        :name="tab.name"
        :id="tab.id"
        :url="tab.url"/>
    </div>
</template>