<script lang="ts" setup>
import iconConfig from './_icon_config';
import { computed, type ComputedRef } from 'vue';


const props = defineProps<{
    color?: string,
    background?: string,
}>()

const fill: ComputedRef<[string]> = computed(() => {
    // @ts-ignore
    return iconConfig.fills[props.color || 'default']
})

const backgroundFill: ComputedRef<[string]> = computed(() => {
    // @ts-ignore
    return iconConfig.fills[props.color || 'dark']
})


const stroke: ComputedRef<[string]> = computed(() => {
    // @ts-ignore
    return iconConfig.strokes[props.color || 'default']
})
</script>
<template>
<svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :class="stroke" d="M6.28071 17.8491C6.44062 16.8838 7.2754 16.176 8.25382 16.176H22.719C23.7235 16.176 24.5722 16.9211 24.7022 17.9171L25.8865 26.9907C26.0428 28.1879 25.1107 29.2495 23.9033 29.2495H6.75067C5.51559 29.2495 4.57571 28.1411 4.77757 26.9226L6.28071 17.8491Z" stroke-width="1.5"/>
    <path :class="backgroundFill" class="pencil-bg" fill="#1E1E1E" d="M15.2394 2.20464C15.9149 0.928291 17.4971 0.441172 18.7735 1.11663L20.5668 2.06565C21.8431 2.74111 22.3302 4.32337 21.6548 5.59972L14.6379 18.8588C14.4997 19.1199 14.3183 19.3557 14.1014 19.5562L11.8552 21.6317C10.0414 23.3078 7.12914 21.7666 7.49485 19.3241L7.94772 16.2996C7.99146 16.0075 8.08439 15.7248 8.22256 15.4638L15.2394 2.20464Z"/>
    <path :class="stroke" class="pencil" d="M15.2741 6.17137C15.6616 5.43916 16.5693 5.15971 17.3015 5.5472L17.7313 5.77466C18.4635 6.16216 18.743 7.06986 18.3555 7.80208L13.436 17.0979C13.3786 17.2063 13.3082 17.3073 13.2263 17.3985L11.2201 19.6325C10.5246 20.407 9.25595 19.7357 9.50519 18.7249L10.224 15.8097C10.2534 15.6906 10.2973 15.5756 10.3546 15.4672L15.2741 6.17137Z" stroke-width="1.5"/>
</svg>
</template>
<style scoped>
.pencil, .pencil-bg {
    animation: movepencil 1.5s infinite;
    animation-timing-function: ease-out;
}

@keyframes movepencil {
    0% {
        transform: translate(0px, 0px);
    }

    25% {
        transform: translate(10px, 0px);
    }

    50% {
        transform: translate(0px, 2.5px);
    }

    75% {
        transform: translate(10px, 2.5px);
    }
}
</style>