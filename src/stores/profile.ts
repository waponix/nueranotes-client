import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', () => {
  let access: null|string = null; 
  
  return { 
    access
  }
})
