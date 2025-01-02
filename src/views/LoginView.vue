<script setup lang="ts">
import InputIcon from '@/components/fields/InputIcon.vue'
import Button from '@/components/fields/Button.vue'
import Request from '@/components/api/Request.vue'
import Alert from '@/components/Alert.vue'

import PersonIcon from '@/components/icons/PersonIcon.vue'
import LockIcon from '@/components/icons/LockIcon.vue'
import WriteLoaderAnimatedIcon from '@/components/icons/WriteLoaderAnimatedIcon.vue'

import { useProfileStore } from '@/stores/profile'
import { onMounted, ref, type Ref } from 'vue'
import router from '@/router'

const email: Ref<string> = ref('')
const password: Ref<string> = ref('')
const profileStore = useProfileStore()

const emailError: Ref<null|string> = ref(null)
const passwordError: Ref<null|string> = ref(null)
const alertError: Ref<string> = ref('')

const showLoader: Ref<boolean> = ref(false)
const showAlert: Ref<boolean> = ref(false)

const redirector = () => {
    if (profileStore.isAuthenticated) {
        router.push({name: 'home'})
    }
}

const login = (request: any) => {
    let submitFlag = true

    // Reset the field errors at every form submit
    emailError.value =
    passwordError.value = null
    
    if (email.value === '') {
        emailError.value = 'This info is needed'
        submitFlag = false
    }

    if (password.value === '') {
        passwordError.value = 'This info is needed'
        submitFlag = false
    }

    if (submitFlag === true) {
        showLoader.value = true
        request.send()
    }
}

const loginError = (error: any) => {
    showLoader.value = false

    if (typeof(error.data?.error?.email) !== 'undefined') {
        emailError.value = 'This is not a valid e-mail'
        return
    }

    if (error.data?.error === 'system error') {
        alertError.value = 'Something went wrong, please try again later'
    }

    alertError.value = 'We can\'t seem to find that account'
    showAlert.value = true
}

onMounted(() => {
    redirector()
})
</script>

<template>
<Request
@success="redirector"
@error="loginError"
name="auth/login"
method="post"
:data="{ email, password }"
v-slot="request">
    <div v-if="showLoader" class="flex items-end h-full items-center justify-center">
        <div class="flex items-end">
            <WriteLoaderAnimatedIcon class="mr-2" />
            <span class="text-light">Just a moment, we're checking...</span>
        </div>
    </div>
    <form :class="showLoader ? 'hidden' : 'block'"
    @submit.prevent="login(request)"
    class="app-login-form flex flex-col w-full h-full items-center justify-center"
    >
        <div class="min-w-[300px] pb-[20px]">
            <Alert v-if="showAlert" class="mb-[20px]" :message="alertError"/>
            <InputIcon 
                id="email"
                label="E-mail (username)"
                class="pb-[10px]"
                :error="emailError"
                @value="value => email = value"
            >
                <PersonIcon />
            </InputIcon>
            <InputIcon 
                id="password"
                type="password"
                label="Password"
                :error="passwordError"
                @value="value => password = value"
            >
                <LockIcon />
            </InputIcon>
        </div>
        <Button 
        id="login"
        label="Login"
        :submit="true"/>
    </form>
</Request>
</template>
