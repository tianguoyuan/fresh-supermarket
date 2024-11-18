<script setup lang="ts">
import { storeToRefs } from 'pinia'

const shoppingStore = useShoppingStore()
const { shoppingList } = storeToRefs(shoppingStore)
const { addShoppingList, subtractShoppingList, changeCheckedList } = shoppingStore
</script>

<template>
  <div class="rounded-2 bg-white p-3">
    <div v-for="(item) in shoppingList" :key="item.id" class="mt-3 flex first:mt-0">
      <div class="flex items-center" @click="changeCheckedList(item)">
        <SvgIcon :icon-class="item.checked ? 'radio-checked' : 'radio'" size="20" />

        <VanImage class="ml-2 h-20 w-20" :src="item.cover" lazy-load />
      </div>
      <div class="ml-3 flex flex-1 flex-col justify-between">
        <RouterLink :to="`/detail/${item.id}`" class="line-clamp-2">
          {{ item.title }}
        </RouterLink>
        <div v-if="item.isBargainPrice && item.isBargainPrice" class="mt-1">
          <span v-if="item.isBargainPrice" class="border border-#F55726 px-[2px] text-[9px] color-#F55726">特价</span>
          <span v-if="item.isOneDay" class="ml-1 border px-[2px] text-[9px] color-primary border-color-primary">24H发货</span>
        </div>

        <div v-if="item.isOneDay && item.oldPrice" class="mt-2 text-3 color-#ccc line-through">
          ￥{{ item.oldPrice }}
        </div>

        <div class="mt-2px flex justify-between">
          <div>
            <span class="text-[10px] color-#F55726">￥</span>
            <span class="text-4 color-#F55726">{{ item.price }}</span>
          </div>
          <div class="flex items-center">
            <div class="h-5 w-5 rounded-full bg-#f8f9fa text-center line-height-5" @click="subtractShoppingList(item)">
              -
            </div>
            <div class="px-3">
              {{ item.num }}
            </div>
            <div class="h-5 w-5 rounded-full bg-#f8f9fa text-center line-height-5" @click="addShoppingList(item)">
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
