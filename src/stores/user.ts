import { defineStore } from 'pinia'

export const useUserStore = defineStore(('user'), () => {
  const address = useLocalStorage('address', '北京')
  const token = useLocalStorage('token', '')

  function changeToken(val: string) {
    token.value = val
  }
  function changeAddress(val: string) {
    address.value = val
  }
  return {
    token,
    changeToken,
    address,
    changeAddress,
  }
})
