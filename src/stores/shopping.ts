import { defineStore } from 'pinia'
import { add, multiply } from '~/utils/math'

export const useShoppingStore = defineStore(('shopping'), () => {
  const shoppingList = ref<API.CommonRecommendListRes['list']>([])

  /** 所有选中的 */
  const priceSum = computed(() => shoppingList.value.reduce((pre, cur) => add(pre, multiply(+cur.price, cur.num)), 0) || 0)

  function addShoppingList(val: API.CommonRecommendListItem) {
    const findItemIndex = shoppingList.value.findIndex(v => v.id === val.id)
    const currentItem = shoppingList.value[findItemIndex]
    if (findItemIndex !== -1) {
      currentItem.num += 1
    }
    else {
      shoppingList.value.push({ ...val, num: 1 })
    }
  }
  function subtractShoppingList(val: API.CommonRecommendListItem) {
    const findItemIndex = shoppingList.value.findIndex(v => v.id === val.id)
    const currentItem = shoppingList.value[findItemIndex]
    if (findItemIndex !== -1 && currentItem.num <= 1) {
      shoppingList.value.splice(findItemIndex, 1)
    }
    else {
      currentItem.num -= 1
    }
  }
  return {
    shoppingList,
    priceSum,

    addShoppingList,
    subtractShoppingList,
  }
})
