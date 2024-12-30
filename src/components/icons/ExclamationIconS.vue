<script lang="ts" setup>
import iconConfig from './_icon_config';
import { computed, type ComputedRef } from 'vue';


const props = defineProps<{
    color?: string,
}>()

const fill: ComputedRef<[string]> = computed(() => {
    // @ts-ignore
    return iconConfig.fills[props.color || 'default']
})

const stroke: ComputedRef<[string]> = computed(() => {
    // @ts-ignore
    return iconConfig.strokes[props.color || 'default']
})
</script>
<template>
<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :class="stroke" d="M10 5.1062L10 9.72925" stroke-linecap="round"/>
    <path :class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M8.02661 5.37748C8.02661 5.09964 7.7501 4.90742 7.49996 5.02838C5.57662 5.95844 4.25 7.92824 4.25 10.2079C4.25 13.3835 6.82436 15.9579 10 15.9579C13.1756 15.9579 15.75 13.3835 15.75 10.2079C15.75 7.93428 14.4304 5.96888 12.5153 5.03579C12.2651 4.91389 11.9878 5.10611 11.9878 5.38441V6.20977C11.9878 6.35786 12.0705 6.49251 12.1972 6.56917C13.4276 7.31373 14.25 8.66477 14.25 10.2079C14.25 12.5551 12.3472 14.4579 10 14.4579C7.65279 14.4579 5.75 12.5551 5.75 10.2079C5.75 8.65932 6.57823 7.30419 7.81589 6.56131C7.94333 6.48481 8.02661 6.34976 8.02661 6.20112V5.37748Z"/>
    <circle :class="fill" cx="0.719727" cy="0.719727" r="0.719727" transform="matrix(1 0 0 -1 9.28027 12.449)"/>
</svg>
</template>
