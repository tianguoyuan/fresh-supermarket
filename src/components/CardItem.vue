<script setup lang="ts">
const props = defineProps<{
  item: API.CommonRecommendListItem
  hideAdd?: boolean
  single?: boolean
}>()
const emits = defineEmits<{
  add: [v: API.CommonRecommendListItem]
}>()
</script>

<template>
  <RouterLink class="block rounded-2 bg-white p-3" :to="`/detail/${props.item.id}`">
    <van-image :src="props.item.cover" class="h-auto w-full" lazy-load />
    <p class="mt-1 text-[14] line-height-[18px]" :class="[props.single ? 'color-#666 text-3 line-clamp-1' : 'line-clamp-2']">
      {{ props.item.title }}
    </p>
    <div v-if="!props.single" class="mt-3">
      <span v-if="props.item.isBargainPrice" class="border border-#F55726 px-[2px] text-[9px] color-#F55726">特价</span>
      <span v-if="props.item.isOneDay" class="ml-1 border px-[2px] text-[9px] color-primary border-color-primary">24H发货</span>
    </div>
    <div class="mt-[10px] flex items-center justify-between">
      <div>
        <span class="text-[10px] color-#F55726">￥</span>
        <span class="text-4 color-#F55726">{{ props.item.price }}</span>
        <span v-if="!props.single" class="ml-2px text-3 color-#999">/箱</span>
      </div>
      <div v-if="!props.hideAdd">
        <SvgIcon icon-class="add-shopping" size="20" @click.stop.prevent="emits('add', props.item)" />
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>
