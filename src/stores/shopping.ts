import { defineStore } from 'pinia'
import { showConfirmDialog, showToast } from 'vant'
import { add, multiply } from '~/utils/math'

export const useShoppingStore = defineStore(('shopping'), () => {
  const shoppingList = useLocalStorage<API.CommonRecommendListRes['list']>('shoppingList', [])

  /** 所有选中的 */
  const checkedList = computed(() => shoppingList.value.filter(v => v.checked))
  const priceSum = computed(() => checkedList.value.reduce((pre, cur) => add(pre, multiply(+cur.price, cur.num)), 0) || 0)

  const isAllChecked = computed(() => shoppingList.value.every(v => v.checked))
  function changeAllCheckedList() {
    const is = isAllChecked.value
    shoppingList.value.forEach(v => v.checked = !is)
  }

  function changeCheckedList(val: API.CommonRecommendListItem) {
    const findItemIndex = shoppingList.value.findIndex(v => v.id === val.id)
    const currentItem = shoppingList.value[findItemIndex]
    if (findItemIndex !== -1) {
      currentItem.checked = !currentItem.checked
    }
  }
  async function removeCheckedList(tip?: boolean) {
    if (tip) {
      showConfirmDialog({
        title: '提示',
        message: '是否删除选中列表？',
        theme: 'round-button',
      })
    }
    shoppingList.value = shoppingList.value.filter(v => !v.checked)
  }

  function addShoppingList(val: API.CommonRecommendListItem, tip?: boolean) {
    if (tip) {
      showToast('添加成功')
    }

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
    isAllChecked,
    changeAllCheckedList,

    shoppingList,
    priceSum,
    checkedList,

    addShoppingList,
    subtractShoppingList,

    changeCheckedList,
    removeCheckedList,
  }
})
