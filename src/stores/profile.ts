import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', () => {
  const access: Ref<null|string> = ref(null);
  const isAuthenticated: ComputedRef<boolean> = computed(() => access.value !== null);
  
  return {
    access,
    isAuthenticated,
  }
}, {
  persist: true
})
