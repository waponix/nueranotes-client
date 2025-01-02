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
<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :class="stroke" d="M16.6603 26.1494L14 29.4544" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    <circle :class="stroke" cx="21" cy="20.0457" r="7.5" stroke="white" stroke-width="1.5"/>
</svg>

</template>