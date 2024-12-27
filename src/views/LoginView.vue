<script setup lang="ts">
import Input from '@/components/fields/Input.vue';
import Button from '@/components/fields/Button.vue';
import Request from '@/components/api/Request.vue';
</script>

<template>
    <div class="app-login-form flex flex-col w-full h-full items-center justify-center">
        <div class="min-w-[300px] pb-[20px]">
            <Input 
                id="username"
                type="text"
                label="Username"
                class="pb-[10px]"
            >
                <svg width="42" height="43" viewBox="0 0 42 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 27.0281C14 23.7765 16.6359 21.1406 19.8875 21.1406H22.1125C25.3641 21.1406 28 23.7765 28 27.0281V27.0281C28 27.841 27.341 28.5 26.5281 28.5H15.4719C14.659 28.5 14 27.841 14 27.0281V27.0281Z" stroke="white" stroke-width="1.5"/>
                <rect x="17" y="14.5" width="8" height="6.54164" rx="3.27082" stroke="white" stroke-width="1.5"/>
                </svg>
            </Input>
            <Input 
                id="password"
                type="password"
                label="Password"
            >
                <svg width="42" height="43" viewBox="0 0 42 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="14" y="17.1471" width="14" height="13.1765" rx="2" stroke="#FFFBFB" stroke-width="1.5"/>
                <path d="M16.25 14.6765C16.25 13.1577 17.4812 11.9265 19 11.9265H23C24.5188 11.9265 25.75 13.1577 25.75 14.6765H24.25C24.25 13.9862 23.6904 13.4265 23 13.4265H19C18.3096 13.4265 17.75 13.9862 17.75 14.6765H16.25ZM25 17.6765H17H25ZM16.25 17.6765V14.6765C16.25 13.1577 17.4812 11.9265 19 11.9265V13.4265C18.3096 13.4265 17.75 13.9862 17.75 14.6765V17.6765H16.25ZM23 11.9265C24.5188 11.9265 25.75 13.1577 25.75 14.6765V17.6765H24.25V14.6765C24.25 13.9862 23.6904 13.4265 23 13.4265V11.9265Z" fill="#FFFBFB"/>
                <path d="M21 22.5V25.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
            </Input>
        </div>
        <Request
            name="auth/login"
            method="post"
            :data="{
                email: 'eric.bermejo.reyes@gmail.com',
                password: 'Admin123'
            }"
            v-slot="request"
            @response="res => console.log(res)">
            <Button 
            id="login"
            label="Login"
            :submit="true"
            @click="request.send()"/>
        </Request>
    </div>
</template>
