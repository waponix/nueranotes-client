<script lang="ts" setup>
import { ref, type Ref } from 'vue';

defineProps<{
  id: string,
  type: string,
  label?: string,
}>()

const emit = defineEmits<{
    (e: 'value', value: string): void,
}>()

const value: Ref<string> = ref('');

const pushValue = () => {
    emit('value', value.value);
};

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
                    <input 
                        autocomplete="off"
                        @blur="pushValue"
                        @input="pushValue" 
                        @change="pushValue"
                        v-model="value" 
                        :type="type" 
                        :name="id" 
                        :id="id">
                </div>
            </div>
        </label>
        <div class="app-input-error">

        </div>
    </div>
</template>