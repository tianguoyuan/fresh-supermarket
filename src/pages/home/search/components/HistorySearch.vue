<script setup lang="ts">
const emits = defineEmits<{
  setSearchMsg: [val: string]
}>()
const historySearch = useLocalStorage(('historySearch'), ['果冻橙', '芒果', '有机水果卷心菜', '水果萝卜', '熟冻帝王蟹', '赣南脐橙'])
const isRemoveFlag = ref(false)

function removeAllHistory() {
  historySearch.value = []
}
function historyItemClick(index: number) {
  if (!isRemoveFlag.value) {
    emits('setSearchMsg', historySearch.value[index])
  }
  else {
    historySearch.value.splice(index, 1)
  }
}
</script>

<template>
  <div v-if="historySearch.length" class="mx-4 mt-4">
    <div class="flex items-center justify-between line-height-5">
      <span class="color-[#0B1526]">历史搜索</span>
      <div class="flex">
        <SvgIcon v-show="!isRemoveFlag" icon-class="rubbish" color="#999" size="20" @click="isRemoveFlag = true" />
        <div v-show="isRemoveFlag" class="text-3">
          <span class="color-[#8D93A6]" @click="removeAllHistory">全部删除</span>
          <span class="px-2">|</span>
          <span class="color-red" @click="isRemoveFlag = false">完成</span>
        </div>
      </div>
    </div>

    <div class="mt-3 flex flex-wrap">
      <div v-for="(item, index) in historySearch" :key="item" class="mb-2 mr-2 flex-shrink-0 rounded-full bg-[#f8f9fa] px-4 py-6px text-3 color-[#666]" @click="historyItemClick(index)">
        <span>{{ item }}</span>
        <van-icon v-if="isRemoveFlag" name="cross" class="pl-1 color-[#8D93A6]" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
