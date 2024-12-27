<script lang="ts" setup>
defineProps<{
  id: string,
  submit?: boolean,
  label?: string,
}>()
</script>
<template>
    <label :for="id" class="app-button text-center">
        <button 
            class="font-bold" 
            :id="id" 
            :type="submit === true ? 'submit' : 'button'">
            {{ label }}
        </button>
    </label>
</template>