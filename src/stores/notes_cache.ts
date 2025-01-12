import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router';

export const useNoteCacheStore = defineStore('notes_cache', () => {
 const noteList = ref({})
 const search = ref('')

 return {
  noteList,
  search,
 }
}, {
  persist: {
    storage: sessionStorage
  }
})
