<script lang="ts" setup>
import iconConfig from './_icon_config';
import { computed, type ComputedRef } from 'vue';


const props = defineProps<{
    color?: string,
}>()

const fill: ComputedRef<string> = computed(() => {
    // @ts-ignore
    return iconConfig.fills[props.color || 'default']
})

const stroke: ComputedRef<string> = computed(() => {
    // @ts-ignore
    return iconConfig.strokes[props.color || 'default']
})
</script>
<template>
<svg width="42" height="43" viewBox="0 0 42 43" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect :class="stroke" x="14" y="17.1471" width="14" height="13.1765" rx="2"/>
    <path :class="fill" d="M16.25 14.6765C16.25 13.1577 17.4812 11.9265 19 11.9265H23C24.5188 11.9265 25.75 13.1577 25.75 14.6765H24.25C24.25 13.9862 23.6904 13.4265 23 13.4265H19C18.3096 13.4265 17.75 13.9862 17.75 14.6765H16.25ZM25 17.6765H17H25ZM16.25 17.6765V14.6765C16.25 13.1577 17.4812 11.9265 19 11.9265V13.4265C18.3096 13.4265 17.75 13.9862 17.75 14.6765V17.6765H16.25ZM23 11.9265C24.5188 11.9265 25.75 13.1577 25.75 14.6765V17.6765H24.25V14.6765C24.25 13.9862 23.6904 13.4265 23 13.4265V11.9265Z"/>
    <path :class="stroke" d="M21 22.5V25.5" stroke-width="1.5" stroke-linecap="round"/>
</svg>
</template>