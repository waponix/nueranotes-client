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
    <path :class="stroke" d="M11.8068 20.729L25.6593 14.1224C27.3772 13.3031 29.1603 15.1198 28.3091 16.8221L21.4264 30.5875C20.6821 32.0761 18.5514 32.0574 17.8333 30.556L16.0226 26.7699C15.8198 26.3458 15.474 26.0067 15.0459 25.8121L11.8402 24.3549C10.2927 23.6516 10.2726 21.4607 11.8068 20.729Z" stroke="white" stroke-width="1.5"/>
    <path :class="stroke" d="M15.8252 25.9968L20.0678 21.7541" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
</svg>
</template>
