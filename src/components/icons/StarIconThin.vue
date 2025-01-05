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
<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :class="stroke" d="M9.70301 4.17801C10.4339 2.68197 12.5661 2.68196 13.297 4.17801L14.2474 6.1232C14.5388 6.71972 15.1073 7.13273 15.7647 7.22558L17.9083 7.52834C19.557 7.7612 20.2159 9.78896 19.0189 10.9464L17.4626 12.4514C16.9854 12.9129 16.7682 13.5812 16.8831 14.2351L17.2576 16.3674C17.5456 18.0073 15.8207 19.2606 14.35 18.4799L12.4377 17.4648C11.8513 17.1535 11.1487 17.1535 10.5623 17.4648L8.65004 18.4799C7.17935 19.2606 5.45443 18.0073 5.74245 16.3674L6.11693 14.2351C6.23177 13.5812 6.01464 12.9129 5.53738 12.4514L3.98107 10.9464C2.78412 9.78896 3.44298 7.7612 5.09167 7.52834L7.23534 7.22558C7.89273 7.13273 8.46119 6.71972 8.75263 6.1232L9.70301 4.17801Z" stroke="white"/>
</svg>
</template>