<script lang="ts" setup>
defineProps<{
  id: string,
  submit?: boolean,
  label?: string,
  lock?: boolean,
}>()
</script>
<template>
    <label :for="id" class="app-button text-center">
        <button 
            class="font-bold" 
            :diabled="lock"
            :id="id" 
            :type="submit === true ? 'submit' : 'button'">
            {{ label }}
        </button>
    </label>
</template>