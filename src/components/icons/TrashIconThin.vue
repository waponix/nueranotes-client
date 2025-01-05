<script lang="ts" setup>
import iconConfig from './_icon_config';
import { computed, type ComputedRef } from 'vue';


const props = defineProps<{
    color?: string,
}>()

const fill: ComputedRef<string> = computed(() => {
    // @ts-ignore
    return iconConfig.fills[props.color || 'default']
})

const stroke: ComputedRef<string> = computed(() => {
    // @ts-ignore
    return iconConfig.strokes[props.color || 'default']
})
</script>
<template>
<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :class="stroke" d="M5.36364 6.31015C4.61052 6.31015 4 6.84108 4 7.49602V8.68189C4 9.33682 4.61052 9.86775 5.36364 9.86775C5.36729 9.86775 5.37038 9.87012 5.37083 9.87328L6.42865 17.2326C6.59925 18.4195 7.75943 19.3102 9.13486 19.3102H13.8651C15.2406 19.3102 16.4008 18.4195 16.5714 17.2326L17.6292 9.87328C17.6296 9.87012 17.6327 9.86775 17.6364 9.86775C18.3895 9.86775 19 9.33682 19 8.68189V7.49602C19 6.84108 18.3895 6.31015 17.6364 6.31015H5.36364Z" stroke="white"/>
    <path :class="fill" d="M6.96154 4.68985C6.96154 3.86142 7.63311 3.18985 8.46154 3.18985H14.5385C15.3669 3.18985 16.0385 3.86142 16.0385 4.68985H15.0385C15.0385 4.41371 14.8146 4.18985 14.5385 4.18985H8.46154C8.1854 4.18985 7.96154 4.41371 7.96154 4.68985H6.96154ZM15.5385 5.68985H7.46154H15.5385ZM6.96154 5.68985V4.68985C6.96154 3.86142 7.63311 3.18985 8.46154 3.18985V4.18985C8.1854 4.18985 7.96154 4.41371 7.96154 4.68985V5.68985H6.96154ZM14.5385 3.18985C15.3669 3.18985 16.0385 3.86142 16.0385 4.68985V5.68985H15.0385V4.68985C15.0385 4.41371 14.8146 4.18985 14.5385 4.18985V3.18985Z" fill="white"/>
    <path :class="stroke" d="M13.4447 11.2172L13.0169 15.2" stroke="white" stroke-linecap="round"/>
    <path :class="stroke" d="M9.76923 11.2172L10.1971 15.2" stroke="white" stroke-linecap="round"/>
</svg>
</template>