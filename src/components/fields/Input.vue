<script lang="ts" setup>
import { computed, ref, type ComputedRef, type Ref } from 'vue';

import ExclamationIconS from '../icons/ExclamationIconS.vue';

const props = defineProps<{
  id: string,
  type?: string,
  label?: string,
  error?: null|string,
  lock?: boolean,
}>()

const emit = defineEmits<{
    (e: 'value', value: string): void,
}>()

const value: Ref<string> = ref('');

const pushValue = () => {
    emit('value', value.value);
};

const inputFieldClass: ComputedRef<string[]> = computed(() => {
    let classes = [
        'border',
    ];
    
    if (props.error !== null) {
        classes.push('border-danger')
    } else {
        classes.push('border-normal')
    }

    return classes
});

</script>
<template>
    <div class="app-input">
        <label :for="id">
            <span>{{ label }}</span>
            <div :class="inputFieldClass" class="app-input-field-wrap flex items-center max-w-[500px]">
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
                        :type="type ? type : 'text'" 
                        :name="id" 
                        :diabled="lock"
                        :id="id">
                </div>
            </div>
        </label>
        <div v-if="error !== null" class="app-input-error text-danger flex flex-cols items-center">
            <span class="flex-initial">
                <ExclamationIconS color="danger" />
            </span>
            <span class="flex-1">
                {{ error }}
            </span>
        </div>
    </div>
</template>