<script lang="ts" setup>
import axios from 'axios'
import { useProfileStore } from '@/stores/profile'

let props = defineProps<{
  name: string,
  method?: string,
  data?: object,
  headers?: [{key: any, value: any}],
}>()

const emit = defineEmits<{
  (e: 'success', value: any): void
  (e: 'error', value: any): void
}>()

let controller: null|AbortController = null

const abortDuplicateRequest = () => {
    // prevent any request from being duplicated
    if (controller !== null) {
        controller.abort()
    }
    controller = new AbortController();
}

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

const profileStore = useProfileStore()

api.defaults.headers.common['Authorization'] = profileStore.access
api.defaults.headers.common['Accept'] = 'application/json'

const send = async () => {
    try {
        abortDuplicateRequest()

        const response: any = await api({
            method: props.method,
            url: props.name,
            data: props.data,
            // @ts-ignore
            signal: controller.signal
        })

        // store token when found
        if (typeof response.data?.data?.token !== undefined) {
            profileStore.$state.access = response.data?.data?.token
        }

        emit('success', response.data)
    } catch (error: any) {
        emit('error', error.response)
    }
}
</script>
<template>
    <slot :send="send"></slot>
</template>