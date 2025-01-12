<script lang="ts" setup>
import { computed, ref, type ComputedRef, type Ref } from 'vue';

import ExclamationIconS from '../icons/ExclamationIconSm.vue';

const props = defineProps<{
  id: string,
  type?: string,
  label?: string,
  error?: null|string,
  placeholder?: string,
  value?: string,
  lock?: boolean,
}>()

const emit = defineEmits<{
    (e: 'value', value: string): void,
}>()

const value: Ref<string> = ref(props.value ?? '');

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
    <div class="app-input block w-[100%]">
        <label :for="id" class="block w-[100%]">
            <span v-if="label">{{ label }}</span>
            <div :class="inputFieldClass" class="app-input-field-wrap flex items-center">
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
                        :id="id"
                        :placeholder="placeholder">
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
<style scoped>
.app-input .app-input-field-wrap {
    position: relative;
    background-color: var(--c-normal);
    box-shadow: inset 2px 2px 5px var(--c-darker);
    border-radius: 25px;
    color: var(--c-light);
    cursor: pointer;
    overflow-x: hidden;
    padding-right: 10px;
}

.app-input label span {
    color: var(--c-hazy-light);
    padding-left: 15px;
    cursor: pointer;
}

.app-input input {
    position: relative;
    width: 100%;
    display: block;
    background-color: transparent;
    outline: none;
}
</style>