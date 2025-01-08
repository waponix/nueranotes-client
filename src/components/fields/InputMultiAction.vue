<script lang="ts" setup>
import { ref, type Ref } from 'vue'

defineProps<{
    id: string,
    placeholder?: string,
}>()
const emit = defineEmits <{
    (e: 'value', value: any) :void,
}>()

const value: Ref<string> = ref('')

const clear = () => {
    value.value = '';
}

</script>
<template>
    <div class="app-input-multi-action">
        <input 
        :id="id" 
        :name="id" 
        v-model="value" 
        @input="() => emit('value', value)"
        @blur="() => emit('value', value)"
        @change="() => emit('value', value)"
        autocomplete="off"
        rows="1"
        :placeholder="placeholder"
        class="w-full bg-transparent px-[20px] pt-[20px] outline-0 text-light"
        />
        <div class="flex flex-row-reverse">
            <div class="flex">
                <slot :clear="clear"></slot>
            </div>
        </div>
    </div>
</template>
<style scoped>
.app-input-multi-action {
    background-color: var(--c-normal);
    box-shadow: inset 2px 2px 5px var(--c-darker);
    border-radius: 25px;
    border: 1px solid var(--c-normal);
}

.app-input-multi-action textarea {
    margin: 20px;
    margin-bottom: 0px;
    display: block;
    width: calc(100% - 50px);
    background-color: transparent;
    outline: none;
    color: var(--c-light);
    resize: none;
    overflow-y: hidden;
}
</style>