<script lang="ts" setup>
import router from '@/router';
import { onMounted } from 'vue';


onMounted(() => {
    //@ts-ignore
    router.replace(router.currentRoute.value.query.to)
})
</script>
<template>
   
</template>