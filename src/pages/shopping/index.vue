<script setup lang="ts" name="/shopping/">
import { storeToRefs } from 'pinia'

const shoppingStore = useShoppingStore()
const { shoppingList } = storeToRefs(shoppingStore)
</script>

<template>
  <div>
    <van-nav-bar placeholder fixed :clickable="false" title="购物车">
      <template v-if="shoppingList.length" #right>
        <span class="color-[#666]">删除</span>
      </template>
    </van-nav-bar>

    <div class="p-3">
      <div v-if="shoppingList.length" />
      <div v-else class="flex flex-col items-center justify-center rounded-2 bg-white py-5">
        <p>购物车空空如也</p>
        <p class="mt-1 text-xs color-[#999]">
          赶紧慰劳一下自己吧
        </p>
        <div class="mt-3 border rounded-full px-6 py-2 color-primary border-color-primary">
          去逛逛
        </div>
      </div>
      <RecommendForYou />
    </div>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    title: 购物车
    showTabBar: true
</route>
