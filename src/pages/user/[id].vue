<script setup lang="ts" name="/user/[id]">
const { params } = useRoute('/user/[id]')
</script>

<template>
  <div>
    {{ params.id }}
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    title: 用户信息
</route>
