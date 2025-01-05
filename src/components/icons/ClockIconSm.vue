<script lang="ts" setup>
import iconConfig from './_icon_config';
import { computed, type ComputedRef } from 'vue';


const props = defineProps<{
    color?: string,
}>()

const stroke: ComputedRef<string> = computed(() => {
    // @ts-ignore
    return iconConfig.strokes[props.color || 'default']
})
</script>
<template>
<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle :class="stroke" cx="8.5" cy="10.0528" r="5.5" stroke="white"/>
    <path :class="stroke" d="M8.31033 6.82866L8.31033 11.7597" stroke="white" stroke-linecap="round"/>
    <path :class="stroke" d="M10.4308 9.86314L8.31032 11.9836" stroke="white" stroke-linecap="round"/>
    <path :class="stroke" d="M6.03444 2.58513C6.03444 2.58513 6.96734 1.4472 8.49996 1.4472C10.0326 1.4472 10.9655 2.58513 10.9655 2.58513" stroke="white" stroke-linecap="round"/>
</svg>
</template>