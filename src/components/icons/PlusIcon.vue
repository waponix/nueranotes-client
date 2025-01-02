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
<svg width="43" height="42" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :class="stroke" d="M21.7766 13L21.7766 29" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    <path :class="stroke" d="M29.7766 21L13.7766 21" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
</svg>
</template>