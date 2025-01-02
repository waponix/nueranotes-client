<script lang="ts" setup>
import axios from 'axios'
import { useProfileStore } from '@/stores/profile'
import router from '@/router';

const props = defineProps<{
  name: string,
  method?: string,
  data?: object,
  headers?: [{key: any, value: any}],
}>()

const emit = defineEmits<{
  (e: 'success', value: any): void
  (e: 'error', value: any): void
}>()

let delay: number = 200;
let timeout: any = null

let controller: null|AbortController = null

const avoidDuplicate = () => {
    if (timeout !== null) {
        clearTimeout(timeout)
    }
}

const abortDuplicateRequest = () => {
    // prevent any request from being duplicated
    if (controller !== null) {
        controller.abort()
    }
    controller = new AbortController()
}

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    // withCredentials: true,
})

const profileStore = useProfileStore()

api.defaults.headers.common['Authorization'] = `Bearer ${profileStore.access}`
api.defaults.headers.common['Content-Type'] = 'application/json'
api.defaults.headers.common['Accept'] = 'application/json'

const retry: number = 1;
let tries: number = 0;

const send = async () => {
    avoidDuplicate()
    
    timeout = setTimeout(async () => {
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
            if (typeof response.data?.data?.token !== undefined && profileStore.access === null) {
                profileStore.access = response.data?.data?.token
            }

            emit('success', response.data)
        } catch (error: any) {
            if (Number(error.status) === 401 && tries < retry) {
                try {
                    // try to refresh the token
                    const retryResponse: any = await api({
                        url: 'auth/refresh',
                        method: 'POST',
                    })

                    // update the token
                    profileStore.access = retryResponse.data?.data?.token
                    api.defaults.headers.common['Authorization'] = `Bearer ${profileStore.access}`

                    tries += 1;
                    await send()
                    return
                } catch (e: any) {
                    
                }
            }
            emit('error', error.response)

            if (Number(error.status) === 401 && tries >= retry) {
                router.push({name: 'login'})
            }
        }
    }, delay)
}
</script>
<template>
    <slot :send="send"></slot>
</template>