<script lang="ts" setup>
defineProps<{
  id: string,
  type: string,
  label?: string,
}>()
</script>
<template>
    <div class="app-input">
        <label :for="id">
            <span>{{ label }}</span>
            <div class="app-input-field-wrap flex items-center max-w-[500px]">
                <div class="flex-initial app-input-icon">
                    <slot></slot>
                </div>
                <div class="flex-1 app-input-field">
                    <input :type="type" :name="id" :id="id">
                </div>
            </div>
        </label>
        <div class="app-input-error">

        </div>
    </div>
</template>