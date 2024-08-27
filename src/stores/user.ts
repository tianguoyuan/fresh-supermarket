import { defineStore } from 'pinia'

export const useUserStore = defineStore(('user'), () => {
  const token = ref('')
  function changeToken(val: string) {
    token.value = val
  }
  return {
    token,
    changeToken,
  }
})
