<script setup lang="ts">
const props = defineProps<{
  item: API.CommonRecommendListItem
}>()
</script>

<template>
  <div class="mt-4 first:mt-0">
    <div class="flex justify-between text-3">
      <span>生鲜快递发货</span>
      <span v-if="props.item.isOneDay" class="color-#40AE36">上架24H发货，第三方物流配送</span>
    </div>
    <div class="mt-2 flex line-height-18px">
      <div class="flex flex-1 items-center">
        <div class="h-65px w-65px flex-shrink-0 bg-#f8f9fa">
          <img :src="item.cover">
        </div>
        <div class="ml-3 h-full flex flex-1 flex-col justify-between">
          <div class="line-clamp-2 text-14px">
            {{ props.item.title }} 1kg/份
          </div>
          <div class="mt-5px text-3 color-#999">
            <span>规格: </span>
            <span>1kg/份</span>
          </div>
          <div class="text-3 color-#999">
            <span>数量: </span>
            <span>{{ props.item.num }}份</span>
          </div>
        </div>
      </div>
      <div class="w-20 text-right">
        <span class="text-3">￥</span>{{ props.item.price }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
