<script setup lang="ts">
const props = defineProps<{
  list: API.CommonRecommendListItem[]
}>()

// const emits = defineEmits<{
//   add: [v: API.CommonRecommendListItem]
// }>()
</script>

<template>
  <div>
    <CardListItem v-for="item in props.list" v-bind="$attrs" :key="item.id" :item="item" />
  </div>
</template>

<style scoped>

</style>
