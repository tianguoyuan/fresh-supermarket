<script setup lang="ts">
import { Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

const props = defineProps<{
  list: API.CommonRecommendListRes['list']
  hideAdd?: boolean
}>()

const emits = defineEmits<{
  add: [v: API.CommonRecommendListItem]
}>()
</script>

<template>
  <div class="mx-3">
    <Waterfall
      :list="props.list" :cross-origin="false" :breakpoints="{
        500: { rowPerView: 2 },
      }"
      :has-around-gutter="false"
      animation-effect="animate__jackInTheBox"
    >
      <template #default="{ item }">
        <RouterLink class="block rounded-2 bg-white p-3" :to="`/detail/${item.id}`">
          <van-image :src="item.cover" class="h-auto w-full" lazy-load />
          <p class="line-clamp-2 mt-1 text-[14] line-height-[18px]">
            {{ item.title }}
          </p>
          <div class="mt-3">
            <span v-if="item.isBargainPrice" class="border border-#F55726 px-[2px] text-[9px] color-#F55726">特价</span>
            <span v-if="item.isOneDay" class="ml-1 border px-[2px] text-[9px] color-primary border-color-primary">24H发货</span>
          </div>
          <div class="mt-[10px] flex items-center justify-between">
            <div>
              <span class="text-[10px] color-#F55726">￥</span>
              <span class="text-4 color-#F55726">{{ item.price }}</span>
              <span class="ml-2px text-3 color-#999">/箱</span>
            </div>
            <div v-if="!props.hideAdd">
              <SvgIcon icon-class="add-shopping" size="20" @click.stop.prevent="emits('add', item)" />
            </div>
          </div>
        </RouterLink>
      </template>
    </Waterfall>
  </div>
</template>

<style scoped lang="scss">
:deep(.waterfall-list) {
  background-color: transparent;
}
</style>
