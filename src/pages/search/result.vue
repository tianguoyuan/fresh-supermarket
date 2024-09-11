<script setup lang="ts">
import { parseRedirectPath } from '~/utils'

const route = useRoute('/search/result')
const searchMsg = parseRedirectPath(route.query.msg as string)
</script>

<template>
  <div>
    搜索结果页面 -- {{ searchMsg }}
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    title: 搜索结果
</route>
