import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router';

export const useNoteStore = defineStore('notes', () => {
  const generalToken = ref(null)
  const generalConvo = ref([])
  const tabs = ref({})

  const openedTabs = computed(() => {
    let openedTabs = [];
    for (let tab of Object.values(tabs.value)) {
      // @ts-ignore
      tab.active = router.currentRoute.value.path === tab.url
      openedTabs.push(tab)
    }

    return openedTabs
  })

  const openTab = (tab: any) => {
    // @ts-ignore
    if (typeof(tabs.value[tab.id]) !== 'undefined') {
      // @ts-ignore
      tabs.value[tab.id] = {...tabs.value[tab.id], ...tab}
      return
    }
    // @ts-ignore
    tabs.value[tab.id] = tab
  }

  const closeTab = (id: any) => {
    // @ts-ignore
    delete tabs.value[id]
  }

  const clearGeneralConvo = () => {
    generalToken.value = null
    generalConvo.value = []
  }

  const updateTabContent = (id: string, tab: any) => {
    // @ts-ignore
    if (typeof tabs.value[id] === 'undefined') {
      // @ts-ignore
      tabs.value[id] = {}
    }

    // @ts-ignore
    tabs.value[id] = {...tabs.value[id], ...tab}
  }
  
  return {
    generalToken,
    generalConvo,
    openedTabs,
    tabs,
    openTab,
    closeTab,
    clearGeneralConvo,
    updateTabContent,
  }
}, {
  persist: true
})
