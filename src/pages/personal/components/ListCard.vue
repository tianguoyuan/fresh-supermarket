<script setup lang="ts">
const props = withDefaults(defineProps<{
  listData: {
    img: string
    name: string
    active?: boolean
  }[]
  title: string
  rightTitle?: string
  iconHeight: number
}>(), {
  iconHeight: 20,
})
</script>

<template>
  <div class="mx-3 rounded-3 bg-white p-4">
    <div class="flex justify-between">
      <div>{{ title }}</div>
      <div v-if="props.rightTitle">
        <span>{{ props.rightTitle }}</span>
        <van-icon name="arrow" />
      </div>
    </div>

    <div class="mt-5 flex">
      <div v-for="(item) in props.listData" :key="item.name" class="relative flex flex-1 flex-col items-center justify-center">
        <div :style="{ height: `${iconHeight}px` }">
          <img class="h-full" :src="item.img" alt="">
        </div>
        <div class="line-clamp-1 mt-2 color-[#666]">
          {{ item.name }}
        </div>
        <div v-if="item.active" class="absolute right-2.5 top-0 h-2 w-2 rounded-full bg-red" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
