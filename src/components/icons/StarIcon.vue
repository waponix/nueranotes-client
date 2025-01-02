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
    <path :class="stroke" d="M19.9796 13.678C20.7105 12.182 22.8427 12.182 23.5736 13.678L24.524 15.6232C24.8154 16.2197 25.3839 16.6327 26.0413 16.7256L28.1849 17.0283C29.8336 17.2612 30.4925 19.289 29.2955 20.4464L27.7392 21.9514C27.262 22.4129 27.0448 23.0812 27.1597 23.7351L27.5342 25.8674C27.8222 27.5073 26.0972 28.7606 24.6266 27.9799L22.7143 26.9648C22.1279 26.6535 21.4253 26.6535 20.8389 26.9648L18.9266 27.9799C17.4559 28.7606 15.731 27.5073 16.019 25.8674L16.3935 23.7351C16.5084 23.0812 16.2912 22.4129 15.814 21.9514L14.2577 20.4464C13.0607 19.289 13.7196 17.2612 15.3683 17.0283L17.5119 16.7256C18.1693 16.6327 18.7378 16.2197 19.0292 15.6232L19.9796 13.678Z" stroke="white" stroke-width="1.5"/>
</svg>
</template>