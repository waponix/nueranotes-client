<script lang="ts" setup>
import iconConfig from '../icons/_icon_config';
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
<svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :class="stroke" d="M15.5 10L9.49995 16" stroke="white" stroke-linecap="round"/>
    <path :class="stroke" d="M15.5 16L9.49996 9.99995" stroke="white" stroke-linecap="round"/>
</svg>
</template>