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
      if (tab.open === false) continue
      // @ts-ignore
      tab.active = router.currentRoute.value.path === tab.url
      openedTabs.push(tab)
    }

    return openedTabs
  })

  const openTab = (tab: any) => {
    const defaults = {
      id: null,
      open: true,
      name: null,
      url: null
    }
    // @ts-ignore
    if (typeof(tabs.value[tab.id]) !== 'undefined') {
      // @ts-ignore
      tabs.value[tab.id] = {...defaults, ...tabs.value[tab.id], ...tab}
      // @ts-ignore
      tabs.value[tab.id].open = true
      return
    }
    // @ts-ignore
    tabs.value[tab.id] = {...defaults, ...tab}
  }

  const closeTab = (id: any, wipe: boolean = false) => {
    if (wipe === true) {
      // @ts-ignore
      delete tabs.value[id]
      return
    }
    // @ts-ignore
    tabs.value[id].open = false
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
