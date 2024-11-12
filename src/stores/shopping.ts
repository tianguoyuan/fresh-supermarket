import { defineStore } from 'pinia'

interface IShoppingList {
  id: string
}

export const useShoppingStore = defineStore(('shopping'), () => {
  const shoppingList = ref<IShoppingList[]>([])

  function changeShoppingList(val: IShoppingList[]) {
    shoppingList.value = val
  }
  return {
    shoppingList,
    changeShoppingList,
  }
})
