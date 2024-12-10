<script setup lang="ts" name="/shopping/">
import { storeToRefs } from 'pinia'
import ShoppingCard from './components/ShoppingCard.vue'

const route = useRoute()

const shoppingStore = useShoppingStore()
const { shoppingList, priceSum, checkedList, isAllChecked } = storeToRefs(shoppingStore)
const { addShoppingList, removeCheckedList, changeAllCheckedList } = shoppingStore
</script>

<template>
  <div>
    <van-nav-bar placeholder fixed :clickable="false" title="购物车">
      <template v-if="route.query.back" #left>
        <RouterLink :to="decodeURIComponent(route.query.back as string)">
          <van-icon name="arrow-left" color="#0B1526" />
        </RouterLink>
      </template>
      <template #right>
        <span :class="checkedList.length ? 'color-[#666]' : 'color-[#999]'" @click="checkedList.length ? removeCheckedList(true) : undefined">删除</span>
      </template>
    </van-nav-bar>

    <div class="p-3">
      <ShoppingCard v-if="shoppingList.length" :list="shoppingList" />
      <div v-else class="flex flex-col items-center justify-center rounded-2 bg-white py-5">
        <p>购物车空空如也</p>
        <p class="mt-1 text-xs color-[#999]">
          赶紧慰劳一下自己吧
        </p>
        <RouterLink to="/home" class="mt-3 border rounded-full px-6 py-2 color-primary border-color-primary">
          去逛逛
        </RouterLink>
      </div>
    </div>

    <!-- 为你推荐 -->
    <RecommendForYou @add="v => addShoppingList(v, true)" />

    <!-- 全选，结算 -->
    <div
      class="footer-tool sticky bottom-0 h-[50px] flex items-center justify-between border-t border-[#f7f8f9] bg-white px-3 py-2"
    >
      <div class="flex items-center" @click="changeAllCheckedList">
        <SvgIcon
          :icon-class="isAllChecked ? 'radio-checked' : 'radio'"
          :color="isAllChecked ? '#40ae36' : '#ccc'" size="18"
        />
        <span class="ml-1">全选</span>
      </div>
      <div>
        <span class="text-3">合计: </span>
        <span class="text-10px color-#F55726">￥</span>
        <span class="text-4 color-#F55726">{{ priceSum }}</span>
        <RouterLink
          to="/shopping/settleAccount"
          class="ml-3 rounded-full px-6 py-2 color-white"
          :class="[checkedList.length ? 'bg-primary' : 'bg-#999']"
        >
          去结算
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css"></style>

<route lang="yaml">
  meta:
    title: 购物车
    showTabBar: true
</route>
