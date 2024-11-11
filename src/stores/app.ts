import { defineStore } from 'pinia'

export const useAppStore = defineStore(('app'), () => {
  const positionCity = ref('海淀区中关村大厦')

  function changePositionCity(val: string) {
    positionCity.value = val
  }
  return {
    positionCity,
    changePositionCity,
  }
})
