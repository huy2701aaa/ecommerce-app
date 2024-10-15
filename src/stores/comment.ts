import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TComment } from '@/common/type'

export const useCommentStore = defineStore('commentStore', () => {
  const commentList = ref<TComment[]>([])

  const setCommentList = (payload: TComment[]) => {
    commentList.value = payload
  }

  return {
    commentList,
    setCommentList
  }
})
