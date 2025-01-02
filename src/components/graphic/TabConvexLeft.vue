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
<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M10.9629 0.891724V10.8917H0.962891C6.48574 10.8917 10.9629 6.41457 10.9629 0.891724Z"/>
</svg>
</template>