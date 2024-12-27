<script lang="ts" setup>
import axios from 'axios';
import { useProfileStore } from '@/stores/profile';

let props = defineProps<{
  name: string,
  method?: string,
  data?: object,
  headers?: [{key: any, value: any}],
}>()

const emit = defineEmits<{
  (e: 'response', value: object): void
}>()

let api = axios.create({
    baseURL: 'http://localhost:8000/api/'
});

const profileStore = useProfileStore();

api.defaults.headers.common['Authorization'] = profileStore.access;
api.defaults.headers.common['Accept'] = 'application/json';

const send = async () => {
    const response: any = await api({
        method: props.method,
        url: props.name,
        data: props.data,
    });

    const status: number = Number(response.status);
    if ([200, 201].includes(status) === false) {
        emit('response', response.response.data);
        return;
    }

    emit('response', response.data);
}
</script>
<template>
    <slot :send="send"></slot>
</template>