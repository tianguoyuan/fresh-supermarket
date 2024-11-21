<script setup lang="ts">
import { findSearchHotTag } from '~/api/home'

const emits = defineEmits<{
  setSearchMsg: [val: string]
}>()
const { list } = await findSearchHotTag()
function handleClick(item: API.SearchHotTagItem) {
  emits('setSearchMsg', item.name)
}
</script>

<template>
  <div v-if="list.length" class="mx-4 mt-4">
    <div class="flex items-center justify-between line-height-5">
      <span class="color-[#0B1526]">热门搜索</span>
    </div>

    <div class="mt-3 flex flex-wrap">
      <div v-for="(item) in list" :key="item.name" class="mb-2 mr-2 flex-shrink-0 rounded-full bg-[#f8f9fa] px-4 py-6px text-3 color-[#666]" @click="handleClick(item)">
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
