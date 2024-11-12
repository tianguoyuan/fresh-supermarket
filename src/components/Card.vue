<script setup lang="ts">
const props = defineProps<{
  list: API.CommonRecommendListRes['list']
}>()
</script>

<template>
  <div class="grid grid-cols-2 items-start justify-between gap-3">
    <div v-for="item in props.list" :key="item.id" class="rounded-2 bg-white p-3">
      <van-image :src="item.cover" class="h-auto w-full" lazy-load />
      <p class="line-clamp-2 mt-1 text-[14] line-height-[18px]">
        {{ item.title }}
      </p>
      <div class="mt-3">
        <span v-if="item.isBargainPrice" class="border border-#F55726 px-[2px] text-[9px] color-#F55726">特价</span>
        <span />
        <span v-if="item.isBargainPrice" class="ml-1 border px-[2px] text-[9px] color-primary border-color-primary">24H发货</span>
        <span />
      </div>
      <div class="mt-[10px]">
        <span class="text-[10px] color-#F55726">￥</span>
        <span class="text-4 color-#F55726">{{ item.price }}</span>
        <span class="ml-2px text-3 color-#999">/箱</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
