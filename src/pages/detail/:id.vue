<script setup lang="ts" name="/detail/:id">
import { findCommonRecommendListFindOne } from '~/api/common'

const route = useRoute()
const { id = '' } = (route.params || {}) as { id?: string }

const data = await findCommonRecommendListFindOne(id)
</script>

<template>
  <div>
    {{ id }} -- {{ data.id }}
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    title: 商品详情
</route>
