<script lang="ts" setup>
import ExclamationIconSm from './icons/ExclamationIconSm.vue';

defineProps<{
    message: string,
}>()

</script>
<template>
    <div class="text-dark flex justify-center w-[100%] px-5 bg-danger">
        <div class="flex items-center">
            <span class="flex-initial">
                <ExclamationIconSm color="dark"/>
            </span>
            <span>
                {{ message }}
            </span>
        </div>
    </div>
</template>