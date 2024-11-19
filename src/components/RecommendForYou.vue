<script setup lang="ts">
import { findCommonRecommendList } from '~/api/common'

const { list = [] } = await findCommonRecommendList({
  pageNum: 1,
  pageSize: 10,
  order: 'asc',
})
const cardList = ref(list)
</script>

<template>
  <div class="mt-6">
    <div class="flex items-center justify-center">
      <SvgIcon icon-class="recommend-l" size="22" />
      <span
        class="px-3 text-4"
      >为你推荐</span>
      <SvgIcon icon-class="recommend-r" size="22" />
    </div>

    <div class="mt-3">
      <Card :list="cardList" v-bind="$attrs" />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
