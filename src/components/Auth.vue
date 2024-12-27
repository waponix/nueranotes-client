<script lang="ts" setup>
import router from '@/router';
import { onMounted } from 'vue';

const LOGIN: string = 'login';

onMounted(async () => {
    if (router.currentRoute.value.name !== LOGIN) {
        router.push('login');
    }
});
</script>
<template>
</template>