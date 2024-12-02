<script setup lang="ts">
const props = defineProps<{
  item: API.CommonRecommendListItem
}>()

const emits = defineEmits<{
  add: [v: API.CommonRecommendListItem]
}>()
const route = useRoute()
</script>

<template>
  <RouterLink class="mt-3 block flex rounded-2 bg-white p-3 first:mt-0" :to="`/home/productDetail/${props.item.id}?back=${route.fullPath}`">
    <div>
      <VanImage lazy-load :src="item.cover" class="h-110px w-110px" />
    </div>
    <div class="ml-5 flex flex-1 flex-col justify-between">
      <div>
        <div class="line-clamp-2 text-14px color-#333 line-height-18px">
          {{ item.title }}
        </div>
        <div class="line-clamp-2 mt-2px text-3 color-#999 line-height-4">
          {{ item.desc }}
        </div>
      </div>

      <div>
        <div>
          <span v-if="props.item.isBargainPrice" class="border border-#F55726 px-[2px] text-[9px] color-#F55726">特价</span>
          <span v-if="props.item.isOneDay" class="ml-1 border px-[2px] text-[9px] color-primary border-color-primary">24H发货</span>
        </div>

        <div class="mt-2px flex justify-between whitespace-nowrap line-height-22px">
          <div>
            <span class="text-[10px] color-#F55726">￥</span>
            <span class="text-4 color-#F55726">{{ props.item.price }}</span>
            <span class="ml-2px text-3 color-#999">/箱</span>
          </div>

          <SvgIcon icon-class="add-shopping" size="20" @click.stop.prevent="emits('add', props.item)" />
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>
