<script setup lang="ts">
const props = withDefaults(defineProps<{
  listData: {
    img?: string
    iconClass?: string
    func?: () => void
    name: string
    active?: boolean
  }[]
  title: string
  rightTitle?: string
  iconHeight?: number
}>(), {
  iconHeight: 20,
})
const emits = defineEmits<{
  onRightClick: []
  onHandleClick: [i: number]
}>()
</script>

<template>
  <div class="mx-3 rounded-3 bg-white p-4">
    <div class="flex justify-between">
      <div>{{ title }}</div>
      <div v-if="props.rightTitle" @click="emits('onRightClick')">
        <span>{{ props.rightTitle }}</span>
        <van-icon name="arrow" />
      </div>
    </div>

    <div class="mt-5 flex">
      <div v-for="(item, index) in props.listData" :key="item.name" class="relative flex flex-1 flex-col items-center justify-center" @click="emits('onHandleClick', index)">
        <div v-if="item.img" :style="{ height: `${iconHeight}px` }">
          <img class="h-full" :src="item.img" alt="">
        </div>
        <div v-else-if="item.iconClass">
          <SvgIcon :icon-class="item.iconClass" :size="`${iconHeight}`" />
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
