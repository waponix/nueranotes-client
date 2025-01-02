<script lang="ts" setup>
import iconConfig from '../icons/_icon_config';
import { computed, type ComputedRef } from 'vue';


const props = defineProps<{
    color?: string,
}>()

const fill: ComputedRef<string> = computed(() => {
    // @ts-ignore
    return iconConfig.fills[props.color || 'default']
})
</script>
<template>
<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M0 0V10H10C4.47715 10 0 5.52285 0 0Z"/>
</svg>
</template>