<script setup lang="ts" name="/home/productList/[id]">
import { findCommonRecommendListFindOne } from '~/api/common'

const route = useRoute()
const { id = '' } = (route.params || {}) as { id?: string }

const data = await findCommonRecommendListFindOne(id)
</script>

<template>
  <div>
    商品列表{{ id }} -- {{ data.id }}
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    title: 商品列表
</route>
