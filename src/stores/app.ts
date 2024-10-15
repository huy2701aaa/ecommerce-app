import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ACTION_ENUM } from '@/common/enum'

export const useAppStore = defineStore('appStore', () => {
  const isShowOverlay = ref<boolean>(false)
  const isShowActionForm = ref<boolean>(false)
  const actionType = ref<string>(ACTION_ENUM.CREATE)

  const setIsShowOverlay = (payload: boolean) => {
    isShowOverlay.value = payload
  }

  const setIsShowActionForm = (payload: boolean) => {
    isShowActionForm.value = payload
  }

  const setActionType = (payload: ACTION_ENUM) => {
    actionType.value = payload
  }

  return {
    isShowOverlay,
    setIsShowOverlay,
    isShowActionForm,
    setIsShowActionForm,
    actionType,
    setActionType
  }
})
