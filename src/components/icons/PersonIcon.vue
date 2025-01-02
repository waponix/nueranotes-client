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
    <path :class="stroke" d="M14 27.0281C14 23.7765 16.6359 21.1406 19.8875 21.1406H22.1125C25.3641 21.1406 28 23.7765 28 27.0281V27.0281C28 27.841 27.341 28.5 26.5281 28.5H15.4719C14.659 28.5 14 27.841 14 27.0281V27.0281Z" stroke-width="1.5"/>
    <rect :class="stroke" x="17" y="14.5" width="8" height="6.54164" rx="3.27082" stroke-width="1.5"/>
</svg>
</template>